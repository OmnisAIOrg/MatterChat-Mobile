import { type ReactNode, useEffect, useRef } from 'react';
import {
	Animated,
	Easing,
	Platform,
	ScrollView,
	type ScrollViewProps,
	StyleSheet,
	Text,
	View,
	type ViewStyle
} from 'react-native';

import { RULE, paper as light, paperNight as night, sheet as geom, type TPaper } from '../../lib/constants/paperSky';
import { useTheme } from '../../theme';
import { useSkyState } from '../Sky';

/**
 * Paper — every reading surface in the app.
 *
 * The rule the whole design hangs on: **one sheet per screen**. Not a stack of floating cards —
 * a single warm-cream sheet, corner-radius 26, lifted off the sky by a long soft shadow, holding
 * all of the screen's content as hairline-divided rows. Multiple cards make a screen feel like a
 * dashboard; one sheet makes it feel like a document, which is what a legal comms tool should
 * feel like.
 *
 * The inset top rim (`#FFFDF7`) is not optional — without it the sheet is a flat rectangle; with
 * it the sheet has a lit edge and sits *on* the sky rather than being cut out of it.
 */

/** Light or night paper, matched to the app theme. Warm in both directions — never neutral grey. */
export const usePaper = (): TPaper => {
	const { theme } = useTheme();
	return theme === 'light' ? light : (night as unknown as TPaper);
};

interface ISheetProps {
	children: ReactNode;
	style?: ViewStyle | ViewStyle[];
	/** the tighter 22px radius used by overlay sheets (voice transcript, modals) */
	small?: boolean;
}

const styles = StyleSheet.create({
	sheet: {
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowOffset: { width: 0, height: 20 },
				shadowRadius: 24,
				shadowOpacity: 1
			},
			android: { elevation: 14 }
		})
	},
	// The lit top edge. A 1px child rather than a border so it never affects layout.
	rim: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		zIndex: 2
	},
	// The shade along the bottom lip — the counterpart to the rim. Together they give the sheet
	// two edges catching different light, which is what makes it read as a physical sheet.
	lip: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 1,
		zIndex: 2,
		opacity: 0.9
	},
	screenSheet: {
		flex: 1,
		marginHorizontal: 14,
		borderRadius: geom.radius,
		borderWidth: geom.border,
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowOffset: { width: 0, height: 20 },
				shadowRadius: 24,
				shadowOpacity: 1
			},
			android: { elevation: 14 }
		})
	},
	screenSheetAttached: {
		marginHorizontal: 0,
		marginBottom: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	row: {
		paddingVertical: geom.rowPaddingV,
		paddingHorizontal: geom.rowPaddingH
	},
	band: {
		height: 7,
		borderTopWidth: RULE,
		borderBottomWidth: RULE
	},
	sectionLabel: {
		fontSize: 11,
		fontWeight: '800',
		letterSpacing: 0.88
	}
});

/**
 * The screen's one sheet. Takes its shadow colour from the sky so the cast always belongs to the
 * light the screen is actually standing in.
 */
export const PaperSheet = ({ children, style, small }: ISheetProps) => {
	const p = usePaper();
	const { sky } = useSkyState();
	return (
		<View
			style={[
				styles.sheet,
				{
					borderRadius: small ? geom.radiusSmall : geom.radius,
					backgroundColor: p.sheet,
					shadowColor: sky.sheetShadow
				},
				style
			]}>
			<View style={[styles.rim, { backgroundColor: p.rim }]} pointerEvents='none' />
			{children}
		</View>
	);
};

/**
 * A sheet that scrolls its own content. Same shadow and rim; the scroll happens inside the paper
 * so the sheet's edges stay pinned and the sky behind it never moves.
 */
export const PaperScrollSheet = ({ children, style, contentContainerStyle, ...props }: ISheetProps & ScrollViewProps) => {
	const p = usePaper();
	const { sky } = useSkyState();
	return (
		<View style={[styles.sheet, { borderRadius: geom.radius, backgroundColor: p.sheet, shadowColor: sky.sheetShadow }, style]}>
			<View style={[styles.rim, { backgroundColor: p.rim }]} pointerEvents='none' />
			<ScrollView
				{...props}
				contentContainerStyle={contentContainerStyle}
				showsVerticalScrollIndicator={false}
				indicatorStyle='black'>
				{children}
			</ScrollView>
		</View>
	);
};

