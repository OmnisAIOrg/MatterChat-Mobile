import { StyleSheet } from 'react-native';

import sharedStyles from '../Styles';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	transparent: {
		flex: 1,
		backgroundColor: 'transparent'
	},
	// The reading surface. ScreenSheet's `attached` variant: rounded only at the top, so the
	// conversation slides up out of the sky and keeps going down past the composer — scrolling
	// never reveals an edge.
	conversationSheet: {
		flex: 1
	},
	safeAreaView: {
		flex: 1
	},
	readOnly: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		margin: 16,
		marginBottom: 32
	},
	reactionSearchContainer: {
		marginHorizontal: 12,
		marginBottom: 8
	},
	reactionPickerContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	bannerContainer: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	bannerText: {
		flex: 1
	},
	bannerModalTitle: {
		fontSize: 16,
		...sharedStyles.textMedium
	},
	modalView: {
		padding: 20,
		justifyContent: 'center'
	},
	modalScrollView: {
		maxHeight: 100,
		marginVertical: 20
	},
	modalCloseButton: {
		alignSelf: 'flex-end'
	},
	joinRoomContainer: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginVertical: 15
	},
	joinRoomButton: {
		width: 107,
		height: 44,
		marginTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4
	},
	joinRoomText: {
		fontSize: 14,
		...sharedStyles.textMedium
	},
	previewMode: {
		fontSize: 16,
		lineHeight: 24,
		...sharedStyles.textSemibold
	},
	readOnlyDescription: {
		fontSize: 16,
		lineHeight: 24,
		...sharedStyles.textRegular,
		textAlign: 'center'
	},
	searchbarContainer: {
		height: 56,
		marginBottom: 8,
		paddingHorizontal: 12
	},
	reactionPickerSearchbar: {
		paddingHorizontal: 20,
		minHeight: 48
	}
});
