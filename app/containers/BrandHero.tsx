import { Image, StyleSheet, Text, View } from 'react-native';

import { eyebrow, fontFamily } from '../lib/constants/typography';

/**
 * Onboarding masthead — the phone counterpart to the web login's left panel.
 * Sits directly on the screen's forest ground (see OnboardingBackground): wordmark,
 * mono eyebrow, and the Newsreader editorial line with its italic accent. No icon —
 * the wordmark carries the brand, and the ensō belongs to the app itself.
 */
const styles = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		paddingHorizontal: 26
	},
	wordmark: {
		width: 236,
		height: 40
	},
	eyebrow: {
		...eyebrow,
		fontSize: 9,
		letterSpacing: 1.6,
		color: '#5FBF95',
		textAlign: 'center',
		marginTop: 26,
		marginBottom: 14
	},
	line: {
		fontFamily: fontFamily.serif,
		fontSize: 25,
		lineHeight: 34,
		color: '#F4FFF9',
		textAlign: 'center'
	},
	lineItalic: {
		fontFamily: fontFamily.serifItalic,
		fontStyle: 'italic'
	}
});

const BrandHero = () => (
	<View style={styles.wrap}>
		<Image
			source={require('../static/images/matterchat_wordmark.png')}
			style={styles.wordmark}
			resizeMode='contain'
			accessibilityLabel='MatterChat'
		/>
		<Text style={styles.eyebrow}>Omnis AI · Secure communications for legal</Text>
		<Text style={styles.line}>
			Where privileged conversations <Text style={styles.lineItalic}>stay</Text> privileged.
		</Text>
	</View>
);

export default BrandHero;