/**
 * The screen-level sheet: the single geometry every Paper & Sky screen uses.
 *
 * Defined once, on purpose. Corner radius, side inset, the lit top edge, the shade along the
 * bottom lip and the distance the sheet keeps from the floating dock are all decisions that have
 * to match across Home, Chats, Activity, You and every conversation, or the app reads as a set of
 * screens rather than as one surface. Screens pass content; they do not restate the geometry.
 *
 * `attached` drops the bottom margin and squares the bottom corners — for conversations, where
 * the sheet runs off the bottom of the frame under the composer instead of floating clear.
 */
export const ScreenSheet = ({
	children,
	attached,
	bottomInset = 0,
	dockClearance = 0,
	style
}: {
	children: ReactNode;
	attached?: boolean;
	bottomInset?: number;
	dockClearance?: number;
	style?: ViewStyle | ViewStyle[];
}) => {
	const p = usePaper();
	const { sky } = useSkyState();
	// The sheet arrives rather than appears: it rises a few points into place as it fades in. Tabs
	// cross-fade with no lateral motion, so without this the content would simply blink on.
	const enter = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		Animated.timing(enter, {
			toValue: 1,
			duration: 340,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true
		}).start();
	}, [enter]);

	return (
		<Animated.View
			style={[
				styles.screenSheet,
				attached ? styles.screenSheetAttached : { marginBottom: bottomInset + dockClearance - 20 },
				{ backgroundColor: p.sheet, shadowColor: sky.sheetShadow, borderColor: p.edge },
				style,
				{
					opacity: enter,
					transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }]
				}
			]}>
			<View style={[styles.rim, { backgroundColor: p.rim }]} pointerEvents='none' />
			{children}
			{attached ? null : <View style={[styles.lip, { backgroundColor: p.hairline }]} pointerEvents='none' />}
		</Animated.View>
	);
};

type TRowTone = 'plain' | 'green' | 'bright' | 'own';

interface IRowProps {
	children: ReactNode;
	tone?: TRowTone;
	/** last row in a group — drops the divider */
	last?: boolean;
	/** conversations use a softer divider than lists */
	soft?: boolean;
	style?: ViewStyle | ViewStyle[];
}

/**
 * A row on the sheet. `green` is reserved and means exactly one thing: **needs you, or it's from
 * Chi**. Cream is neutral, amber is a deadline, red is destructive only. Keeping that mapping
 * strict is what makes the colour readable at a glance.
 */
const ROW_TONE: Record<TRowTone, keyof TPaper | null> = {
	plain: null,
	green: 'green',
	bright: 'bright',
	own: 'own'
};

export const PaperRow = ({ children, tone = 'plain', last, soft, style }: IRowProps) => {
	const p = usePaper();
	const key = ROW_TONE[tone];
	const bg = key ? p[key] : undefined;
	return (
		<View
			style={[
				styles.row,
				bg ? { backgroundColor: bg } : null,
				last ? null : { borderBottomWidth: 1, borderBottomColor: soft ? p.hairlineSoft : p.hairline },
				style
			]}>
			{children}
		</View>
	);
};

/** The 7px green band that separates groups inside a settings sheet. */
export const PaperBand = () => {
	const p = usePaper();
	return <View style={[styles.band, { backgroundColor: p.green, borderColor: p.hairlineGreen }]} />;
};

/** TODAY / MORNING BRIEFING / MENTIONS — 11pt, 800, wide tracking, always uppercase. */
export const PaperLabel = ({ children, color, style }: { children: ReactNode; color?: string; style?: ViewStyle }) => {
	const p = usePaper();
	return <Text style={[styles.sectionLabel, { color: color ?? p.inkFaint }, style]}>{children}</Text>;
};
