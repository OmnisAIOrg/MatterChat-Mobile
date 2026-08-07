import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { onSky, paper } from '../../lib/constants/paperSky';
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
 * The Chi orb is the exception to everything: it is a lit sphere raised 16px out of the dock,
 * drawn as a sibling of the glass pane rather than a child, because the pane clips to its own
 * 34px radius and the orb has to break that boundary (and cast its shadow past it).
 *
 * All five labels sit on one baseline. The orb is absolutely positioned precisely so that raising
 * it doesn't drag its label out of line with the other four.
 */
export type TMainTab = 'home' | 'dms' | 'activity' | 'you';

const TABS: { key: TMainTab | 'chi'; icon?: TIconsName; label: string; route: string }[] = [
	{ key: 'home', icon: 'home', label: 'Home', route: 'RoomsListView' },
	{ key: 'dms', icon: 'message', label: 'Chats', route: 'DMsView' },
	{ key: 'chi', label: 'Chi', route: 'ChiOrbView' },
	{ key: 'activity', icon: 'mention', label: 'Activity', route: 'ActivityView' },
	{ key: 'you', icon: 'user', label: 'You', route: 'SettingsStackNavigator' }
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

/** The dock floats over content, so scrollable screens must reserve this much at the bottom. */
export const DOCK_CLEARANCE = DOCK_H + 30;

const styles = StyleSheet.create({
	wrap: {
		position: 'absolute',
		left: 14,
		right: 14,
		zIndex: 8
	},
	dock: {
		flexDirection: 'row',
		paddingTop: PAD_TOP,
		paddingBottom: PAD_BOTTOM,
		paddingHorizontal: 10,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 18 },
				shadowRadius: 22,
				shadowOpacity: 0.55
			},
			android: { elevation: 16 }
		})
	},
	item: {
		flex: 1,
		alignItems: 'center'
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
		top: PAD_TOP - RAISE,
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

const MainTabBar = ({ active, badges }: { active: TMainTab; badges?: Partial<Record<TMainTab, number>> }) => {
	const { bottom } = useSafeAreaInsets();
	const navigation = useNavigation<any>();

	const go = (route: string, isActive: boolean) => {
		if (isActive) {
			return;
		}
		// A dock press is a place-change; it deserves the same physical acknowledgement iOS gives
		// its own tab bars.
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
		navigation.navigate(route);
	};

	return (
		<View style={[styles.wrap, { bottom: Math.max(bottom - 12, 12) }]} pointerEvents='box-none'>
			<Glass variant='dock' radius={34} style={styles.dock}>
				{TABS.map(tab => {
					if (tab.key === 'chi') {
						// A spacer that owns nothing but the label's slot — the orb is drawn over it.
						return (
							<View key='chi' style={styles.item} pointerEvents='none'>
								<View style={styles.iconSlot} />
								<Text style={[styles.label, styles.labelActive]}>Chi</Text>
							</View>
						);
					}

					const isActive = tab.key === active;
					const badge = badges?.[tab.key];
					return (
						<TouchableOpacity
							key={tab.key}
							style={[styles.item, isActive ? null : styles.inactive]}
							activeOpacity={0.6}
							accessibilityRole='button'
							accessibilityState={{ selected: isActive }}
							accessibilityLabel={tab.label}
							onPress={() => go(tab.route, isActive)}>
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
						</TouchableOpacity>
					);
				})}
			</Glass>
			<View style={[styles.orbSlot, { left: 0, right: 0 }]} pointerEvents='box-none'>
				<TouchableOpacity
					activeOpacity={0.85}
					accessibilityRole='button'
					accessibilityLabel='Chi assistant'
					onPress={() => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
						navigation.navigate('ChiOrbView');
					}}>
					<ChiOrb size={ORB} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MainTabBar;
