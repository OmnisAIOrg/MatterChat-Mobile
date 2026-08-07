import { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { themes } from '../../lib/constants/colors';
import { useTheme } from '../../theme';
import { RULE } from '../../lib/constants/paperSky';

const styles = StyleSheet.create({
	separator: {
		height: RULE
	}
});

interface IListSeparator {
	style?: ViewStyle;
}

const ListSeparator = memo(({ style }: IListSeparator) => {
	'use memo';

	const { theme } = useTheme();

	return <View style={[styles.separator, style, { backgroundColor: themes[theme].strokeExtraLight }]} />;
});

ListSeparator.displayName = 'List.Separator';

export default ListSeparator;
