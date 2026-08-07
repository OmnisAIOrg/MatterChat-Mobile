import { useNavigation } from '@react-navigation/native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomIcon } from '../../../containers/CustomIcon';
import GlassButton from '../../../containers/GlassButton';
import { useSkyOverride } from '../../../containers/Sky';
import { onSky } from '../../../lib/constants/paperSky';
import { useAppSelector } from '../../../lib/hooks/useAppSelector';
import { useMasterDetail } from '../../../lib/hooks/useMasterDetail';
import { getUserSelector } from '../../../selectors/login';

/**
 * The sky hero.
 *
 * The screen opens on weather, not on a list: the wordmark, then how much is waiting for you in a
 * 76pt hairline numeral, then one line of detail. Nothing here is chrome — it is written straight
 * onto the sky in white with a soft cast, which is why the numeral can be that large without
 * shouting. When you are caught up the numeral is replaced by a word, and the sky itself clears.
 *
 * V2 puts the wordmark on the LEFT of its own row with the controls opposite, rather than centred
 * above the count. The masthead then reads as a masthead — you know which app you are in before
 * your eye reaches the number — and the count owns the centre line by itself.
 *
 * The count is the real unread total; the sky state is derived from it. That is the whole point of
 * the living sky — it is data, not decoration.
 */
interface ISkyHeroProps {
	unread: number;
	mentions: number;
	directs: number;
	onCreate?: () => void;
	canCreate?: boolean;
}

/** Deterministic per-workspace tile colours, so the same person always gets the same square. */
const WORKSPACE_COLOURS = ['#6B4F9E', '#B0611E', '#1B4F8A', '#0F5F63', '#7A4A16', '#B3402E'];

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: 16,
		// The app's status-bar spacer above us has already taken the notch inset.
		paddingTop: 6
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 42
	},
	rightKeys: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	// The workspace key: your own initials on the org's colour, which is the one tile in the app
	// that is deliberately NOT themed — it belongs to the workspace, not to MatterChat. It is built
	// like every other key here (lit rim, crown, cast shadow) so it reads as the same hardware even
	// though the colour is foreign.
	workspace: {
		width: 42,
		height: 42,
		borderRadius: 13,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1.5,
		borderColor: 'rgba(255,255,255,0.5)',
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowColor: onSky.shadow,
				shadowOffset: { width: 0, height: 3 },
				shadowRadius: 7,
				shadowOpacity: 0.42
			},
			android: { elevation: 5 }
		})
	},
	// The lit crown — the top third catching the sky, which is what turns a coloured square into a
	// pressed key.
	workspaceCrown: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 15,
		backgroundColor: 'rgba(255,255,255,0.22)'
	},
	workspaceInitials: {
		fontSize: 14,
		fontWeight: '800',
		color: onSky.primary,
		textShadowColor: 'rgba(0,0,0,0.30)',
		textShadowRadius: 3,
		textShadowOffset: { width: 0, height: 1 }
	},
	body: {
		alignItems: 'center',
		paddingTop: 14,
		gap: 2
	},
	// The real wordmark, at its native 1286:210 ratio. Set once here so every place that shows it
	// — hero, onboarding, empty states — shows the same artwork rather than typeset lookalikes.
	wordmark: {
		width: 176,
		height: Math.round((176 * 210) / 1286)
	},
	// 250-weight at 76pt: the numeral has to be hairline or it stops being a mark and becomes a
	// badge. RN maps '200' to the lightest system face available.
	count: {
		fontSize: 76,
		lineHeight: 82,
		fontWeight: '200',
		letterSpacing: -1.5,
		color: onSky.primary,
		textShadowColor: onSky.shadow,
		textShadowRadius: 16,
		textShadowOffset: { width: 0, height: 1 }
	},
	clear: {
		fontSize: 40,
		lineHeight: 60,
		fontWeight: '200',
		letterSpacing: -0.6,
		color: onSky.primary,
		textShadowColor: onSky.shadow,
		textShadowRadius: 16,
		textShadowOffset: { width: 0, height: 1 }
	},
	caption: {
		fontSize: 16,
		fontWeight: '600',
		color: onSky.primary,
		opacity: 0.95
	},
	detail: {
		fontSize: 13,
		fontWeight: '600',
		color: onSky.primary,
		opacity: 0.85,
		marginTop: 2
	}
});

const SkyHero = ({ unread, mentions, directs, onCreate, canCreate }: ISkyHeroProps) => {
	const navigation = useNavigation<any>();
	const isMasterDetail = useMasterDetail();
	const user = useAppSelector(state => getUserSelector(state));

	// Caught up is a different kind of day, and the sky says so before the copy does.
	useSkyOverride(unread === 0 ? 'clear' : 'day');

	// Your initials, on a colour derived from the workspace rather than from the theme — the one
	// tile in the app that is deliberately not ours.
	const name = user?.name || user?.username || '';
	const initials =
		name
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((w: string) => w[0])
			.join('')
			.toUpperCase() || '?';
	const workspaceColor = WORKSPACE_COLOURS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % WORKSPACE_COLOURS.length];

	// V2 folds the detail into one line beside the caption: "New messages · M: 3 D: 2". The count is
	// the headline; everything under it is a footnote and should read like one.
	const detail = unread === 0 ? 'Nothing waiting' : `New messages  ·  M: ${mentions}  D: ${directs}`;

	return (
		<View style={styles.root}>
			<View style={styles.actions}>
				<Image
					source={require('../../../static/images/matterchat_wordmark_light.png')}
					style={styles.wordmark}
					resizeMode='contain'
					accessibilityLabel='MatterChat'
				/>
				<View style={styles.rightKeys}>
					{canCreate ? (
						<GlassButton accessibilityLabel='Create new' testID='rooms-list-view-create-channel' onPress={onCreate}>
							<CustomIcon name='create' size={21} color={onSky.primary} />
						</GlassButton>
					) : null}
					<TouchableOpacity
						activeOpacity={0.8}
						accessibilityRole='button'
						accessibilityLabel='Workspace'
						testID='rooms-list-view-sidebar'
						onPress={() =>
							isMasterDetail ? navigation.navigate('ModalStackNavigator', { screen: 'SettingsView' }) : navigation.toggleDrawer()
						}>
						<View style={[styles.workspace, { backgroundColor: workspaceColor }]}>
							<View style={styles.workspaceCrown} pointerEvents='none' />
							<Text style={styles.workspaceInitials}>{initials}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.body}>
				{unread === 0 ? (
					<Text style={styles.clear}>All clear</Text>
				) : (
					<Text style={styles.count}>{unread > 999 ? '999+' : unread}</Text>
				)}
				{unread === 0 ? <Text style={styles.caption}>You are caught up</Text> : null}
				<Text style={styles.detail}>{detail}</Text>
			</View>
		</View>
	);
};

export default SkyHero;
