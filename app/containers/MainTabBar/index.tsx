import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomIcon, type TIconsName } from '../CustomIcon';
import { useTheme } from '../../theme';

/**
 * Reskin: the owned bottom tab bar — Home / DMs / Chi (raised green ensō) / Activity / You.
 * Built as a Tier-2 owned component over the EXISTING navigation (no new navigator dependency):
 * tabs navigate between screens already registered in the Chats stack (react-navigation v7
 * `navigate` pops back to an existing screen instead of pushing a duplicate), and "You" bubbles
 * up to the drawer-level Settings stack exactly like the old sidebar did. The Chi orb button
 * RELOCATES here from the old floating FAB — same destination (ChiOrbView), new home.
 */
export type TMainTab = 'home' | 'dms' | 'activity' | 'you';

const TABS: { key: TMainTab | 'chi'; icon?: TIconsName; label: string; route: string }[] = [
	{ key: 'home', icon: 'home', label: 'Home', route: 'RoomsListView' },
	{ key: 'dms', icon: 'message', label: 'DMs', route: 'DMsView' },
	{ key: 'chi', label: 'Chi', route: 'ChiOrbView' },
	{ key: 'activity', icon: 'notification', label: 'Activity', route: 'ActivityView' },
	{ key: 'you', icon: 'user', label: 'You', route: 'SettingsStackNavigator' }
];

const styles = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		borderTopWidth: StyleSheet.hairlineWidth,
		paddingTop: 7
	},
	item: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		minHeight: 48
	},
	label: {
		fontSize: 10,
		fontWeight: '700',
		marginTop: 3
	},
	chiButton: {
		width: 56,
		height: 56,
		borderRadius: 28,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: -22,
		shadowColor: '#2FA44A',
		shadowOpacity: 0.45,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 5 },
		elevation: 8
	},
	chiEnso: {
		width: 34,
		height: 34
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
				{ backgroundColor: colors.surfaceLight, borderTopColor: colors.strokeLight, paddingBottom: Math.max(bottom, 10) }
			]}>
			{TABS.map(tab => {
				if (tab.key === 'chi') {
					return (
						<View key='chi' style={styles.item} pointerEvents='box-none'>
							<TouchableOpacity
								style={[styles.chiButton, { backgroundColor: colors.buttonBackgroundPrimaryDefault }]}
								activeOpacity={0.85}
								accessibilityRole='button'
								accessibilityLabel='Chi assistant'
								onPress={() => navigation.navigate('ChiOrbView')}>
								<Image source={require('../../static/images/enso_brush_white.png')} style={styles.chiEnso} resizeMode='contain' />
							</TouchableOpacity>
							<Text style={[styles.label, { color: colors.fontInfo }]}>Chi</Text>
						</View>
					);
				}
				const isActive = tab.key === active;
				const tint = isActive ? colors.fontInfo : colors.fontSecondaryInfo;
				return (
					<TouchableOpacity
						key={tab.key}
						style={styles.item}
						accessibilityRole='button'
						accessibilityState={{ selected: isActive }}
						accessibilityLabel={tab.label}
						onPress={() => {
							if (!isActive) {
								navigation.navigate(tab.route);
							}
						}}>
						<CustomIcon name={tab.icon!} size={24} color={tint} />
						<Text style={[styles.label, { color: tint }]}>{tab.label}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default MainTabBar;
