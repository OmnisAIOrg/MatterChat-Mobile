import { type ReactElement } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import { CustomIcon, type TIconsName } from '../CustomIcon';
import { ICON_SIZE } from './constants';
import { useTheme } from '../../theme';

export interface IListIcon {
	name: TIconsName;
	color?: string;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	size?: number;
}

// Indicator glyphs (chevrons, checks, radios) render plain — the green tile treatment is for row leading icons only
const INDICATOR_ICONS: TIconsName[] = [
	'chevron-right',
	'chevron-left',
	'chevron-up',
	'chevron-down',
	'check',
	'checkbox-checked',
	'checkbox-unchecked',
	'radio-checked',
	'radio-unchecked'
];

const TILE_ICON_SIZE = 20;

const styles = StyleSheet.create({
	icon: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	tile: {
		width: 32,
		height: 32,
		borderRadius: 10
	}
});

const ListIcon = ({ name, color, style, testID, size }: IListIcon): ReactElement => {
	'use memo';

	const { colors } = useTheme();

	if (!color && !INDICATOR_ICONS.includes(name)) {
		return (
			<View style={[styles.icon, styles.tile, { backgroundColor: colors.statusBackgroundInfo }, style]}>
				<CustomIcon name={name} color={colors.fontInfo} size={size ?? TILE_ICON_SIZE} testID={testID} />
			</View>
		);
	}
	return (
		<View style={[styles.icon, style]}>
			<CustomIcon name={name} color={color || colors.fontSecondaryInfo} size={size ?? ICON_SIZE} testID={testID} />
		</View>
	);
};

ListIcon.displayName = 'List.Icon';

export default ListIcon;
