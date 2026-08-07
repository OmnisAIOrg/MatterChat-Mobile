import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { type ReactNode, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { bezel, onSky, paper } from '../../lib/constants/paperSky';
import ChiOrb from '../ChiOrb';
import { CustomIcon, type TIconsName } from '../CustomIcon';
import Glass from '../Glass';

/**
 * The floating dock — Home / Chats / Chi / Activity / You.
 *
 * It is chrome, so it is glass: a smoked pane inset from all three edges, floating clear of the
 * screen with the sky visible around and beneath it. Not a bar welded to the bottom — the whole
 * point of the inset is that the app reads as content on a sky rather than content in a chassis.
 *
 * Around the pane runs the accent bezel from the desktop app — the same three green stops, the same
 * lit top lip and dark bottom lip, the same shadow cast in the bezel's own hue. On desktop the whole
 * window sits inside that ring; here the dock does. It is the one detail that makes the two apps
 * read as the same product from across a room.
 *
 * The Chi orb is the exception to everything: it is a lit sphere raised 16px out of the dock,
 * drawn as a sibling of the glass pane rather than a child, because the pane clips to its own
 * 34px radius and the orb has to break that boundary (and cast its shadow past it).
 *
 * All five labels sit on one baseline. The orb is absolutely positioned precisely so that raising
 * it doesn't drag its label out of line with the other four.
 *
 * `active` is optional: inside a conversation the dock is still there — you can leave the way you
 * came in — but none of the five is where you are, so none of them is lit.
 */
export type TMainTab = 'home' | 'dms' | 'activity' | 'you';

/**
 * Four of the five destinations live in the Chats stack and one lives in the Settings stack, and
 * those two are *siblings* under the drawer. React Navigation resolves a route name by walking up
 * the tree, never sideways — so a bare `navigate('RoomsListView')` from the You tab silently does
 * nothing. Every tab therefore names its drawer route and its screen, which resolves from anywhere
 * in the app, including from inside a conversation.
 */
const CHATS = 'ChatsStackNavigator';
const SETTINGS = 'SettingsStackNavigator';

const TABS: { key: TMainTab | 'chi'; icon?: TIconsName; label: string; stack: string; screen: string }[] = [
	{ key: 'home', icon: 'home', label: 'Home', stack: CHATS, screen: 'RoomsListView' },
	{ key: 'dms', icon: 'message', label: 'Chats', stack: CHATS, screen: 'DMsView' },
	{ key: 'chi', label: 'Chi', stack: CHATS, screen: 'ChiOrbView' },
	{ key: 'activity', icon: 'mention', label: 'Activity', stack: CHATS, screen: 'ActivityView' },
	{ key: 'you', icon: 'user', label: 'You', stack: SETTINGS, screen: 'SettingsView' }
];

const PAD_TOP = 12;
const PAD_BOTTOM = 14;
const ICON = 25;
// The icon row is taller than the icons so the raised orb has somewhere to land: it clears the
// dock by 26px and still stops short of the label line every tab shares.
const ICON_SLOT = 34;
const LABEL_GAP = 3;
const LABEL_H = 14;
const CONTENT_H = ICON_SLOT + LABEL_GAP + LABEL_H;
const DOCK_H = PAD_TOP + CONTENT_H + PAD_BOTTOM;
const ORB = 56;
const RAISE = 26;
const DOCK_RADIUS = 34;

/** The dock floats over content, so scrollable screens must reserve this much at the bottom. */
export const DOCK_CLEARANCE = DOCK_H + 30;

const styles = StyleSheet.create({
	wrap: {
		position: 'absolute',
		left: 14,
		right: 14,
		zIndex: 8
	},
	// The anodised ring. It carries the shadow, because the bezel is the outermost surface — the
	// glass inside it casts nothing of its own.
	bezel: {
		padding: bezel.width,
		borderRadius: DOCK_RADIUS + bezel.width,
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowColor: bezel.shadow,
				shadowOffset: { width: 0, height: 7 },
				shadowRadius: 16,
				shadowOpacity: 0.5
			},
			android: { elevation: 16 }
		})
	},
	bezelLip: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 1
	},
	dock: {
		flexDirection: 'row',
		paddingTop: PAD_TOP,
		paddingBottom: PAD_BOTTOM,
		paddingHorizontal: 10
	},
	item: {
		alignItems: 'center'
	},
	itemPress: {
		flex: 1
	},
	iconSlot: {
		width: 54,
		height: ICON_SLOT,
		alignItems: 'center',
		justifyContent: 'center'
	},
	// The selected tab is a glass key pressed forward out of the pane: a lighter fill, a lit top
	// edge and a shadow under it. Everything else stays flush with the dock.
	key: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255,0.18)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.30)',
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowColor: '#03130A',
				shadowOffset: { width: 0, height: 3 },
				shadowRadius: 6,
				shadowOpacity: 0.5
			},
			android: { elevation: 4 }
		})
	},
	keySheen: {
		position: 'absolute',
		top: 0,
		left: 8,
		right: 8,
		height: 1,
		backgroundColor: 'rgba(255,255,255,0.55)'
	},
	// Relief: every glyph casts a little shadow onto the pane, so the icons sit on the glass
	// rather than being printed into it.
	glyph: {
		...Platform.select({
			ios: {
				shadowColor: '#020C06',
				shadowOffset: { width: 0, height: 2 },
				shadowRadius: 5,
				shadowOpacity: 0.55
			},
			android: {}
		})
	},
	label: {
		marginTop: LABEL_GAP,
		height: LABEL_H,
		fontSize: 11,
		lineHeight: LABEL_H,
		fontWeight: '600',
		color: onSky.primary,
		textShadowColor: 'rgba(2,12,6,0.55)',
		textShadowRadius: 4,
		textShadowOffset: { width: 0, height: 1 }
	},
	labelActive: {
		fontWeight: '800'
	},
	inactive: {
		opacity: 0.62
	},
	// The orb lives outside the glass so the pane's radius can't clip it and its shadow can fall
	// past the dock's edge onto the sky.
	orbSlot: {
		position: 'absolute',
		top: PAD_TOP - RAISE + bezel.width,
		alignItems: 'center',
		justifyContent: 'center'
	},
	badge: {
		position: 'absolute',
		top: -3,
		minWidth: 17,
		height: 17,
		borderRadius: 9,
		paddingHorizontal: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: paper.sheet
	},
	badgeText: {
		fontSize: 10,
		fontWeight: '800',
		color: paper.accent
	}
});

