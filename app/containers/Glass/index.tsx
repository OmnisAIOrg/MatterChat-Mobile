import { BlurView } from 'expo-blur';
import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { glass } from '../../lib/constants/paperSky';

/**
 * Glass — the app's chrome, and only the chrome.
 *
 * Four recipes, all built the same way: a real UIVisualEffectView doing the blur, a tint on top
 * of it, a hairline border, and — on the docks — a 1.5px inset highlight along the top edge. That
 * last rim is what sells it: it is the only thing that makes a translucent panel read as a
 * physical pane catching light rather than as a semi-transparent rectangle.
 *
 *   clear  — circle buttons, quick actions
 *   field  — search / "To:" inputs
 *   dock   — the floating tab bar and the composer
 *   spring — Chi's suggestion chips on the night sky
 *
 * Content is never glass. If you read it, it's paper.
 */
export type TGlass = 'clear' | 'field' | 'dock' | 'spring';

interface IGlassProps {
	variant?: TGlass;
	radius: number;
	style?: ViewStyle | ViewStyle[];
	children?: ReactNode;
	/** box-none lets touches through the pane to the buttons inside it */
	pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}

const styles = StyleSheet.create({
	root: {
		overflow: 'hidden'
	},
	rim: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 1.5
	}
});

const Glass = ({ variant = 'dock', radius, style, children, pointerEvents }: IGlassProps) => {
	const recipe = glass[variant];
	const border = 'border' in recipe ? recipe.border : undefined;
	const rim = 'rim' in recipe ? recipe.rim : undefined;

	return (
		<View
			pointerEvents={pointerEvents}
			style={[styles.root, { borderRadius: radius, borderWidth: border ? 1 : 0, borderColor: border }, style]}>
			<BlurView
				intensity={recipe.blur}
				tint='dark'
				experimentalBlurMethod='none'
				style={StyleSheet.absoluteFill}
				pointerEvents='none'
			/>
			{'from' in recipe ? (
				<LinearGradient
					colors={[recipe.from, recipe.to]}
					start={{ x: 0.15, y: 0 }}
					end={{ x: 0.85, y: 1 }}
					style={StyleSheet.absoluteFill}
					pointerEvents='none'
				/>
			) : (
				<View style={[StyleSheet.absoluteFill, { backgroundColor: recipe.fill }]} pointerEvents='none' />
			)}
			{rim ? <View style={[styles.rim, { backgroundColor: rim }]} pointerEvents='none' /> : null}
			{children}
		</View>
	);
};

export default Glass;
