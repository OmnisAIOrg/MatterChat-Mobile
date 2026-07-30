import { Pressable, StyleSheet, View, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { CustomIcon } from '../CustomIcon';
import sharedStyles from '../../views/Styles';
import Avatar from '../Avatar';

const styles = StyleSheet.create({
	pressable: {
		paddingHorizontal: 8,
		marginHorizontal: 4,
		minHeight: 44,
		borderRadius: 999,
		justifyContent: 'center',
		maxWidth: 192
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: 8,
		marginVertical: 8
	},
	textContainer: {
		flexShrink: 1,
		marginRight: 8,
		maxWidth: 110
	},
	name: {
		fontSize: 16,
		...sharedStyles.textMedium
	}
});

export interface IChip {
	avatar?: string;
	text: string;
	onPress?: Function;
	testID?: string;
	style?: StyleProp<ViewStyle>;
	fullWidth?: boolean;
}

const Chip = ({ avatar, text, onPress, testID, style, fullWidth }: IChip) => {
	const { colors } = useTheme();

	return (
		<Pressable
			testID={testID}
			style={({ pressed }) => [
				styles.pressable,
				{
					backgroundColor: pressed ? colors.fontTitlesLabels : colors.surfaceNeutral,
					maxWidth: fullWidth ? undefined : styles.pressable.maxWidth
				},
				style
			]}
			disabled={!onPress}
			onPress={() => onPress?.()}
			android_ripple={{
				color: colors.fontTitlesLabels
			}}>
			{({ pressed }) => (
				<View style={styles.container}>
					{avatar ? <Avatar text={avatar} size={28} style={styles.avatar} /> : null}
					<View style={[styles.textContainer, fullWidth && { maxWidth: undefined }]}>
						<Text style={[styles.name, { color: pressed ? colors.surfaceLight : colors.fontDefault }]} numberOfLines={1}>
							{text}
						</Text>
					</View>
					{onPress ? <CustomIcon name='close' size={16} color={pressed ? colors.surfaceLight : colors.fontDefault} /> : null}
				</View>
			)}
		</Pressable>
	);
};

export default Chip;
