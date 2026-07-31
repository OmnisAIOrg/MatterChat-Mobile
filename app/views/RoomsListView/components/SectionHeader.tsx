import { memo } from 'react';
import { Text, View } from 'react-native';

import i18n from '../../../i18n';
import { isPaperSky } from '../../../lib/constants/paperSky';
import { useTheme } from '../../../theme';
import styles from '../styles';

const SectionHeader = ({ header }: { header: string }) => {
	'use memo';

	const { colors, theme } = useTheme();
	return (
		<View style={[styles.groupTitleContainer, { backgroundColor: isPaperSky(theme) ? 'transparent' : colors.surfaceRoom }]}>
			<Text style={[styles.groupTitle, { color: isPaperSky(theme) ? colors.fontPureWhite : colors.fontHint }]}>
				{i18n.t(header)}
			</Text>
		</View>
	);
};

export default memo(SectionHeader);
