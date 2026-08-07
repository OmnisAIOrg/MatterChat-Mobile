import { memo, type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { isAndroid } from '../../../../lib/methods/helpers';
import { onSky } from '../../../../lib/constants/paperSky';
import { styles } from './styles';

interface IHeaderTitle {
	headerTitle?: string | ((props: { children: string; tintColor?: string }) => ReactNode);
}

const HeaderTitle = memo(({ headerTitle }: IHeaderTitle) => {
	'use memo';

	if (!headerTitle) {
		return null;
	}

	if (typeof headerTitle === 'string') {
		if (isAndroid) {
			return (
				<Text
					numberOfLines={1}
					style={{
						...styles.androidTitle,
						color: onSky.primary
					}}>
					{headerTitle}
				</Text>
			);
		}
		return (
			<View style={styles.headerTitleContainer}>
				<Text
					numberOfLines={1}
					style={{
						...styles.title,
						color: onSky.primary
					}}>
					{headerTitle}
				</Text>
			</View>
		);
	}

	return headerTitle({ children: '', tintColor: onSky.primary });
});

export default HeaderTitle;
