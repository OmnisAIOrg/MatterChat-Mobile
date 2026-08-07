import { useEffect, useState } from 'react';
import { type DrawerNavigationProp } from '@react-navigation/drawer';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PaperSheet } from '../../containers/Paper';
import scrollPersistTaps from '../../lib/methods/helpers/scrollPersistTaps';
import { type DrawerParamList } from '../../stacks/types';
import SupportedVersionsWarnItem from './components/SupportedVersionsWarnItem';
import CustomStatus from './components/CustomStatus';
import Stacks from './components/Stacks';
import Admin from './components/Admin';
import Profile from './components/Profile';

/**
 * The workspace drawer.
 *
 * It is a sheet like everything else: it slides in as a piece of paper floating on the living sky,
 * inset on all four sides with the system's radius and shadow, rather than as a flat panel welded
 * to the edge of the screen. The drawer's own background is transparent (see `DrawerStack`) so the
 * sky runs behind and beneath it.
 */
const styles = StyleSheet.create({
	root: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 6
	},
	sheet: {
		flex: 1
	},
	scroll: {
		flex: 1
	}
});

const SidebarView = ({ navigation }: { navigation: DrawerNavigationProp<DrawerParamList> }) => {
	'use memo';

	const [currentScreen, setCurrentScreen] = useState<string | null>(null);
	const { top, bottom } = useSafeAreaInsets();

	useEffect(() => {
		const unsubscribe = navigation.addListener('state', () => {
			setCurrentScreen(navigation.getState().routes[navigation.getState().index].name);
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<View testID='sidebar-view' style={[styles.root, { paddingTop: top + 8, paddingBottom: Math.max(bottom, 10) + 8 }]}>
			<PaperSheet style={styles.sheet}>
				<ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 12 }} {...scrollPersistTaps}>
					<Profile navigation={navigation} />
					<SupportedVersionsWarnItem />
					<CustomStatus />
					<Stacks currentScreen={currentScreen} />
					<Admin currentScreen={currentScreen} />
				</ScrollView>
			</PaperSheet>
		</View>
	);
};

export default SidebarView;