/**
 * A dock button with press physics: it gives under the finger and springs back. Nothing else in
 * the app is pressed as often, and a tab that doesn't move under your thumb is the single clearest
 * tell that a UI is a picture of an app rather than an app.
 */
const Pressed = ({ children, onPress, style, pressStyle, ...rest }: any & { children: ReactNode }) => {
	const scale = useRef(new Animated.Value(1)).current;
	const to = (v: number) => Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
	return (
		<Pressable style={pressStyle} onPressIn={() => to(0.9)} onPressOut={() => to(1)} onPress={onPress} {...rest}>
			<Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
		</Pressable>
	);
};

const MainTabBar = ({ active, badges }: { active?: TMainTab; badges?: Partial<Record<TMainTab, number>> }) => {
	const { bottom } = useSafeAreaInsets();
	const navigation = useNavigation<any>();

	const go = (stack: string, screen: string, isActive: boolean) => {
		if (isActive) {
			return;
		}
		// A dock press is a place-change; it deserves the same physical acknowledgement iOS gives
		// its own tab bars.
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
		navigation.navigate(stack, { screen });
	};

	return (
		<View style={[styles.wrap, { bottom: Math.max(bottom - 12, 12) }]} pointerEvents='box-none'>
			<View style={styles.bezel}>
				<LinearGradient
					colors={[bezel.top, bezel.mid, bezel.bottom]}
					locations={[0, 0.52, 1]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={StyleSheet.absoluteFill}
					pointerEvents='none'
				/>
				<View style={[styles.bezelLip, { top: 0, backgroundColor: bezel.edgeHighlight }]} pointerEvents='none' />
				<View style={[styles.bezelLip, { bottom: 0, backgroundColor: bezel.edgeShade }]} pointerEvents='none' />
				<Glass variant='dock' radius={DOCK_RADIUS} style={styles.dock}>
					{TABS.map(tab => {
						if (tab.key === 'chi') {
							// A spacer that owns nothing but the label's slot — the orb is drawn over it.
							return (
								<View key='chi' style={[styles.itemPress, styles.item]} pointerEvents='none'>
									<View style={styles.iconSlot} />
									<Text style={[styles.label, styles.labelActive]}>Chi</Text>
								</View>
							);
						}

						const isActive = tab.key === active;
						const badge = badges?.[tab.key];
						return (
							<Pressed
								key={tab.key}
								pressStyle={styles.itemPress}
								style={[styles.item, isActive ? null : styles.inactive]}
								accessibilityRole='button'
								accessibilityState={{ selected: isActive }}
								accessibilityLabel={tab.label}
								onPress={() => go(tab.stack, tab.screen, isActive)}>
								<View style={styles.iconSlot}>
									{isActive ? (
										<View style={styles.key}>
											<View style={styles.keySheen} />
										</View>
									) : null}
									<View style={styles.glyph}>
										<CustomIcon name={tab.icon!} size={ICON} color={onSky.primary} />
									</View>
								</View>
								{badge ? (
									<View style={[styles.badge, { right: 22 }]}>
										<Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
									</View>
								) : null}
								<Text style={[styles.label, isActive ? styles.labelActive : null]}>{tab.label}</Text>
							</Pressed>
						);
					})}
				</Glass>
			</View>
			<View style={[styles.orbSlot, { left: 0, right: 0 }]} pointerEvents='box-none'>
				<Pressed
					accessibilityRole='button'
					accessibilityLabel='Chi assistant'
					onPress={() => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
						navigation.navigate(CHATS, { screen: 'ChiOrbView' });
					}}>
					<ChiOrb size={ORB} />
				</Pressed>
			</View>
		</View>
	);
};

export default MainTabBar;
