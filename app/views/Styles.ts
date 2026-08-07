import { Platform, StyleSheet, type TextStyle } from 'react-native';

import { MAX_SCREEN_CONTENT_WIDTH } from '../lib/constants/tablet';
import { fontFamily } from '../lib/constants/typography';
import { RULE } from '../lib/constants/paperSky';

const defaultTextStyle: TextStyle = {
	textAlign: 'left',
	backgroundColor: 'transparent',
	...Platform.select({
		android: {
			includeFontPadding: false
		}
	})
};

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	containerScrollView: {
		paddingTop: 12,
		paddingHorizontal: 16,
		paddingBottom: 24
	},
	tabletScreenContent: {
		justifyContent: 'center',
		alignSelf: 'center',
		width: MAX_SCREEN_CONTENT_WIDTH
	},
	modalFormSheet: {
		// Following UIModalPresentationFormSheet size
		// this not change on different iPad sizes
		width: 540,
		height: 620,
		overflow: 'hidden',
		borderRadius: 10
	},
	status: {
		position: 'absolute',
		bottom: -2,
		right: -2,
		borderRadius: 10
	},
	textAlignCenter: {
		textAlign: 'center'
	},
	opacity5: {
		opacity: 0.5
	},
	// Screen title — the brand display face, matching the web's "Welcome back" (Space Grotesk 700).
	// SpaceGrotesk-Bold IS the bold cut: RN doesn't synthesize weight for custom faces, so nothing
	// here may set fontWeight, and consumers must spread this AFTER any textBold.
	loginTitle: {
		fontSize: 20,
		marginVertical: 15,
		lineHeight: 28,
		fontFamily: fontFamily.display,
		fontWeight: 'normal'
	},
	loginSubtitle: {
		fontSize: 16,
		lineHeight: 20,
		marginBottom: 15
	},
	separator: {
		height: RULE
	},
	separatorTop: {
		borderTopWidth: RULE
	},
	separatorBottom: {
		borderBottomWidth: RULE
	},
	separatorVertical: {
		borderTopWidth: RULE,
		borderBottomWidth: RULE
	},
	separatorLeft: {
		borderLeftWidth: RULE
	},
	textRegular: {
		...defaultTextStyle,
		...Platform.select({
			ios: {
				fontFamily: 'Inter',
				fontWeight: '400'
			},
			android: {
				fontFamily: 'Inter-Regular'
			}
		})
	},
	textMedium: {
		...defaultTextStyle,
		...Platform.select({
			ios: {
				fontFamily: 'Inter',
				fontWeight: '500'
			},
			android: {
				fontFamily: 'Inter-Medium'
			}
		})
	},
	textSemibold: {
		...defaultTextStyle,
		...Platform.select({
			ios: {
				fontFamily: 'Inter',
				fontWeight: '600'
			},
			android: {
				fontFamily: 'Inter-SemiBold'
			}
		})
	},
	textBold: {
		...defaultTextStyle,
		...Platform.select({
			ios: {
				fontFamily: 'Inter',
				fontWeight: '700'
			},
			android: {
				fontFamily: 'Inter-Bold'
			}
		})
	},
	inputLastChild: {
		marginBottom: 15
	}
});
