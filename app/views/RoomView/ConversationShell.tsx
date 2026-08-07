import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainTabBar, { DOCK_CLEARANCE } from '../../containers/MainTabBar';
import { ScreenSheet } from '../../containers/Paper';
import { useKeyboardOpen } from '../../lib/hooks/useKeyboardOpen';

/**
 * The conversation shell.
 *
 * A room is not a different kind of screen — it is the same sheet as every other screen, holding
 * the messages *and* the composer as one connected object: the message box is the bottom of the
 * paper, not a separate bar floating under it. And the dock stays where it always is, so you can
 * leave a conversation the same way you got into it.
 *
 * When the keyboard comes up the dock steps aside and the sheet takes back the clearance it was
 * keeping for it, so the composer ends up directly above the keys instead of a dock's height
 * above them.
 */
const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	sheet: {
		flex: 1
	}
});

export const ConversationShell = ({ children }: { children: ReactNode }) => {
	const { bottom } = useSafeAreaInsets();
	const keyboardOpen = useKeyboardOpen();

	return (
		<View style={styles.root}>
			<ScreenSheet
				style={styles.sheet}
				bottomInset={keyboardOpen ? 0 : bottom}
				dockClearance={keyboardOpen ? 20 : DOCK_CLEARANCE}>
				{children}
			</ScreenSheet>
			{keyboardOpen ? null : <MainTabBar />}
		</View>
	);
};

export default ConversationShell;
