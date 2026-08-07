import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { themes, FRAME_GREEN } from '../../../constants/colors';
import { onSky } from '../../../constants/paperSky';
import { fontFamily } from '../../../constants/typography';
import { type TSupportedThemes } from '../../../../theme';
import sharedStyles from '../../../../views/Styles';
import Header from '../../../../containers/Header';

export const defaultHeader: NativeStackNavigationOptions = {
	header: Header,
	// Paper & Sky: the sky is rendered once at the root and every screen floats over it, so the
	// stack must not paint a ground of its own. Screens supply their own paper.
	contentStyle: { backgroundColor: 'transparent' }
};

export const drawerStyle = {
	width: 320
};

// Kept for the few places that still need a single flat green to paint before React mounts.
export const HEADER_GREEN = FRAME_GREEN;

/**
 * Headers are glass, not a coloured bar: they stay transparent on the living sky and carry white
 * content with a soft cast so the title survives the pale top of the gradient. Nothing about the
 * header should compete with the paper sheet below it.
 */
export const themedHeader = (_theme: TSupportedThemes): NativeStackNavigationOptions => ({
	headerStyle: {
		backgroundColor: 'transparent'
	},
	headerShadowVisible: false,
	headerTintColor: onSky.primary,
	// Space Grotesk is the brand display face; it must win over textBold's family, and its
	// weight must not compete (RN never synthesizes weight for a custom font).
	headerTitleStyle: {
		...sharedStyles.textBold,
		fontFamily: fontFamily.display,
		fontWeight: 'normal',
		color: onSky.primary,
		fontSize: 17
	}
});

export const navigationTheme = (theme: TSupportedThemes) => {
	const defaultNavTheme = theme === 'light' ? DefaultTheme : DarkTheme;

	return {
		...defaultNavTheme,
		colors: {
			...defaultNavTheme.colors,
			// Transparent all the way down: the living sky is the app's only background, rendered
			// once at the root so it stays continuous through every push, tab switch and modal.
			background: 'transparent',
			card: 'transparent',
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
