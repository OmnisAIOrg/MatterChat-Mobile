import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * The MatterChat loading mark — the web app's initializing ensō.
 *
 * A green particle ensō turns slowly against the dark ground while a soft emerald bloom
 * breathes behind it, so a wait reads as the brand rather than as a stall. Used by
 * ActivityIndicator (so every wait state in the app inherits it) and by the startup screen,
 * which pairs it with the INITIALIZING caption.
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
	bloom: {
		position: 'absolute',
		backgroundColor: 'rgba(52, 230, 168, 0.16)'
	},
	bloomInner: {
		position: 'absolute',
		backgroundColor: 'rgba(18, 185, 129, 0.20)'
	}
});

const EnsoLoader = ({
	size = 48,
	style,
	absolute = false,
	/** Mark colour — defaults to the mint the web app glows with. */
	tint = '#7BE8B0'
}: {
	size?: number;
	style?: ViewStyle;
	/** fill the parent and centre (drop-in for a full-screen spinner) */
	absolute?: boolean;
	tint?: string;
}) => {
	const spin = useRef(new Animated.Value(0)).current;
	const pulse = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const rotate = Animated.loop(
			Animated.timing(spin, { toValue: 1, duration: 3600, easing: Easing.linear, useNativeDriver: true })
		);
		const breathe = Animated.loop(
			Animated.sequence([
				Animated.timing(pulse, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
				Animated.timing(pulse, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
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
	const bloomScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.84, 1.14] });
	const bloomOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] });
	const markOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] });

	const content = (
		<View style={[styles.wrap, { width: size, height: size }, style]} accessibilityRole='progressbar'>
			<Animated.View
				style={[
					styles.bloom,
					{
						width: size * 1.7,
						height: size * 1.7,
						borderRadius: size * 0.85,
						opacity: bloomOpacity,
						transform: [{ scale: bloomScale }]
					}
				]}
			/>
			<Animated.View
				style={[
					styles.bloomInner,
					{
						width: size * 1.05,
						height: size * 1.05,
						borderRadius: size * 0.525,
						opacity: bloomOpacity,
						transform: [{ scale: bloomScale }]
					}
				]}
			/>
			<Animated.Image
				source={require('../static/images/enso_particle_white.png')}
				style={{ width: size, height: size, opacity: markOpacity, transform: [{ rotate: rotation }] }}
				resizeMode='contain'
				tintColor={tint}
			/>
		</View>
	);

	if (absolute) {
		return <View style={styles.fill}>{content}</View>;
	}
	return content;
};

export default EnsoLoader;
