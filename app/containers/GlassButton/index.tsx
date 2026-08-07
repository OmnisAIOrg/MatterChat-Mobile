import { BlurView } from 'expo-blur';
import { type ReactNode, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * A round glass control — the app's circular buttons: the workspace and compose keys on the hero,
 * quick actions, the close key on Chi.
 *
 * A flat translucent disc disappears on the pale top of the sky, so this is built as a *dome*
 * rather than a wash. Six layers, each doing one job:
 *
 *   blur       — the real material under everything
 *   tint       — a smoked gradient dark enough for a white glyph to read on any part of the sky
 *   crown      — a bright arc down the top third: the light landing on the dome
 *   underside  — a dark arc up from the bottom: the shade turning away from it
 *   specular   — a small radial hot spot up and to the left, the actual light source
 *   rim        — a 1.5px edge, plus a real drop shadow so the key sits above the sky
 *
 * It gives under the finger and springs back, because a key that doesn't move isn't a key.
 */
interface IGlassButtonProps {
	size?: number;
	onPress?: () => void;
	children: ReactNode;
	style?: ViewStyle;
	accessibilityLabel?: string;
	testID?: string;
	/** a green key rather than a clear one — used for primary actions on the sky */
	tone?: 'clear' | 'accent';
}

const TONES = {
	clear: {
		from: 'rgba(16,44,26,0.34)',
		to: 'rgba(4,16,9,0.46)',
		border: 'rgba(255,255,255,0.46)'
	},
	accent: {
		from: 'rgba(23,95,53,0.86)',
		to: 'rgba(12,58,32,0.94)',
		border: 'rgba(255,255,255,0.52)'
	}
} as const;

const styles = StyleSheet.create({
	shadow: {
		...Platform.select({
			ios: {
				shadowColor: '#03120A',
				shadowOffset: { width: 0, height: 4 },
				shadowRadius: 9,
				shadowOpacity: 0.4
			},
			android: { elevation: 6 }
		})
	},
	dome: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	fill: StyleSheet.absoluteFillObject,
	content: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const GlassButton = ({ size = 42, onPress, children, style, accessibilityLabel, testID, tone = 'clear' }: IGlassButtonProps) => {
	const scale = useRef(new Animated.Value(1)).current;
	const to = (v: number) => Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 8 }).start();
	const t = TONES[tone];
	const r = size / 2;

	return (
		<Pressable
			onPress={onPress}
			onPressIn={() => to(0.9)}
			onPressOut={() => to(1)}
			accessibilityRole='button'
			accessibilityLabel={accessibilityLabel}
			testID={testID}
			hitSlop={8}>
			<Animated.View style={[styles.shadow, { borderRadius: r }, style, { transform: [{ scale }] }]}>
				<View style={[styles.dome, { width: size, height: size, borderRadius: r, borderWidth: 1.5, borderColor: t.border }]}>
					<BlurView intensity={26} tint='dark' experimentalBlurMethod='none' style={styles.fill} pointerEvents='none' />
					<LinearGradient
						colors={[t.from, t.to]}
						start={{ x: 0.3, y: 0 }}
						end={{ x: 0.7, y: 1 }}
						style={styles.fill}
						pointerEvents='none'
					/>
					{/* the crown of light along the top of the dome */}
					<LinearGradient
						colors={['rgba(255,255,255,0.34)', 'rgba(255,255,255,0)']}
						style={[styles.fill, { height: size * 0.42 }]}
						pointerEvents='none'
					/>
					{/* and the shade where it turns away */}
					<LinearGradient
						colors={['rgba(0,0,0,0)', 'rgba(2,12,6,0.34)']}
						style={[styles.fill, { top: size * 0.58 }]}
						pointerEvents='none'
					/>
					{/* the hot spot — where the light actually is */}
					<Svg style={styles.fill} pointerEvents='none'>
						<Defs>
							<RadialGradient id={`gbSpec${size}${tone}`} cx='32%' cy='24%' rx='46%' ry='46%'>
								<Stop offset='0' stopColor='#FFFFFF' stopOpacity={0.42} />
								<Stop offset='0.55' stopColor='#FFFFFF' stopOpacity={0} />
							</RadialGradient>
						</Defs>
						<Rect x='0' y='0' width='100%' height='100%' fill={`url(#gbSpec${size}${tone})`} />
					</Svg>
					<View style={styles.content}>{children}</View>
				</View>
			</Animated.View>
		</Pressable>
	);
};

export default GlassButton;
