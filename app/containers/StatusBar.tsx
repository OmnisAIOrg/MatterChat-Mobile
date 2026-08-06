import { StatusBar as StatusBarRN } from 'expo-status-bar';

import { useTheme } from '../theme';

interface IStatusBar {
	barStyle?: 'light' | 'dark';
	backgroundColor?: string;
}

const StatusBar = ({ barStyle, backgroundColor }: IStatusBar) => {
	const { colors } = useTheme();
	// The frame behind the status bar is brand green in every theme, so its content is
	// always light unless a screen explicitly asks otherwise.
	return <StatusBarRN backgroundColor={backgroundColor ?? colors.surfaceNeutral} animated style={barStyle ?? 'light'} />;
};

export default StatusBar;
