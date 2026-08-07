import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';

import { useTheme } from '../../theme';
import Collapse from './components/Collapse';
import EndCall from './components/EndCall';
import { useCallStore, useControlsVisible } from '../../lib/services/voip/useCallStore';
import { Content } from './components/Content';
import { CONTROLS_ANIMATION_DURATION } from '../../views/CallView/styles';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingBottom: 12,
		borderBottomWidth: StyleSheet.hairlineWidth
	}
});

const MediaCallHeader = () => {
	'use memo';

	const { colors } = useTheme();
	const insets = useSafeAreaInsets();
	const call = useCallStore(useShallow(state => state.call));
	const focused = useCallStore(state => state.focused);
	const controlsVisible = useControlsVisible();

	const shouldHide = focused && !controlsVisible;

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: withTiming(shouldHide ? 0 : 1, { duration: CONTROLS_ANIMATION_DURATION }),
		transform: [
			{
				translateY: withTiming(shouldHide ? -100 : 0, {
					duration: CONTROLS_ANIMATION_DURATION
				})
			}
		],
		backgroundColor: withTiming(shouldHide ? 'transparent' : colors.surfaceNeutral, { duration: CONTROLS_ANIMATION_DURATION }),
		borderBottomColor: withTiming(shouldHide ? 'transparent' : colors.strokeLight, { duration: CONTROLS_ANIMATION_DURATION })
	}));

	const defaultHeaderStyle = {
		backgroundColor: colors.surfaceNeutral,
		paddingTop: insets.top
	};

	// With no call in progress this view is nothing but the app's status-bar spacer — every screen
	// below relies on it to consume the top inset. It must stay in the tree, but it must not paint:
	// in Paper & Sky the living sky runs behind it, and an opaque band here is the one thing that
	// would cut the sky off at the top of every screen in the app.
	if (!call) {
		return <View style={{ paddingTop: insets.top, backgroundColor: 'transparent' }} testID='media-call-header-empty' />;
	}

	return (
		<Animated.View
			style={[
				styles.header,
				{ ...defaultHeaderStyle, borderBottomColor: colors.strokeLight, paddingTop: insets.top + 12 },
				animatedStyle
			]}
			pointerEvents={shouldHide ? 'none' : 'auto'}
			testID='media-call-header'>
			<Collapse />
			<Content />
			<EndCall />
		</Animated.View>
	);
};

export default MediaCallHeader;
