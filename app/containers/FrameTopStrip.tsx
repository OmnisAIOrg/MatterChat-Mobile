import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FRAME_GREEN } from '../lib/constants/colors';

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

const FrameTopStrip = () => {
	const { top } = useSafeAreaInsets();
	if (!top) {
		return null;
	}
	return <View pointerEvents='none' style={[styles.strip, { height: top, backgroundColor: FRAME_GREEN }]} />;
};

export default FrameTopStrip;
