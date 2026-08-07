import { forwardRef, type ReactElement } from 'react';

import { MessageComposerProvider } from './context';
import { type IMessageComposerContainerProps, type IMessageComposerRef } from './interfaces';
import { MessageComposer } from './MessageComposer';
import { EmojiKeyboardProvider } from './hooks/useEmojiKeyboard';

export const MessageComposerContainer = forwardRef<
	IMessageComposerRef,
	IMessageComposerContainerProps & { ownsBottomInset?: boolean }
>(({ children, ownsBottomInset = true }, ref): ReactElement => {
	'use memo';

	return (
		<MessageComposerProvider>
			<EmojiKeyboardProvider ownsBottomInset={ownsBottomInset}>
				<MessageComposer forwardedRef={ref}>{children}</MessageComposer>
			</EmojiKeyboardProvider>
		</MessageComposerProvider>
	);
});
