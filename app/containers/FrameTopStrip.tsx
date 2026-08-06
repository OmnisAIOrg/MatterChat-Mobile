import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type IApplicationState, RootEnum } from '../definitions';
import { FRAME_GREEN } from '../lib/constants/colors';
import { useAppSelector } from '../lib/hooks/useAppSelector';

/**
 * The status-bar strip of the app frame.
 *
 * iOS paints the area behind the status bar from a layer beneath React (it survived the
 * navigator theme, SafeAreaProvider, the root view and expo-system-ui), so the frame's green
 * is drawn explicitly here and rendered above the app content. It is inert to touch, so it
 * only changes the colour of that band and nothing else.
 */
const styles = StyleSheet.create({
	strip: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10
	}
});

/** The strip takes the colour of whatever the screen puts directly beneath it. */
const groundFor = (root?: string): string => {
	if (root === RootEnum.ROOT_LOADING || root === RootEnum.ROOT_LOADING_SHARE_EXTENSION) {
		return '#0B120D'; // the initializing ground
	}
	if (root === RootEnum.ROOT_OUTSIDE) {
		return '#12402C'; // the onboarding forest, at its top stop
	}
	return FRAME_GREEN; // inside the app the header sits here
};

const FrameTopStrip = () => {
	const { top } = useSafeAreaInsets();
	const root = useAppSelector((state: IApplicationState) => state.app.root);
	if (!top) {
		return null;
	}
	return <View pointerEvents='none' style={[styles.strip, { height: top, backgroundColor: groundFor(root) }]} />;
};

export default FrameTopStrip;
