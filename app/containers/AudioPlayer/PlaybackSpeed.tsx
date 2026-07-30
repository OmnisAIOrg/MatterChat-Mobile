import { Text } from 'react-native';

import i18n from '../../i18n';
import styles from './styles';
import { useTheme } from '../../theme';
import { AUDIO_PLAYBACK_SPEED, AVAILABLE_SPEEDS } from './constants';
import { useUserPreferences } from '../../lib/methods/userPreferences';
import NativeButton from '../NativeButton';

const PLAYBACK_SPEED_HIT_SLOP = { top: 10, right: 10, bottom: 10, left: 10 };

const PlaybackSpeed = () => {
	const [playbackSpeed, setPlaybackSpeed] = useUserPreferences<number>(AUDIO_PLAYBACK_SPEED, AVAILABLE_SPEEDS[1]);
	const { colors } = useTheme();

	const onPress = () => {
		const speedIndex = AVAILABLE_SPEEDS.indexOf(playbackSpeed as number);
		const nextSpeedIndex = speedIndex + 1 >= AVAILABLE_SPEEDS.length ? 0 : speedIndex + 1;
		setPlaybackSpeed(AVAILABLE_SPEEDS[nextSpeedIndex]);
	};

	return (
		<NativeButton
			testID='playback-speed'
			accessible
			accessibilityLabel={i18n.t('Playback_speed', { playbackSpeed: `${playbackSpeed} x` })}
			onPress={onPress}
			hitSlop={PLAYBACK_SPEED_HIT_SLOP}
			style={[styles.containerPlaybackSpeed, { backgroundColor: colors.surfaceNeutral }]}>
			<Text style={[styles.playbackSpeedText, { color: colors.fontInfo }]}>{playbackSpeed}x</Text>
		</NativeButton>
	);
};

export default PlaybackSpeed;
