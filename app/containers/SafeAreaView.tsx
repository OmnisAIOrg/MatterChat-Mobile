import { memo, type ReactElement } from 'react';
import { Platform, StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context';

import { themes } from '../lib/constants/colors';
import { paper, sheet as geom } from '../lib/constants/paperSky';
import { useTheme } from '../theme';
import { useSkyState } from './Sky';

/**
 * The screen scaffold — and, in Paper & Sky, the reason every screen in the app is the same object.
 *
 * Nearly every view in MatterChat wraps its content in this. So rather than restyling seventy
 * screens one at a time, the sheet lives here: content is inset from the sides, rounded at the top
 * with the system's one radius, given the lit top edge, and floated over the living sky with a long
 * soft shadow. A settings sub-screen and the rooms list are then the same surface by construction
 * rather than by coincidence.
 *
 * `plain` opts out for the few screens that compose their own sheet (the room conversation) or that
 * must run edge to edge (media viewers).
 */
const styles = StyleSheet.create({
	view: {
		flex: 1,
		marginHorizontal: 14,
		borderTopLeftRadius: geom.radius,
		borderTopRightRadius: geom.radius,
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
	plain: {
		flex: 1
	},
	rim: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		zIndex: 2,
		backgroundColor: paper.rim
	}
});

type SupportedChildren = ReactElement | ReactElement[] | null;
type TSafeAreaViewChildren = SupportedChildren | SupportedChildren[];

interface ISafeAreaView extends ViewProps {
	vertical?: boolean;
	/** skip the sheet — for screens that compose their own, or that must run edge to edge */
	plain?: boolean;
	children: TSafeAreaViewChildren;
}

const SafeAreaView = memo(({ style, children, vertical = true, plain, ...props }: ISafeAreaView) => {
	const { theme } = useTheme();
	const { sky } = useSkyState();
	return (
		<SafeAreaContext
			style={[
				plain ? styles.plain : styles.view,
				plain ? null : { backgroundColor: themes[theme].surfaceRoom, shadowColor: sky.sheetShadow },
				style
			]}
			edges={vertical ? ['right', 'left'] : undefined}
			{...props}>
			{plain ? null : <View style={styles.rim} pointerEvents='none' />}
			{children}
		</SafeAreaContext>
	);
});

export default SafeAreaView;
