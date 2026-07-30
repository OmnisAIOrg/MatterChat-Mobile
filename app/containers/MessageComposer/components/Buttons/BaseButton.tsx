import { BorderlessButton } from 'react-native-gesture-handler';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import I18n from '../../../../i18n';
import { CustomIcon, type TIconsName } from '../../../CustomIcon';
import { useMessageComposerApi } from '../../context';
import { useTheme } from '../../../../theme';

export interface IBaseButton {
	testID: string;
	accessibilityLabel: string;
	icon: TIconsName;
	color?: string;
	backgroundColor?: string;
	onPress(): void;
}

export const hitSlop = {
	top: 10,
	right: 10,
	bottom: 10,
	left: 10
};

export const BaseButton = ({ accessibilityLabel, icon, color, backgroundColor, testID, onPress }: IBaseButton) => {
	'use memo';

	const { colors } = useTheme();
	const { setFocused } = useMessageComposerApi();
	const { fontScale } = useWindowDimensions();
	const size = (backgroundColor ? 34 : 24) * fontScale;

	return (
		<BorderlessButton
			style={[styles.button, { width: size, height: size }, backgroundColor ? [styles.filled, { backgroundColor }] : null]}
			onPress={() => onPress()}
			hitSlop={hitSlop}>
			<View
				accessible
				accessibilityLabel={I18n.t(accessibilityLabel)}
				accessibilityRole='button'
				collapsable={false}
				testID={testID}
				onFocus={() => setFocused(true)}>
				<CustomIcon name={icon} size={24} color={color || colors.fontSecondaryInfo} />
			</View>
		</BorderlessButton>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	filled: {
		borderRadius: 9
	}
});
