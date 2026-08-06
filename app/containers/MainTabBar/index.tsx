import { useNavigation } from '@react-navigation/native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fontFamily, gradients } from '../../lib/constants/typography';
import { useTheme } from '../../theme';
import { CustomIcon, type TIconsName } from '../CustomIcon';

/**
 * The bottom rail — Home / DMs / Chi / Activity / You.
 *
 * Built to the web app's component grammar rather than as a coloured slab: the PWA keeps its
 * chrome light and airy (near-white fills, hairline green-tinted borders, 13pt radii) and spends
 * colour only on the primary action. So the rail is a light surface, the active tab is marked by
 * a soft green tint pill behind its icon, and the emerald gradient is reserved for Chi — carrying
 * the same lift the web's "Sign in" button has (coloured glow plus a 1px inset highlight along
 * the top edge, so it reads lit from above).
 *
 * Every label sits on one baseline. The Chi tile is absolutely positioned so it can rise above
 * the rail without dragging its own label out of line with the other four.
 *
 * Navigation is unchanged: tabs `navigate` to screens already registered in the Chats stack.
 */
export type TMainTab = 'home' | 'dms' | 'activity' | 'you';

const TABS: { key: TMainTab | 'chi'; icon?: TIconsName; label: string; route: string }[] = [
	{ key: 'home', icon: 'home', label: 'Home', route: 'RoomsListView' },
	{ key: 'dms', icon: 'message', label: 'DMs', route: 'DMsView' },
	{ key: 'chi', label: 'Chi', route: 'ChiOrbView' },
	{ key: 'activity', icon: 'notification', label: 'Activity', route: 'ActivityView' },
	{ key: 'you', icon: 'user', label: 'You', route: 'SettingsStackNavigator' }
];

const BAR_HEIGHT = 54;
const CHI_SIZE = 50;

const styles = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		borderTopWidth: StyleSheet.hairlineWidth
	},
	item: {
		flex: 1,
		height: BAR_HEIGHT,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 3
	},
	iconPill: {
		width: 46,
		height: 26,
		borderRadius: 13,
		alignItems: 'center',
		justifyContent: 'center'
	},
	label: {
		fontFamily: fontFamily.mono,
		fontSize: 9,
		letterSpacing: 0.6
	},
	labelActive: {
		fontFamily: fontFamily.monoBold
	},
	// The tile rises out of the rail; the label below it stays on the shared baseline.
	chiTile: {
		position: 'absolute',
		top: -(CHI_SIZE / 2) + 4,
		width: CHI_SIZE,
		height: CHI_SIZE,
		borderRadius: 17,
		alignItems: 'center',
		justifyContent: 'center',
		...Platform.select({
			ios: {
				shadowColor: '#0D8F5F',
				shadowOpacity: 0.38,
				shadowRadius: 10,
				shadowOffset: { width: 0, height: 6 }
			},
			android: { elevation: 8 }
		})
	},
	// the web CTA's inset top highlight, which is what makes it read as lit
	chiSheen: {
		position: 'absolute',
		top: 0,
		left: 12,
		right: 12,
		height: 1,
		backgroundColor: 'rgba(255,255,255,0.30)'
	},
	chiEnso: {
		width: 28,
		height: 28
	},
	chiLabelSlot: {
		marginTop: CHI_SIZE / 2 + 6
	}
});

const MainTabBar = ({ active }: { active: TMainTab }) => {
	const { colors } = useTheme();
	const { bottom } = useSafeAreaInsets();
	const navigation = useNavigation<any>();

	return (
		<View
			style={[
				styles.wrap,
				{
					backgroundColor: colors.surfaceLight,
					borderTopColor: colors.strokeLight,
					paddingBottom: Math.max(bottom, 8)
				}
			]}>
			{TABS.map(tab => {
				if (tab.key === 'chi') {
					return (
						<View key='chi' style={styles.item} pointerEvents='box-none'>
							<TouchableOpacity
								style={styles.chiTile}
								activeOpacity={0.88}
								accessibilityRole='button'
								accessibilityLabel='Chi assistant'
								onPress={() => navigation.navigate('ChiOrbView')}>
								<LinearGradient
									colors={gradients.emerald as unknown as string[]}
									locations={[0, 0.6, 1]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
									style={[StyleSheet.absoluteFill, { borderRadius: 17 }]}
								/>
								<View style={styles.chiSheen} />
								<Image source={require('../../static/images/enso_brush_white.png')} style={styles.chiEnso} resizeMode='contain' />
							</TouchableOpacity>
							{/* Chi is an action, not a destination — keep its label neutral so it never
							    competes with the selected tab's marker. */}
							<Text style={[styles.label, styles.chiLabelSlot, { color: colors.fontSecondaryInfo }]}>Chi</Text>
						</View>
					);
				}

				const isActive = tab.key === active;
				const tint = isActive ? colors.fontInfo : colors.fontSecondaryInfo;
				return (
					<TouchableOpacity
						key={tab.key}
						style={styles.item}
						activeOpacity={0.7}
						accessibilityRole='button'
						accessibilityState={{ selected: isActive }}
						accessibilityLabel={tab.label}
						onPress={() => {
							if (!isActive) {
								navigation.navigate(tab.route);
							}
						}}>
						<View style={[styles.iconPill, isActive ? { backgroundColor: colors.statusBackgroundInfo } : null]}>
							<CustomIcon name={tab.icon!} size={21} color={tint} />
						</View>
						<Text style={[styles.label, isActive ? styles.labelActive : null, { color: tint }]}>{tab.label}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default MainTabBar;
