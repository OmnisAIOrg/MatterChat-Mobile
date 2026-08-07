import { StatusBar as StatusBarRN } from 'expo-status-bar';

interface IStatusBar {
	barStyle?: 'light' | 'dark';
	backgroundColor?: string;
}

const StatusBar = ({ barStyle, backgroundColor }: IStatusBar) => {
	// The status bar sits directly on the living sky, which is dark enough at every state to carry
	// light content. It is transparent on both platforms — nothing paints a strip behind it.
	return <StatusBarRN backgroundColor={backgroundColor ?? 'transparent'} translucent animated style={barStyle ?? 'light'} />;
};

export default StatusBar;
