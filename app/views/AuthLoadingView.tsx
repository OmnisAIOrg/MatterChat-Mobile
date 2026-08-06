import { memo, type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import EnsoLoader from '../containers/EnsoLoader';
import I18n from '../i18n';
import { useTheme } from '../theme';
import sharedStyles from './Styles';
import { useAppSelector } from '../lib/hooks/useAppSelector';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 15,
		paddingTop: 22,
		...sharedStyles.textRegular,
		...sharedStyles.textAlignCenter
	}
});

const AuthLoadingView = memo((): ReactElement => {
	const text = useAppSelector(state => state.app.text);
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.surfaceRoom }]}>
			<EnsoLoader size={64} />
			{text ? (
				<Text style={[styles.text, { color: colors.fontSecondaryInfo }]}>{`${text}\n${I18n.t('Please_wait')}`}</Text>
			) : null}
		</View>
	);
});

export default AuthLoadingView;
