import { Image, StyleSheet, Text, View } from 'react-native';

import { eyebrow, fontFamily } from '../lib/constants/typography';

/**
 * Onboarding masthead — the phone counterpart to the web login's left panel.
 * Sits directly on the screen's forest ground (see OnboardingBackground): wordmark,
 * mono eyebrow, the Newsreader editorial line with its italic accent, and the web
 * login's trust badges. No icon — the wordmark carries the brand, and the ensō
 * belongs to the app itself.
 */
const styles = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		paddingHorizontal: 26
	},
	// The real wordmark at its native 1286:210 ratio.
	wordmark: {
		width: 236,
		height: Math.round((236 * 210) / 1286)
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
	},
	// Trust badges — the strip along the bottom of the web login's forest panel.
	// Width budget: JetBrains Mono is a 0.6em monospace, so at these sizes the three
	// items plus their dividers measure ~249pt against the 268pt content box this wrap
	// leaves on a 320pt-wide phone. The captions are therefore trimmed from the web's
	// wording ("INDEPENDENTLY AUDITED" → "INDEPENDENT AUDIT") rather than left to clip;
	// keep that budget in mind before lengthening any string below. `flexWrap` is the
	// safety net for large accessibility text sizes.
	trustRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		rowGap: 12,
		marginTop: 24
	},
	trustBadge: {
		alignItems: 'center'
	},
	trustDivider: {
		width: 1,
		height: 20,
		marginHorizontal: 9,
		backgroundColor: 'rgba(255, 255, 255, 0.20)'
	},
	trustLabel: {
		fontFamily: fontFamily.monoBold,
		fontSize: 9,
		letterSpacing: 0.8,
		color: '#FFFFFF',
		textAlign: 'center'
	},
	trustCaption: {
		fontFamily: fontFamily.mono,
		fontSize: 7.5,
		letterSpacing: 0.4,
		color: 'rgba(255, 255, 255, 0.62)',
		textAlign: 'center',
		marginTop: 2
	}
});

const TrustBadge = ({ label, caption }: { label: string; caption: string }) => (
	<View style={styles.trustBadge}>
		<Text style={styles.trustLabel}>{label}</Text>
		<Text style={styles.trustCaption}>{caption}</Text>
	</View>
);

const BrandHero = () => (
	<View style={styles.wrap}>
		<Image
			source={require('../static/images/matterchat_wordmark_light.png')}
			style={styles.wordmark}
			resizeMode='contain'
			accessibilityLabel='MatterChat'
		/>
		<Text style={styles.eyebrow}>Omnis AI · Secure communications for legal</Text>
		<Text style={styles.line}>
			Where privileged conversations <Text style={styles.lineItalic}>stay</Text> privileged.
		</Text>
		<View style={styles.trustRow}>
			<TrustBadge label='AES-256' caption='END-TO-END' />
			<View style={styles.trustDivider} />
			<TrustBadge label='SOC 2 TYPE II' caption='INDEPENDENT AUDIT' />
			<View style={styles.trustDivider} />
			<TrustBadge label='BAR-VERIFIED' caption='IDENTITY ASSURED' />
		</View>
	</View>
);

export default BrandHero;
