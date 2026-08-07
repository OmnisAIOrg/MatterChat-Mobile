import MaskedView from '@react-native-masked-view/masked-view';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * The ensō loader — the same animation the MatterChat web and desktop apps play while they boot,
 * ported to native.
 *
 * The web splash (`ensosplash` → `EnsoLoader.play({ hold: true, scrim: true, size: 240 })`) is a
 * stack of masked layers with blend modes: the brush mark *charges* on a 2.4s breath while rings
 * of energy *implode* into it every 1.3s, and when the app is ready the charge *ignites* into a
 * green-white flash and the overlay burns away. RN has no mask-image and no mix-blend-mode, so
 * each masked layer is rebuilt as a tinted copy of the real bristle artwork and cross-faded:
 *
 *   base   — the brush unlit, deep forest, always present
 *   charge — the brush in brand green, opacity breathing 0.28 → 1   (CSS `brightness .8 → 1.14`)
 *   build  — the brush in near-white, gathering as it charges       (CSS `.e-b1/.e-b2/.e-b3`)
 *   rings  — three imploding energy haloes                          (CSS `ensoRipple`)
 *   fire   — the ignition, then the mark is gone                    (CSS `ensoFill/ensoPeak`)
 *
 * The rings are the animation's signature. The web draws them as a radial-gradient band —
 * transparent, then a soft green shoulder, then a white-hot core, then transparent again — *inside
 * the brush's own mask*, so the energy appears to travel through the ink rather than to sit in a
 * hole in the middle of it. Those exact stops are reproduced here, and the whole stack is clipped
 * to the brush with a MaskedView, which is the one thing that makes it read as the web's mark.
 *
 * Timings are lifted from the original: 2.4s charge, 1.3s rings staggered 0 / 0.43 / 0.87s, 1.3s
 * finale. Everything animates opacity and transform only, on the native driver, so the loading
 * screen never competes with the JS thread it is waiting for.
 */
const MARK_RATIO = 748 / 784;

const CHARGE_MS = 2400;
const RING_MS = 1300;
const FIRE_MS = 1300;

const ink = {
	unlit: '#0B3A1C',
	charged: '#22C25C',
	hot: '#B8FFCF'
};

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
	ring: {
		position: 'absolute'
	},
	ringLayer: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

interface IEnsoLoaderProps {
	/** Mark width in points — the web splash uses 240. */
	size?: number;
	style?: ViewStyle;
	/** fill the parent and centre (drop-in for a full-screen spinner) */
	absolute?: boolean;
	/** flip true when the thing being waited on is ready */
	igniting?: boolean;
	/** false = fade out quietly instead of igniting */
	peak?: boolean;
	onDone?: () => void;
}

/**
 * One imploding halo. The gradient stops are the web's verbatim:
 * transparent → soft green shoulder → white-hot core → transparent.
 */
const Ring = ({ size, delay }: { size: number; delay: number }) => {
	const t = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const loop = Animated.loop(
			Animated.timing(t, { toValue: 1, duration: RING_MS, easing: Easing.out(Easing.ease), useNativeDriver: true })
		);
		const timer = setTimeout(() => loop.start(), delay);
		return () => {
			clearTimeout(timer);
			loop.stop();
		};
	}, [t, delay]);

	const id = `ripple${delay}`;

	return (
		<Animated.View
			pointerEvents='none'
			style={[
				styles.ring,
				{
					width: size,
					height: size,
					opacity: t.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 1, 0] }),
					transform: [{ scale: t.interpolate({ inputRange: [0, 1], outputRange: [2.05, 0.3] }) }]
				}
			]}>
			<Svg width={size} height={size}>
				<Defs>
					<RadialGradient id={id} cx='50%' cy='50%' rx='50%' ry='50%'>
						<Stop offset='0.14' stopColor='#46EB82' stopOpacity={0} />
						<Stop offset='0.19' stopColor='#5AF096' stopOpacity={0.28} />
						<Stop offset='0.24' stopColor='#50F08C' stopOpacity={0.55} />
						<Stop offset='0.27' stopColor='#3CEB78' stopOpacity={1} />
						<Stop offset='0.295' stopColor='#B8FFCF' stopOpacity={1} />
						<Stop offset='0.315' stopColor='#6BFFA2' stopOpacity={1} />
						<Stop offset='0.34' stopColor='#50F08C' stopOpacity={0.95} />
						<Stop offset='0.39' stopColor='#32D769' stopOpacity={0} />
					</RadialGradient>
				</Defs>
				<Rect x='0' y='0' width='100%' height='100%' fill={`url(#${id})`} />
			</Svg>
		</Animated.View>
	);
};

