import { useState } from 'react';
import { StyleSheet, type TextInputProps, View } from 'react-native';

import { useTheme } from '../../theme';
import I18n from '../../i18n';
import { FormTextInput } from '../TextInput';

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 12,
		marginTop: 16,
		// override the default margin bottom of the FormTextInput
		marginBottom: 16
	},
	input: {
		minHeight: 42,
		height: 42,
		borderRadius: 14,
		borderWidth: 0,
		paddingVertical: 0,
		fontSize: 15
	}
});

const SearchBox = ({ onChangeText, onSubmitEditing, testID }: TextInputProps) => {
	const [text, setText] = useState('');

	const { colors } = useTheme();

	const internalOnChangeText = (value: string) => {
		setText(value);
		onChangeText?.(value);
	};

	return (
		<View testID='searchbox' style={{ backgroundColor: colors.surfaceRoom }}>
			<FormTextInput
				autoCapitalize='none'
				autoCorrect={false}
				blurOnSubmit
				placeholder={I18n.t('Search')}
				returnKeyType='search'
				underlineColorAndroid='transparent'
				containerStyle={styles.inputContainer}
				inputStyle={[styles.input, { backgroundColor: colors.surfaceNeutral }]}
				onChangeText={internalOnChangeText}
				onSubmitEditing={onSubmitEditing}
				value={text}
				testID={testID}
				onClearInput={() => internalOnChangeText('')}
				iconLeft={'search'}
			/>
		</View>
	);
};

export default SearchBox;
