import { type FC } from 'react';
import { Platform, type StyleProp, StyleSheet, Text, type TextStyle, type ViewStyle } from 'react-native';
import { RectButton, type RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from '../../theme';
import sharedStyles from '../../views/Styles';
import ActivityIndicator from '../ActivityIndicator';

interface IButtonProps extends Omit<RectButtonProps, 'children' | 'enabled'> {
	title: string;
	onPress: () => void;
	type?: 'primary' | 'secondary';
	backgroundColor?: string;
	loading?: boolean;
	color?: string;
	fontSize?: number;
	style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
	styleText?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
	small?: boolean;
	disabled?: boolean;
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 12,
		borderRadius: 14
	},
	normalButton: {
		height: 48,
		paddingHorizontal: 16,
		justifyContent: 'center'
	},
	smallButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		alignSelf: 'center'
	},
	primaryShadow: {
		...Platform.select({
			ios: {
				shadowOpacity: 0.28,
				shadowRadius: 8,
				shadowOffset: { width: 0, height: 4 }
			},
			android: {
				elevation: 4
			}
		})
	},
	text: {
		...sharedStyles.textBold,
		...sharedStyles.textAlignCenter
	},
	smallText: {
		...sharedStyles.textBold,
		fontSize: 12,
		lineHeight: 18
	},
	disabled: {
		opacity: 0.3
	}
});

const Button: FC<IButtonProps> = ({
	type = 'primary',
	disabled,
	loading,
	fontSize = 16,
	title,
	onPress,
	backgroundColor,
	color,
	style,
	styleText,
	small,
	...otherProps
}) => {
	const { colors } = useTheme();
	const isPrimary = type === 'primary';
	const isDisabled = disabled || loading;

	const defaultBackgroundColor = isPrimary ? colors.buttonBackgroundPrimaryDefault : colors.surfaceLight;
	const disabledBackgroundColor = colors.surfaceNeutral;

	const resolvedBackgroundColor = backgroundColor || defaultBackgroundColor;
	const resolvedTextColor = color || (isPrimary ? colors.fontWhite : colors.fontDefault);

	const containerStyle = [
		small ? styles.smallButton : styles.normalButton,
		styles.container,
		{ backgroundColor: isDisabled ? disabledBackgroundColor : resolvedBackgroundColor },
		!isPrimary && !isDisabled ? { borderWidth: 1.5, borderColor: colors.strokeLight } : {},
		isPrimary && !isDisabled && !backgroundColor
			? [styles.primaryShadow, { shadowColor: colors.buttonBackgroundPrimaryDefault }]
			: {},
		isDisabled && backgroundColor ? styles.disabled : {},
		style
	];

	const textStyle = [
		{ color: isDisabled ? colors.buttonPrimaryDisabled : resolvedTextColor, fontSize },
		small ? styles.smallText : styles.text,
		styleText
	];

	return (
		<RectButton
			onPress={onPress}
			enabled={!isDisabled}
			style={containerStyle}
			accessibilityLabel={title}
			accessibilityRole='button'
			{...otherProps}>
			{loading ? <ActivityIndicator color={resolvedTextColor} style={{ padding: 0 }} /> : <Text style={textStyle}>{title}</Text>}
		</RectButton>
	);
};

export default Button;
