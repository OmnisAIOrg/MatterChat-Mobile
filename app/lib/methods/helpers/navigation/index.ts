import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { themes, FRAME_GREEN } from '../../../constants/colors';
import { fontFamily } from '../../../constants/typography';
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
export const HEADER_GREEN = FRAME_GREEN;

export const themedHeader = (_theme: TSupportedThemes): NativeStackNavigationOptions => ({
	headerStyle: {
		backgroundColor: HEADER_GREEN
	},
	headerTintColor: '#F4FFF9',
	// Space Grotesk is the brand display face; it must win over textBold's family, and its
	// weight must not compete (RN never synthesizes weight for a custom font).
	headerTitleStyle: {
		...sharedStyles.textBold,
		fontFamily: fontFamily.display,
		fontWeight: 'normal',
		color: '#F4FFF9',
		fontSize: 17
	}
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
