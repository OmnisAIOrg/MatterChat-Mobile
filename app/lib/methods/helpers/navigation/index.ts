import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { themes } from '../../../constants/colors';
import { type TSupportedThemes } from '../../../../theme';
import sharedStyles from '../../../../views/Styles';
import Header from '../../../../containers/Header';

export const defaultHeader: NativeStackNavigationOptions = {
	header: Header
};

export const drawerStyle = {
	width: 320
};

// The app frame is MatterChat green everywhere — the same green as the app icon.
// Every navigation header carries it with white content.
export const HEADER_GREEN = '#2A9645';

export const themedHeader = (_theme: TSupportedThemes): NativeStackNavigationOptions => ({
	headerStyle: {
		backgroundColor: HEADER_GREEN
	},
	headerTintColor: '#F4FFF9',
	headerTitleStyle: { ...sharedStyles.textBold, color: '#F4FFF9', fontSize: 17 }
});

export const navigationTheme = (theme: TSupportedThemes) => {
	const defaultNavTheme = theme === 'light' ? DefaultTheme : DarkTheme;

	return {
		...defaultNavTheme,
		colors: {
			...defaultNavTheme.colors,
			// The navigator's ground is the frame green: it only shows in safe-area gaps and
			// between transitions, where it should read as part of the green frame. Screens
			// paint their own opaque content surfaces over it.
			background: HEADER_GREEN,
			border: themes[theme].strokeLight
		}
	};
};

// Gets the current screen from navigation state
export const getActiveRoute: any = (state: any) => {
	const route = state?.routes[state?.index];

	if (route?.state) {
		// Dive into nested navigators
		return getActiveRoute(route.state);
	}

	return route;
};

export const getActiveRouteName = (state: any) => getActiveRoute(state)?.name;
