import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Platform, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { orb } from '../../lib/constants/paperSky';

/**
 * The Chi orb — a lit sphere, not a flat green circle.
 *
 * It appears in exactly three places (dock centre, Chi tab hero, onboarding mark) and it is the
 * single most-looked-at object in the app, so it gets the full depth treatment: a specular
 * highlight up and to the left, a bright rim along the top, a dark cast along the bottom, a 2px
 * white border, and a real drop shadow. CSS gets those last two as `inset` box-shadows; RN has no
 * inset shadow, so each one is drawn as a clipped gradient child. The result is the same sphere.
 *
 * `breathe` runs the 3.2s idle loop (scale 1 → 1.06). It is deliberately slow: the orb should
 * read as alive but never as busy.
 */
interface IChiOrbProps {
	size: number;
	breathe?: boolean;
	/** the idle loop is 3.2s; voice mode quickens to 2.6s */
	period?: number;
	style?: any;
}

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	shadowHost: {
		...Platform.select({
			ios: {
				shadowColor: orb.shadowColor,
				shadowOffset: { width: 0, height: 12 },
				shadowRadius: 14,
				shadowOpacity: 0.55
			},
			android: { elevation: 10 }
		})
	},
	fill: StyleSheet.absoluteFillObject
});

const ChiOrb = ({ size, breathe, period = 3200, style }: IChiOrbProps) => {
	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		if (!breathe) {
			return;
		}
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 1.06,
					duration: period / 2,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true
				}),
				Animated.timing(scale, {
					toValue: 1,
					duration: period / 2,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true
				})
			])
		);
		loop.start();
		return () => loop.stop();
	}, [breathe, period, scale]);

	const r = size / 2;

	return (
		<Animated.View style={[styles.shadowHost, { width: size, height: size, borderRadius: r }, style, { transform: [{ scale }] }]}>
			<View
				style={[
					styles.root,
					{
						width: size,
						height: size,
						borderRadius: r,
						backgroundColor: orb.base,
						borderWidth: 2,
						borderColor: orb.border
					}
				]}>
				<Image
					source={require('../../static/images/enso_circle.png')}
					style={{ width: size - 4, height: size - 4, borderRadius: r }}
					resizeMode='cover'
				/>
				{/* the rim of light along the top — CSS `inset 0 2px 3px rgba(255,255,255,.5)` */}
				<LinearGradient
					colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
					style={[styles.fill, { height: size * 0.22 }]}
					pointerEvents='none'
				/>
				{/* the ground shade along the bottom — CSS `inset 0 -4px 8px rgba(3,20,10,.55)` */}
				<LinearGradient
					colors={['rgba(3,20,10,0)', 'rgba(3,20,10,0.55)']}
					style={[styles.fill, { top: size * 0.7 }]}
					pointerEvents='none'
				/>
				{/* the specular — where the light source actually is */}
				<Svg style={styles.fill} pointerEvents='none'>
					<Defs>
						<RadialGradient id='chiSpec' cx='32%' cy='24%' rx='50%' ry='50%'>
							<Stop offset='0' stopColor={orb.specularFrom} />
							<Stop offset='0.5' stopColor='#FFFFFF' stopOpacity={0} />
						</RadialGradient>
					</Defs>
					<Rect x='0' y='0' width='100%' height='100%' fill='url(#chiSpec)' />
				</Svg>
			</View>
		</Animated.View>
	);
};

export default ChiOrb;
