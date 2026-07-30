import { Image, StyleSheet, Text, View } from 'react-native';

/**
 * Reskin: the MatterChat brand lockup — green ensō tile + two-tone wordmark.
 * Rendered as native views (no raster matte, crisp at any scale, works on any surface).
 */
const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10
	},
	tile: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2FA44A'
	},
	enso: {
		width: '68%',
		height: '68%'
	},
	word: {
		fontWeight: '800',
		letterSpacing: -0.8
	}
});

const BrandLockup = ({ size = 44 }: { size?: number }) => (
	<View style={styles.row} accessibilityRole='image' accessibilityLabel='MatterChat'>
		<View style={[styles.tile, { width: size, height: size, borderRadius: Math.round(size * 0.32) }]}>
			<Image source={require('../static/images/enso_brush_white.png')} style={styles.enso} resizeMode='contain' />
		</View>
		<Text style={[styles.word, { fontSize: Math.round(size * 0.62) }]}>
			<Text style={{ color: '#E1053C' }}>Matter</Text>
			<Text style={{ color: '#2FA44A' }}>Chat</Text>
		</Text>
	</View>
);

export default BrandLockup;
