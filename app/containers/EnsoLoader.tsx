import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * The MatterChat loading mark — a slowly drawing ensō.
 *
 * Every wait in the app uses this instead of a generic spinner: the brush ring turns at a
 * calm, deliberate pace (2.6s) while a soft emerald glow breathes underneath, so a pause
 * reads as the brand rather than as a stall. Used by ActivityIndicator (so it inherits
 * everywhere), the startup screen, and any full-screen wait.
 *
 * Honors reduce-motion by simply holding a static ensō — no jarring stop/start.
 */
const styles = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	fill: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	glow: {
		position: 'absolute',
		backgroundColor: 'rgba(18,185,129,0.18)'
	}
});

const EnsoLoader = ({
	size = 48,
	style,
	absolute = false
}: {
	size?: number;
	style?: ViewStyle;
	/** fill the parent and center (drop-in for a full-screen ActivityIndicator) */
	absolute?: boolean;
}) => {
	const spin = useRef(new Animated.Value(0)).current;
	const pulse = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const rotate = Animated.loop(
			Animated.timing(spin, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: true })
		);
		const breathe = Animated.loop(
			Animated.sequence([
				Animated.timing(pulse, { toValue: 1, duration: 1300, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
				Animated.timing(pulse, { toValue: 0, duration: 1300, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
			])
		);
		rotate.start();
		breathe.start();
		return () => {
			rotate.stop();
			breathe.stop();
		};
	}, [spin, pulse]);

	const rotation = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
	const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1.12] });
	const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

	const content = (
		<View style={[styles.wrap, { width: size, height: size }, style]} accessibilityRole='progressbar'>
			<Animated.View
				style={[
					styles.glow,
					{
						width: size * 1.5,
						height: size * 1.5,
						borderRadius: size * 0.75,
						opacity: glowOpacity,
						transform: [{ scale: glowScale }]
					}
				]}
			/>
			<Animated.Image
				source={require('../static/images/enso_brush_white.png')}
				style={{ width: size, height: size, transform: [{ rotate: rotation }] }}
				resizeMode='contain'
			/>
		</View>
	);

	if (absolute) {
		return <View style={styles.fill}>{content}</View>;
	}
	return content;
};

export default EnsoLoader;
