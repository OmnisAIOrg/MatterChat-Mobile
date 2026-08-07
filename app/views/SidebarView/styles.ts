import { StyleSheet } from 'react-native';

import sharedStyles from '../Styles';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		paddingVertical: 16,
		paddingHorizontal: 4,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1
	},
	headerTextContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	headerUsername: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	username: {
		fontSize: 16,
		...sharedStyles.textBold
	},
	avatar: {
		marginHorizontal: 12
	},
	currentServerText: {
		fontSize: 13,
		...sharedStyles.textRegular
	},
	customStatusDisabled: {
		width: 10,
		height: 10,
		borderRadius: 5
	}
});
