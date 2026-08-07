import { memo, type ReactElement, type RefObject } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { type TMessageAction } from '../../../definitions';
import { type IComposerInput } from '../interfaces';
import { useFocused } from '../context';
import { useTheme } from '../../../theme';
import { RecordAudio } from './RecordAudio';
import { Left, Right } from './Unfocused';
import { MIN_HEIGHT } from '../constants';
import { SendThreadToChannel } from './SendThreadToChannel';
import { EmojiSearchbar } from './EmojiSearchbar';
import { Toolbar } from './Toolbar';
import { Quotes } from './Quotes';
import { ComposerInput } from './ComposerInput';
import { MESSAGE_COMPOSER_EXIT_FOCUS_NATIVE_ID } from '../../../lib/constants/accessibility';

interface MessageComposerContentProps {
	recordingAudio: boolean;
	action: TMessageAction | undefined;
	showEmojiSearchbar: boolean;
	composerInputComponentRef: RefObject<IComposerInput>;
	composerInputRef: RefObject<any>;
	children?: ReactElement | null;
	onLayout: (event: LayoutChangeEvent) => void;
}

export const MessageComposerContent = memo<MessageComposerContentProps>(
	({ recordingAudio, action, showEmojiSearchbar, composerInputComponentRef, composerInputRef, children, onLayout }) => {
		'use memo';

		const { colors } = useTheme();
		const focused = useFocused();
		const backgroundColor = action === 'edit' ? colors.statusBackgroundWarning2 : colors.surfaceLight;
		const borderColor = focused ? colors.strokeHighlight : colors.strokeLight;

		if (recordingAudio) {
			return <RecordAudio />;
		}

		return (
			<View
				nativeID={MESSAGE_COMPOSER_EXIT_FOCUS_NATIVE_ID}
				style={[styles.container, { backgroundColor, borderColor }]}
				testID='message-composer'
				onLayout={onLayout}>
				<View style={styles.input}>
					<Left />
					<ComposerInput ref={composerInputComponentRef} inputRef={composerInputRef} />
					<Right />
				</View>
				<Quotes />
				<Toolbar />
				{showEmojiSearchbar ? <EmojiSearchbar /> : null}
				<SendThreadToChannel />
				{children}
			</View>
		);
	}
);

const styles = StyleSheet.create({
	// The input tray at the foot of the conversation sheet. It keeps a hairline along its top edge
	// so it reads as the last row of the paper — connected to the messages above it — and an inner
	// margin so the field itself still floats.
	container: {
		borderWidth: 1.5,
		borderRadius: 14,
		marginHorizontal: 10,
		marginTop: 8,
		marginBottom: 10,
		paddingHorizontal: 12,
		minHeight: MIN_HEIGHT
	},
	input: {
		flexDirection: 'row'
	}
});
