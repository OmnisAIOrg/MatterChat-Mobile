import { StatusBar as StatusBarRN } from 'expo-status-bar';

import { FRAME_GREEN } from '../lib/constants/colors';

interface IStatusBar {
	barStyle?: 'light' | 'dark';
	backgroundColor?: string;
}

const StatusBar = ({ barStyle, backgroundColor }: IStatusBar) => {
	// The strip behind the status bar is part of the app's green frame in every theme, so it
	// defaults to the brand green with light content unless a screen overrides it.
	return <StatusBarRN backgroundColor={backgroundColor ?? FRAME_GREEN} animated style={barStyle ?? 'light'} />;
};

export default StatusBar;
