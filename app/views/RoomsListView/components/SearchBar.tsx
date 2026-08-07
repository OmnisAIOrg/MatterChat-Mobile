import { useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { CustomIcon } from '../../../containers/CustomIcon';
import Glass from '../../../containers/Glass';
import I18n from '../../../i18n';
import { onSky } from '../../../lib/constants/paperSky';

/**
 * The search bar, live.
 *
 * It replaces the hero in place rather than swapping in a navigation header — the screen keeps its
 * own chrome from top to bottom, so nothing about the layout jumps when you start typing. Same
 * glass pane as the resting search target, now with a real field in it and a Cancel beside it.
 */
const styles = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 12
	},
	field: {
		flex: 1,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		gap: 8
	},
	input: {
		flex: 1,
		fontSize: 15,
		color: onSky.primary,
		padding: 0
	},
	cancel: {
		fontSize: 15,
		fontWeight: '600',
		color: onSky.primary
	}
});

const SearchBar = ({ onChangeText, onCancel }: { onChangeText: (text: string) => void; onCancel: () => void }) => {
	const input = useRef<TextInput>(null);

	return (
		<View style={styles.wrap}>
			<Glass variant='field' radius={14} style={styles.field}>
				<CustomIcon name='search' size={19} color={onSky.primary} />
				<TextInput
					ref={input}
					style={styles.input}
					placeholder={I18n.t('Search')}
					placeholderTextColor='rgba(255,255,255,0.6)'
					onChangeText={onChangeText}
					autoFocus
					autoCorrect={false}
					autoCapitalize='none'
					returnKeyType='search'
					keyboardAppearance='dark'
					clearButtonMode='while-editing'
					testID='rooms-list-view-search-input'
				/>
			</Glass>
			<TouchableOpacity onPress={onCancel} accessibilityRole='button' testID='rooms-list-view-search-cancel'>
				<Text style={styles.cancel}>{I18n.t('Cancel')}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SearchBar;
