import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomIcon } from '../../../containers/CustomIcon';
import Glass from '../../../containers/Glass';
import { useSkyOverride } from '../../../containers/Sky';
import { onSky } from '../../../lib/constants/paperSky';
import { useMasterDetail } from '../../../lib/hooks/useMasterDetail';

/**
 * The sky hero.
 *
 * The screen opens on weather, not on a list: the wordmark, then how much is waiting for you in a
 * 76pt hairline numeral, then one line of detail. Nothing here is chrome — it is written straight
 * onto the sky in white with a soft cast, which is why the numeral can be that large without
 * shouting. When you are caught up the numeral is replaced by a word, and the sky itself clears.
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
		height: 40
	},
	circle: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	body: {
		alignItems: 'center',
		paddingTop: 16,
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

	// Caught up is a different kind of day, and the sky says so before the copy does.
	useSkyOverride(unread === 0 ? 'clear' : 'day');

	const detail =
		unread === 0
			? 'Nothing waiting'
			: [mentions > 0 ? `${mentions} mention${mentions === 1 ? '' : 's'}` : null, directs > 0 ? `${directs} direct` : null]
					.filter(Boolean)
					.join('  ·  ') || 'across your rooms';

	return (
		<View style={styles.root}>
			<View style={styles.actions}>
				<TouchableOpacity
					activeOpacity={0.7}
					accessibilityRole='button'
					accessibilityLabel='Workspace'
					testID='rooms-list-view-sidebar'
					onPress={() =>
						isMasterDetail ? navigation.navigate('ModalStackNavigator', { screen: 'SettingsView' }) : navigation.toggleDrawer()
					}>
					<Glass variant='clear' radius={20} style={styles.circle}>
						<CustomIcon name='hamburguer' size={22} color={onSky.primary} />
					</Glass>
				</TouchableOpacity>
				{canCreate ? (
					<TouchableOpacity
						activeOpacity={0.7}
						accessibilityRole='button'
						accessibilityLabel='Create new'
						testID='rooms-list-view-create-channel'
						onPress={onCreate}>
						<Glass variant='clear' radius={20} style={styles.circle}>
							<CustomIcon name='create' size={22} color={onSky.primary} />
						</Glass>
					</TouchableOpacity>
				) : (
					<View style={styles.circle} />
				)}
			</View>

			<View style={styles.body}>
				<Image
					source={require('../../../static/images/matterchat_wordmark_light.png')}
					style={styles.wordmark}
					resizeMode='contain'
					accessibilityLabel='MatterChat'
				/>
				{unread === 0 ? (
					<Text style={styles.clear}>All clear</Text>
				) : (
					<Text style={styles.count}>{unread > 999 ? '999+' : unread}</Text>
				)}
				<Text style={styles.caption}>{unread === 0 ? 'You are caught up' : 'New messages'}</Text>
				<Text style={styles.detail}>{detail}</Text>
			</View>
		</View>
	);
};

export default SkyHero;
