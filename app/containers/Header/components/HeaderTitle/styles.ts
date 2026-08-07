import { StyleSheet } from 'react-native';

import sharedStyles from '../../../../views/Styles';
import { fontFamily } from '../../../../lib/constants/typography';

export const styles = StyleSheet.create({
	headerTitleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	// SpaceGrotesk-Bold is already the bold cut — it has to come after the textBold spread and
	// carry no competing fontWeight, or RN falls back to the system face instead of the brand one.
	title: {
		...sharedStyles.textBold,
		fontFamily: fontFamily.display,
		fontWeight: 'normal',
		fontSize: 17,
		flex: 1,
		lineHeight: 24,
		paddingVertical: 6,
		// Just enough cast to keep white legible over the pale top of the sky — any more and the
		// title reads as embossed rather than as printed on air.
		textShadowColor: 'rgba(8,32,18,0.30)',
		textShadowRadius: 6,
		textShadowOffset: { width: 0, height: 1 }
	},
	androidTitle: {
		...sharedStyles.textBold,
		fontFamily: fontFamily.display,
		fontWeight: 'normal',
		fontSize: 17,
		flex: 1,
		lineHeight: 24,
		paddingVertical: 10
	}
});
