import { memo } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { isPaperSky, sky } from '../lib/constants/paperSky';
import { useTheme } from '../theme';

const styles = StyleSheet.create({
	fill: {
		...StyleSheet.absoluteFillObject
	},
	flare: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '34%'
	},
	vignette: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: '42%'
	}
});

// The Paper & Sky living sky: full-bleed layered gradient the paper cards float on.
// Renders nothing on non-Paper & Sky themes, so it is safe to mount unconditionally.
const SkyBackground = memo(() => {
	const { theme } = useTheme();
	if (!isPaperSky(theme)) {
		return null;
	}
	const spec = sky[theme as 'paper' | 'glass'];
	return (
		<>
			<LinearGradient colors={spec.colors} locations={spec.locations} style={styles.fill} pointerEvents='none' />
			<LinearGradient colors={[spec.flare, 'rgba(255, 255, 255, 0)']} style={styles.flare} pointerEvents='none' />
			<LinearGradient colors={['rgba(0, 0, 0, 0)', spec.vignette]} style={styles.vignette} pointerEvents='none' />
		</>
	);
});

export default SkyBackground;
