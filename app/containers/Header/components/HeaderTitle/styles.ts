import { StyleSheet } from 'react-native';

import sharedStyles from '../../../../views/Styles';

export const styles = StyleSheet.create({
	headerTitleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		...sharedStyles.textBold,
		fontWeight: '800',
		fontSize: 17,
		flex: 1,
		lineHeight: 24,
		paddingVertical: 6
	},
	androidTitle: {
		...sharedStyles.textBold,
		fontWeight: '800',
		fontSize: 17,
		flex: 1,
		lineHeight: 24,
		paddingVertical: 10
	}
});
