import { A11y } from 'react-native-a11y-order';

import { useTheme } from '../../../../theme';
import Touch from './Touch';
import Message, { type TMessageProps } from '../Message/Message';
import { useLastFocusedMessageRef } from '../../../../lib/a11y/useLastFocusedMessageRef';
import { useMessageAccessibilityLabel } from '../../hooks/useMessageAccessibilityLabel';
import { useMessageAccessibilityActions } from '../../hooks/useMessageAccessibilityActions';
import { useMessageAccessibilityHint } from '../../hooks/useMessageAccessibilityHint';
import { useIsBeingEdited } from '../../stores/MessageActionStore';
import {
	useIsInfoMessage,
	useMessageField,
	useMessageLongPress,
	useMessagePress,
	useMessageStatus,
	useMessageTone,
	useMessageTouchable
} from '../../stores/MessageStore';
import { usePaper } from '../../../Paper';

const MessageTouchable = (props: TMessageProps) => {
	'use memo';

	const { colors } = useTheme();
	const { ref: touchRef, markAsLastFocused } = useLastFocusedMessageRef();
	const isInfo = useIsInfoMessage();
	const { hasError } = useMessageStatus();
	const { tappable } = useMessageTouchable();
	const id = useMessageField(item => item.id);
	const isBeingEdited = useIsBeingEdited(id);
	const onPressAction = useMessagePress();
	const onLongPress = useMessageLongPress();
	const accessibilityLabelValue = useMessageAccessibilityLabel();
	const accessibilityActions = useMessageAccessibilityActions(!tappable);
	const accessibilityHint = useMessageAccessibilityHint();

	// Paper & Sky: a conversation is one sheet, and the only thing that changes between rows is the
	// tone of the paper — your own words sit on a slightly warmer cream, Chi's on the green that
	// means "from the assistant", everyone else's on the sheet itself.
	const tone = useMessageTone();
	const p = usePaper();
	let backgroundColor: string | undefined;
	if (tone === 'own') {
		backgroundColor = p.own;
	}
	if (tone === 'assistant') {
		backgroundColor = p.green;
	}
	if (isBeingEdited) {
		backgroundColor = colors.statusBackgroundWarning2;
	}
	if (props.highlighted) {
		backgroundColor = colors.surfaceNeutral;
	}

	if (hasError || isInfo) {
		return (
			<A11y.Order>
				<Message isPreview={props.isPreview} />
			</A11y.Order>
		);
	}

	const handleLongPress = () => {
		markAsLastFocused();
		onLongPress();
	};

	return (
		<A11y.Order>
			<A11y.Index index={1}>
				<Touch
					componentRef={touchRef}
					onLongPress={handleLongPress}
					onPress={onPressAction}
					disabled={!tappable}
					style={{ backgroundColor }}
					testID={isBeingEdited ? `message-editing-${id}` : undefined}
					accessible
					accessibilityRole='button'
					accessibilityLabel={accessibilityLabelValue}
					accessibilityHint={accessibilityHint}
					accessibilityActions={accessibilityActions}
					onAccessibilityAction={e => {
						if (e.nativeEvent.actionName === 'showActions') handleLongPress();
					}}>
					<Message isPreview={props.isPreview} />
				</Touch>
			</A11y.Index>
		</A11y.Order>
	);
};

export default MessageTouchable;
