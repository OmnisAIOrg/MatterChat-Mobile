import { PixelRatio, StyleSheet } from 'react-native';

import { useTheme } from '../../../theme';
import sharedStyles from '../../../views/Styles';

export const useStyle = () => {
	const { colors } = useTheme();
	return StyleSheet.create({
		container: {
			height: 160 * PixelRatio.getFontScale(),
			paddingHorizontal: 24,
			paddingVertical: 18,
			marginHorizontal: 10,
			borderWidth: 1,
			borderRadius: 16,
			backgroundColor: colors.surfaceLight,
			borderColor: colors.strokeLight,
			shadowColor: '#0A140C',
			shadowOffset: { width: 0, height: 12 },
			shadowOpacity: 0.16,
			shadowRadius: 16,
			elevation: 12,
			flex: 1
		},
		small: {
			width: '50%',
			alignSelf: 'center'
		},
		row: {
			flexDirection: 'row',
			marginTop: 12
		},
		closeButton: {
			backgroundColor: colors.buttonBackgroundSecondaryDefault,
			marginRight: 8,
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 10,
			width: 36,
			height: 36
		},
		cancelButton: {
			borderRadius: 10,
			backgroundColor: colors.buttonBackgroundDangerDefault,
			marginRight: 8,
			flex: 2,
			alignItems: 'center',
			justifyContent: 'center'
		},
		buttonText: {
			...sharedStyles.textMedium,
			color: 'white'
		},
		acceptButton: {
			borderRadius: 10,
			backgroundColor: colors.buttonBackgroundSuccessDefault,
			flex: 2,
			alignItems: 'center',
			justifyContent: 'center'
		}
	});
};
