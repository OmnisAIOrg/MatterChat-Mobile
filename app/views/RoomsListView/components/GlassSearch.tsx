import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomIcon } from '../../../containers/CustomIcon';
import Glass from '../../../containers/Glass';
import I18n from '../../../i18n';
import { onSky } from '../../../lib/constants/paperSky';

/**
 * The search field is chrome, so it is glass — a dark smoked pane on the sky rather than a light
 * input on paper. It sits between the hero and the sheet, which is exactly where the boundary
 * between "sky" and "paper" belongs.
 *
 * Tapping it hands off to the existing search header; this is a target, not an input.
 */
const styles = StyleSheet.create({
	wrap: {
		paddingHorizontal: 16,
		paddingTop: 14,
		paddingBottom: 12
	},
	field: {
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 14,
		gap: 8
	},
	label: {
		fontSize: 15,
		color: onSky.primary,
		opacity: 0.9
	}
});

const GlassSearch = ({ onPress }: { onPress: () => void }) => (
	<View style={styles.wrap}>
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={onPress}
			accessibilityRole='search'
			accessibilityLabel={I18n.t('Search')}
			testID='rooms-list-view-search'>
			<Glass variant='field' radius={14} style={styles.field} pointerEvents='none'>
				<CustomIcon name='search' size={19} color={onSky.primary} />
				<Text style={styles.label}>{I18n.t('Search')}</Text>
			</Glass>
		</TouchableOpacity>
	</View>
);

export default GlassSearch;
