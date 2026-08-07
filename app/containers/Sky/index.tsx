import { createContext, type ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useSelector } from 'react-redux';

import { type IApplicationState } from '../../definitions';
import { type ISky, SKY, type TSkyState } from '../../lib/constants/paperSky';

/**
 * The living sky.
 *
 * One gradient fills the window behind everything and is never covered edge to edge. It is not
 * decoration — it is data: the sky tells you what kind of day you are having before you read a
 * single row (caught up / working / a deadline inside 24h / heads-down).
 *
 * Rendered once at the root so it survives every navigation. Screens push their paper over it;
 * nothing re-mounts it, so pushes, tab switches and modals all glide over one continuous
 * background instead of cutting between per-screen wallpapers.
 *
 * Composition matches the gallery exactly: a vertical ground, a sun flare hung off the top edge,
 * and a horizon vignette anchoring the bottom. The two radials are SVG (RN's linear gradients
 * can't do ellipses); the ground is a native LinearGradient so the common case stays cheap.
 */

// ── the state store ────────────────────────────────────────────────────────────────────────────
// Screens override the sky while they are focused (voice mode goes night, a room with a filing
// deadline goes dusk). Kept out of redux deliberately: it is presentation-only, changes on
// navigation, and must never trigger a store-wide re-render.

type TListener = () => void;

const overrides: { key: string; state: TSkyState }[] = [];
const listeners = new Set<TListener>();

const emit = () => listeners.forEach(l => l());

const pushOverride = (key: string, state: TSkyState) => {
	const existing = overrides.findIndex(o => o.key === key);
	if (existing !== -1) {
		if (overrides[existing].state === state) {
			return;
		}
		overrides[existing] = { key, state };
	} else {
		overrides.push({ key, state });
	}
	emit();
};

const dropOverride = (key: string) => {
	const idx = overrides.findIndex(o => o.key === key);
	if (idx !== -1) {
		overrides.splice(idx, 1);
		emit();
	}
};

/** The topmost override wins — the most recently focused screen owns the sky. */
const currentOverride = (): TSkyState | undefined => overrides[overrides.length - 1]?.state;

let overrideSeq = 0;

/**
 * Force a sky state for as long as the calling component is mounted. Pass `null` to opt out
 * (e.g. a screen that only goes night while a call is live).
 */
export const useSkyOverride = (state: TSkyState | null) => {
	// The key is minted on mount rather than during render: a render can be thrown away and
	// re-run, and burning sequence numbers on discarded renders is a side effect.
	const key = useRef<string>('');
	useEffect(() => {
		overrideSeq += 1;
		key.current = `sky-${overrideSeq}`;
		return () => dropOverride(key.current);
	}, []);
	useEffect(() => {
		if (!key.current) {
			overrideSeq += 1;
			key.current = `sky-${overrideSeq}`;
		}
		if (state) {
			pushOverride(key.current, state);
		} else {
			dropOverride(key.current);
		}
	}, [state]);
};

// ── the context ────────────────────────────────────────────────────────────────────────────────

interface ISkyContext {
	state: TSkyState;
	sky: ISky;
}

const SkyContext = createContext<ISkyContext>({ state: 'day', sky: SKY.day });

/** The sky the screen is currently sitting on — use it for shadow colours and chrome contrast. */
export const useSkyState = () => useContext(SkyContext);

const useDerivedSky = (): TSkyState => {
	const [, force] = useState(0);
	useEffect(() => {
		const l = () => force(n => n + 1);
		listeners.add(l);
		return () => {
			listeners.delete(l);
		};
	}, []);

	// Already in the store — the sky costs no new requests.
	const status = useSelector((state: IApplicationState) => state.login.user?.status);

	// A focused screen knows more than we do: the rooms list knows whether you are caught up, a
	// room knows about its filing deadline, voice mode knows it wants night. They win.
	const override = currentOverride();
	if (override) {
		return override;
	}
	// Heads-down: you have told us not to interrupt, so the sky stops shouting.
	if (status === 'busy') {
		return 'night';
	}
	return 'day';
};

export const SkyProvider = ({ children }: { children: ReactNode }) => {
	const state = useDerivedSky();
	const value = useMemo(() => ({ state, sky: SKY[state] }), [state]);
	return <SkyContext.Provider value={value}>{children}</SkyContext.Provider>;
};

// ── the renderer ───────────────────────────────────────────────────────────────────────────────

const pct = (n: number) => `${n * 100}%`;

/** One sky layer: ground + flare + vignette. Static — the crossfade happens a level up. */
const SkyLayer = ({ sky }: { sky: ISky }) => (
	<View style={StyleSheet.absoluteFill} pointerEvents='none'>
		<LinearGradient
			colors={sky.stops as unknown as string[]}
			locations={sky.locations}
			start={{ x: 0.5, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			style={StyleSheet.absoluteFill}
		/>
		<Svg style={StyleSheet.absoluteFill} pointerEvents='none'>
			<Defs>
				<RadialGradient id='flare' cx={pct(sky.flare.x)} cy={pct(sky.flare.y)} rx={pct(sky.flare.rx)} ry={pct(sky.flare.ry)}>
					<Stop offset='0' stopColor={sky.flare.color} />
					<Stop offset='0.62' stopColor={sky.flare.color} stopOpacity={0} />
				</RadialGradient>
				<RadialGradient
					id='vignette'
					cx={pct(sky.vignette.x)}
					cy={pct(sky.vignette.y)}
					rx={pct(sky.vignette.rx)}
					ry={pct(sky.vignette.ry)}>
					<Stop offset='0' stopColor={sky.vignette.color} />
					<Stop offset='0.68' stopColor={sky.vignette.color} stopOpacity={0} />
				</RadialGradient>
			</Defs>
			<Rect x='0' y='0' width='100%' height='100%' fill='url(#vignette)' />
			<Rect x='0' y='0' width='100%' height='100%' fill='url(#flare)' />
		</Svg>
	</View>
);

/**
 * The root sky. Two stacked layers so a state change is a 2s dissolve rather than a cut — the
 * background should change the way weather does, below the threshold of noticing.
 */
const Sky = () => {
	const { sky } = useSkyState();
	const [base, setBase] = useState<ISky>(sky);
	const [top, setTop] = useState<ISky>(sky);
	const fade = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		if (sky === top) {
			return;
		}
		setBase(top);
		setTop(sky);
		fade.setValue(0);
		Animated.timing(fade, {
			toValue: 1,
			duration: 2000,
			easing: Easing.inOut(Easing.quad),
			useNativeDriver: true
		}).start();
	}, [sky, top, fade]);

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents='none'>
			<SkyLayer sky={base} />
			<Animated.View style={[StyleSheet.absoluteFill, { opacity: fade }]}>
				<SkyLayer sky={top} />
			</Animated.View>
		</View>
	);
};

export default Sky;
