import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import I18n from '../../../i18n';
import { useTheme } from '../../../theme';

/**
 * Reskin: the Home filter chips (All / Unreads / Channels / Matters).
 * Pure client-side filters over the already-subscribed rooms list — no new data.
 * Active chip = inverted (ink background, surface text); inactive = neutral pill.
 */
export type THomeFilter = 'all' | 'unreads' | 'channels' | 'matters';

const FILTERS: { key: THomeFilter; label: string }[] = [
	{ key: 'all', label: 'All' },
	{ key: 'unreads', label: I18n.t('Unread') },
	{ key: 'channels', label: I18n.t('Channels') },
	{ key: 'matters', label: 'Matters' }
];

const styles = StyleSheet.create({
	row: {
		flexGrow: 0
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 4,
		paddingBottom: 10,
		gap: 8
	},
	chip: {
		height: 34,
		borderRadius: 17,
		paddingHorizontal: 14,
		alignItems: 'center',
		justifyContent: 'center'
	},
	label: {
		fontSize: 13,
		fontWeight: '700'
	}
});

const HomeFilters = ({ active, onChange }: { active: THomeFilter; onChange: (f: THomeFilter) => void }) => {
	const { colors } = useTheme();

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.row}
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps='always'>
			{FILTERS.map(f => {
				const isActive = f.key === active;
				return (
					<TouchableOpacity
						key={f.key}
						style={[styles.chip, { backgroundColor: isActive ? colors.fontTitlesLabels : colors.surfaceNeutral }]}
						onPress={() => onChange(f.key)}
						accessibilityRole='button'
						accessibilityState={{ selected: isActive }}
						accessibilityLabel={f.label}>
						<Text style={[styles.label, { color: isActive ? colors.surfaceLight : colors.fontDefault }]}>{f.label}</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default HomeFilters;
