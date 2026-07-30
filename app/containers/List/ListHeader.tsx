import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import sharedStyles from '../../views/Styles';
import { themes } from '../../lib/constants/colors';
import I18n from '../../i18n';
import { useTheme } from '../../theme';
import { PADDING_HORIZONTAL } from './constants';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		paddingHorizontal: PADDING_HORIZONTAL
	},
	title: {
		fontSize: 11,
		letterSpacing: 1.1,
		textTransform: 'uppercase',
		...sharedStyles.textBold,
		fontWeight: '800'
	}
});

interface IListHeader {
	title: string;
	translateTitle?: boolean;
	numberOfLines?: number;
}

const ListHeader = memo(({ title, translateTitle = true, numberOfLines }: IListHeader) => {
	'use memo';

	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<Text
				accessibilityRole='header'
				style={[styles.title, { color: themes[theme].fontSecondaryInfo }]}
				numberOfLines={numberOfLines}>
				{translateTitle ? I18n.t(title) : title}
			</Text>
		</View>
	);
});

ListHeader.displayName = 'List.Header';

export default ListHeader;