const EnsoLoader = ({ size = 48, style, absolute = false, igniting = false, peak = true, onDone }: IEnsoLoaderProps) => {
	const markW = size;
	const markH = Math.round(size * MARK_RATIO);

	const charge = useRef(new Animated.Value(0)).current;
	const fire = useRef(new Animated.Value(0)).current;
	const scale = useRef(new Animated.Value(1)).current;
	const vanish = useRef(new Animated.Value(1)).current;

	// The charging breath, looping for as long as the boot takes — two seconds or twenty.
	useEffect(() => {
		if (igniting) {
			return;
		}
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(charge, {
					toValue: 1,
					duration: CHARGE_MS * 0.55,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true
				}),
				Animated.timing(charge, {
					toValue: 0,
					duration: CHARGE_MS * 0.45,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true
				})
			])
		);
		loop.start();
		return () => loop.stop();
	}, [charge, igniting]);

	const finish = useCallback(() => onDone?.(), [onDone]);

	// The finale: the charge is pulled in before it lets go, then the mark ignites and vanishes.
	useEffect(() => {
		if (!igniting) {
			return;
		}
		if (!peak) {
			Animated.timing(vanish, {
				toValue: 0,
				duration: 800,
				easing: Easing.out(Easing.quad),
				useNativeDriver: true
			}).start(finish);
			return;
		}
		Animated.parallel([
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 0.968,
					duration: FIRE_MS * 0.18,
					easing: Easing.bezier(0.7, 0, 0.9, 0.4),
					useNativeDriver: true
				}),
				Animated.timing(scale, {
					toValue: 1.035,
					duration: FIRE_MS * 0.12,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true
				}),
				Animated.timing(scale, { toValue: 1.01, duration: FIRE_MS * 0.15, useNativeDriver: true })
			]),
			Animated.sequence([
				Animated.delay(FIRE_MS * 0.22),
				Animated.timing(fire, { toValue: 1, duration: FIRE_MS * 0.1, easing: Easing.out(Easing.quad), useNativeDriver: true })
			]),
			Animated.sequence([
				Animated.delay(FIRE_MS * 0.72),
				Animated.timing(vanish, { toValue: 0, duration: FIRE_MS * 0.28, easing: Easing.linear, useNativeDriver: true })
			])
		]).start(finish);
	}, [igniting, peak, scale, fire, vanish, finish]);

	const markStyle = useMemo(() => ({ width: markW, height: markH }), [markW, markH]);
	const ringSize = Math.round(markW * 1.5);

	const content = (
		<Animated.View
			pointerEvents='none'
			accessibilityRole='progressbar'
			style={[styles.wrap, markStyle, style, { opacity: vanish, transform: [{ scale }] }]}>
			<MaskedView
				style={markStyle}
				maskElement={<Image source={require('../static/images/enso_bristle.png')} style={markStyle} resizeMode='contain' />}>
				{/* Everything below is clipped to the brush. The mark is never drawn as an image —
				    it is drawn as light, in the shape of the brush. */}
				<View style={[markStyle, { backgroundColor: ink.unlit }]} />
				<Animated.View
					style={[
						StyleSheet.absoluteFillObject,
						{ backgroundColor: ink.charged, opacity: charge.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }
					]}
				/>
				<Animated.View
					style={[
						StyleSheet.absoluteFillObject,
						{ backgroundColor: ink.hot, opacity: charge.interpolate({ inputRange: [0, 1], outputRange: [0, 0.28] }) }
					]}
				/>
				<View style={styles.ringLayer} pointerEvents='none'>
					<Ring size={ringSize} delay={0} />
					<Ring size={ringSize} delay={430} />
					<Ring size={ringSize} delay={870} />
				</View>
				<Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FFFFFF', opacity: fire }]} />
			</MaskedView>
		</Animated.View>
	);

	if (absolute) {
		return <View style={styles.fill}>{content}</View>;
	}
	return content;
};

export default EnsoLoader;
