import { StyleSheet } from 'react-native';

import sharedStyles from '../../views/Styles';
import { THUMB_SEEK_SIZE } from './constants';

const styles = StyleSheet.create({
	audioContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: 56,
		borderWidth: 1,
		borderRadius: 14
	},
	playPauseButton: {
		alignItems: 'center',
		marginLeft: 12,
		height: 40,
		width: 40,
		borderRadius: 20,
		justifyContent: 'center'
	},
	seekContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		height: '100%'
	},
	seek: {
		marginRight: 12,
		height: '100%',
		justifyContent: 'center',
		flex: 1
	},
	line: {
		height: 4,
		borderRadius: 2,
		width: '100%'
	},
	duration: {
		marginHorizontal: 12,
		fontVariant: ['tabular-nums'],
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	thumbSeek: {
		height: THUMB_SEEK_SIZE,
		width: THUMB_SEEK_SIZE,
		borderRadius: THUMB_SEEK_SIZE / 2,
		position: 'absolute'
	},
	containerPlaybackSpeed: {
		width: 38,
		height: 24,
		borderRadius: 12,
		marginRight: 16,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	playbackSpeedText: {
		fontSize: 13,
		...sharedStyles.textBold
	}
});

export default styles;
