import { memo } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import ChiOrb from '../../../containers/ChiOrb';
import { CustomIcon } from '../../../containers/CustomIcon';
import { PaperLabel, PaperRow, usePaper } from '../../../containers/Paper';

/**
 * The Home dashboard — the top of the sheet, above the rooms.
 *
 * V2 opens the document with what needs you rather than with the newest room: a MENTIONS | THREADS
 * split, then a row into Chi. Both halves of the split are real subscription data (`userMentions`
 * and `tunread`), and the hint under each is the room those numbers came from, so the panel is a
 * shortcut and not just a scoreboard — tapping a half opens that room.
 *
 * The split hides itself when both counts are zero. The hero has already said "All clear" by then,
 * and a panel reading 0 | 0 underneath it is furniture.
 */
export interface IDashboardSide {
	count: number;
	hint: string;
	onPress?: () => void;
}

interface IHomeDashboardProps {
	mentions: IDashboardSide;
	threads: IDashboardSide;
	onChi: () => void;
}

const styles = StyleSheet.create({
	split: {
		flexDirection: 'row'
	},
	half: {
		flex: 1,
		paddingVertical: 11,
		paddingHorizontal: 16
	},
	halfHead: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6
	},
	// 300-weight and large: the same hairline treatment as the hero numeral, one step down. It is
	// the accent's one appearance on this sheet, which is what makes it findable.
	number: {
		fontSize: 26,
		lineHeight: 32,
		fontWeight: '300',
		marginTop: 2
	},
	hint: {
		fontSize: 12,
		fontWeight: '500'
	},
	chiRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12
	},
	chiBody: {
		flex: 1
	},
	chiText: {
		fontSize: 13,
		fontWeight: '500',
		marginTop: 2
	}
});

const Half = ({ side, icon, label, divider }: { side: IDashboardSide; icon: string; label: string; divider: boolean }) => {
	const p = usePaper();
	return (
		<TouchableHighlight
			style={styles.half}
			underlayColor={p.tint}
			activeOpacity={1}
			disabled={!side.onPress || side.count === 0}
			accessibilityRole='button'
			accessibilityLabel={`${label}: ${side.count}`}
			testID={`home-dashboard-${label.toLowerCase()}`}
			onPress={side.onPress}>
			<View style={divider ? { borderRightWidth: 1, borderRightColor: p.hairline, marginRight: -16, paddingRight: 16 } : null}>
				<View style={styles.halfHead}>
					<CustomIcon name={icon as any} size={14} color={p.inkFaint} />
					<PaperLabel>{label}</PaperLabel>
				</View>
				<Text style={[styles.number, { color: side.count > 0 ? p.accent : p.inkFaint }]}>{side.count}</Text>
				<Text style={[styles.hint, { color: p.inkSoft }]} numberOfLines={1}>
					{side.hint}
				</Text>
			</View>
		</TouchableHighlight>
	);
};

const HomeDashboard = ({ mentions, threads, onChi }: IHomeDashboardProps) => {
	const p = usePaper();
	const showSplit = mentions.count > 0 || threads.count > 0;

	return (
		<>
			{showSplit ? (
				<View style={[styles.split, { borderBottomWidth: 1, borderBottomColor: p.hairline }]}>
					<Half side={mentions} icon='mention' label='MENTIONS' divider />
					<Half side={threads} icon='threads' label='THREADS' divider={false} />
				</View>
			) : null}
			<TouchableHighlight
				underlayColor={p.hairlineGreen}
				activeOpacity={1}
				accessibilityRole='button'
				accessibilityLabel='Ask Chi'
				testID='home-dashboard-chi'
				onPress={onChi}>
				<PaperRow tone='green'>
					<View style={styles.chiRow}>
						<ChiOrb size={36} />
						<View style={styles.chiBody}>
							<PaperLabel color={p.accent}>CHI</PaperLabel>
							<Text style={[styles.chiText, { color: p.inkQuiet }]}>Ask about your rooms, or catch up out loud.</Text>
						</View>
						<CustomIcon name='chevron-right' size={19} color={p.chevron} />
					</View>
				</PaperRow>
			</TouchableHighlight>
		</>
	);
};

export default memo(HomeDashboard);
