import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Glass from '../../../containers/Glass';
import I18n from '../../../i18n';
import { onSky, paper } from '../../../lib/constants/paperSky';

/**
 * The Home filter chips (All / Unreads / Channels / Matters) — pure client-side filters over the
 * already-subscribed rooms, no new data.
 *
 * They sit on the sky, so they follow the chip rule: the selected chip becomes **paper** (it has
 * been pulled forward into the content layer), the rest stay glass. That inversion is what makes
 * the selection obvious without a single extra colour.
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
		paddingTop: 0,
		paddingBottom: 12,
		gap: 8
	},
	chip: {
		height: 34,
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	chipPaper: {
		backgroundColor: paper.sheet
	},
	label: {
		fontSize: 13,
		fontWeight: '700'
	}
});

const HomeFilters = ({ active, onChange }: { active: THomeFilter; onChange: (f: THomeFilter) => void }) => (
	<ScrollView
		horizontal
		showsHorizontalScrollIndicator={false}
		style={styles.row}
		contentContainerStyle={styles.content}
		keyboardShouldPersistTaps='always'>
		{FILTERS.map(f => {
			const isActive = f.key === active;
			const label = <Text style={[styles.label, { color: isActive ? paper.accent : onSky.primary }]}>{f.label}</Text>;
			return (
				<TouchableOpacity
					key={f.key}
					onPress={() => onChange(f.key)}
					activeOpacity={0.75}
					accessibilityRole='button'
					accessibilityState={{ selected: isActive }}
					accessibilityLabel={f.label}>
					{isActive ? (
						<View style={[styles.chip, styles.chipPaper, { borderRadius: 17 }]}>{label}</View>
					) : (
						<Glass variant='clear' radius={17} style={styles.chip} pointerEvents='none'>
							{label}
						</Glass>
					)}
				</TouchableOpacity>
			);
		})}
	</ScrollView>
);

export default HomeFilters;
