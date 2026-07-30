import { StyleSheet } from 'react-native';

import sharedStyles from '../../views/Styles';

export default StyleSheet.create({
	container: {
		overflow: 'hidden'
	},
	item: {
		paddingHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row'
	},
	separator: {
		marginHorizontal: 16
	},
	titleContainer: {
		flex: 1
	},
	title: {
		fontSize: 15,
		lineHeight: 22,
		...sharedStyles.textSemibold
	},
	subtitle: {
		fontSize: 14,
		lineHeight: 20,
		...sharedStyles.textRegular
	},
	handle: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 8
	},
	handleIndicator: {
		width: 36,
		height: 4.5,
		borderRadius: 2.5,
		margin: 8
	},
	backdrop: {
		...StyleSheet.absoluteFillObject
	},
	button: {
		marginHorizontal: 16,
		paddingHorizontal: 14,
		justifyContent: 'center',
		borderRadius: 14,
		marginBottom: 12
	},
	text: {
		fontSize: 16,
		...sharedStyles.textBold,
		...sharedStyles.textAlignCenter
	},
	rightContainer: {
		paddingLeft: 12
	},
	footerButtonsContainer: {
		flexDirection: 'row',
		paddingTop: 16
	},
	buttonSeparator: {
		marginRight: 8
	},
	contentContainer: {
		flex: 0
	},
	fullContainer: {
		width: '100%',
		height: '100%',
		flex: 0
	}
});
