import { type ReactElement } from 'react';

import { useTheme } from '../../../../theme';
import { BaseButton, type IBaseButton } from '../Buttons';

export const CancelButton = ({
	onPress,
	cancelAndDelete
}: {
	onPress: IBaseButton['onPress'];
	cancelAndDelete?: boolean;
}): ReactElement => {
	const { colors } = useTheme();
	return (
		<BaseButton
			onPress={onPress}
			testID='message-composer-delete-audio'
			accessibilityLabel={cancelAndDelete ? 'Cancel_and_delete_recording' : 'Delete_recording'}
			icon='delete'
			color={colors.strokeError}
		/>
	);
};
