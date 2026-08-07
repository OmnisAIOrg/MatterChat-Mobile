import { StyleSheet, Text, View } from 'react-native';

import Avatar from '../../../containers/Avatar';
import { onSky, paper } from '../../../lib/constants/paperSky';
import { useAppSelector } from '../../../lib/hooks/useAppSelector';
import { getUserSelector } from '../../../selectors/login';

/**
 * The You hero — your profile written straight onto the sky.
 *
 * Same grammar as Home's hero: no chrome, no card, just an 80pt squircle with a presence ring and
 * three lines of white text above the sheet. The presence dot is ringed in the sky's own green so
 * it reads as a light on the avatar rather than a badge stuck to it.
 */
const AVATAR = 80;

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		paddingTop: 14,
		paddingBottom: 16
	},
	avatarWrap: {
		borderRadius: 25,
		borderWidth: 2,
		borderColor: 'rgba(255,255,255,0.5)',
		overflow: 'hidden'
	},
	dot: {
		position: 'absolute',
		bottom: -3,
		right: -3,
		width: 18,
		height: 18,
		borderRadius: 9,
		borderWidth: 3,
		borderColor: '#4AA36A',
		backgroundColor: onSky.spring
	},
	name: {
		fontSize: 23,
		fontWeight: '800',
		color: onSky.primary,
		marginTop: 10,
		textShadowColor: onSky.shadow,
		textShadowRadius: 10,
		textShadowOffset: { width: 0, height: 1 }
	},
	meta: {
		fontSize: 13,
		color: onSky.primary,
		opacity: 0.85,
		marginTop: 2
	}
});

const STATUS_LABEL: Record<string, string> = {
	online: 'Online',
	away: 'Away',
	busy: 'Busy',
	offline: 'Invisible'
};

const YouHero = () => {
	const user = useAppSelector(state => getUserSelector(state));
	const serverName = useAppSelector(state => (state.settings.Site_Name as string) || 'MatterChat');

	const status = STATUS_LABEL[user?.status ?? 'online'] ?? 'Online';

	return (
		<View style={styles.root}>
			<View>
				<View style={styles.avatarWrap}>
					<Avatar text={user?.username} size={AVATAR} borderRadius={25} />
				</View>
				<View style={[styles.dot, user?.status === 'busy' ? { backgroundColor: paper.danger } : null]} pointerEvents='none' />
			</View>
			<Text style={styles.name} numberOfLines={1}>
				{user?.name || user?.username}
			</Text>
			<Text style={styles.meta} numberOfLines={1}>
				{`@${user?.username}  ·  ${serverName}  ·  ${status}`}
			</Text>
		</View>
	);
};

export default YouHero;
