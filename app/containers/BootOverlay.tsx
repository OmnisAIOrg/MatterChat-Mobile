import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { type IApplicationState, RootEnum } from '../definitions';
import EnsoLoader from './EnsoLoader';

/**
 * The opening.
 *
 * This is the brand's loading animation used the way it was designed to be used — in *hold* mode.
 * The ensō charges for exactly as long as the boot actually takes (a cold start with a database
 * migration looks the same as a warm one, just longer), and the moment the app is ready the charge
 * ignites and the overlay burns away to reveal the living sky underneath.
 *
 * It lives at the app root, above the navigator, precisely so it can outlive the root switch that
 * ends the boot: the loading *screen* unmounts the instant `app.root` changes, and an animation
 * that unmounts mid-frame is a cut, not a reveal.
 */
const GROUND = '#030E07';
const FADE_MS = 380;
/**
 * The floor the web splash holds before it ignites (`ensosplash`'s MIN). It lives here rather than
 * in the boot saga so the animation never delays the actual sign-in: the app can be ready in
 * 400ms and the mark still gets its full charge.
 */
const MIN_CHARGE_MS = 3500;

const styles = StyleSheet.create({
	root: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999
	},
	// 12/600, 3px tracking, uppercase, sitting 148px below the centre of the mark — the web
	// splash's label, to the pixel.
	caption: {
		fontSize: 12,
		fontWeight: '600',
		letterSpacing: 3,
		color: '#FFFFFF',
		textAlign: 'center',
		marginTop: 52,
		textTransform: 'uppercase'
	}
});

const BootOverlay = () => {
	const root = useSelector((state: IApplicationState) => state.app.root);
	const text = useSelector((state: IApplicationState) => state.app.text);
	const [phase, setPhase] = useState<'charging' | 'igniting' | 'gone'>('charging');
	const ground = useRef(new Animated.Value(1)).current;
	const caption = useRef(new Animated.Value(0.4)).current;
	const mountedAt = useRef(0);

	// Stamped on mount, not during render: the minimum charge is measured from the moment the
	// overlay actually appeared.
	useEffect(() => {
		mountedAt.current = Date.now();
	}, []);

	// The label breathes on the same 2.4s cycle as the charge — the web splash animates it
	// 0.4 → 0.92 → 0.4, so the two read as one thing rather than as a mark plus a caption.
	useEffect(() => {
		if (phase !== 'charging') {
			return;
		}
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(caption, { toValue: 0.92, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
				Animated.timing(caption, { toValue: 0.4, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
			])
		);
		loop.start();
		return () => loop.stop();
	}, [caption, phase]);

	const booted = !!root && root !== RootEnum.ROOT_LOADING && root !== RootEnum.ROOT_LOADING_SHARE_EXTENSION;

	useEffect(() => {
		if (!booted || phase !== 'charging') {
			return;
		}
		const wait = Math.max(0, MIN_CHARGE_MS - (Date.now() - (mountedAt.current || Date.now())));
		const timer = setTimeout(() => {
			setPhase('igniting');
			// The ground holds through the flash and only then lets go, so the app is revealed *by*
			// the ignition rather than appearing next to it.
			Animated.sequence([
				Animated.timing(caption, { toValue: 0, duration: 400, useNativeDriver: true }),
				Animated.delay(680),
				Animated.timing(ground, { toValue: 0, duration: FADE_MS, easing: Easing.out(Easing.quad), useNativeDriver: true })
			]).start();
		}, wait);
		return () => clearTimeout(timer);
	}, [booted, phase, ground, caption]);

	if (phase === 'gone') {
		return null;
	}

	return (
		<Animated.View style={[styles.root, { backgroundColor: GROUND, opacity: ground }]} pointerEvents='none'>
			<EnsoLoader size={240} igniting={phase === 'igniting'} onDone={() => setPhase('gone')} />
			<Animated.Text style={[styles.caption, { opacity: caption }]}>
				<Text>{text || 'Initializing'}</Text>
			</Animated.Text>
		</Animated.View>
	);
};

export default BootOverlay;
