import { type HeaderBackButtonProps, HeaderBackButton as RNHeaderBackButton } from '@react-navigation/elements';
import { Platform, StyleSheet } from 'react-native';

import { onSky } from '../../../lib/constants/paperSky';
import I18n from '../../../i18n';

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				minWidth: 34,
				marginLeft: -6
			},
			android: {
				marginHorizontal: 0,
				marginLeft: -3
			}
		})
	}
});

export const HeaderBackButton = ({ ...props }: HeaderBackButtonProps) => {
	'use memo';

	return (
		<RNHeaderBackButton
			accessibilityLabel={I18n.t('Back')}
			tintColor={onSky.primary}
			style={styles.container}
			testID='header-back'
			{...props}
		/>
	);
};
