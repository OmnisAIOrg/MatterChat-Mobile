import { Pressable, StyleSheet, Text, View } from 'react-native';

import { type MessageTypesValues, SubscriptionType } from '../../../definitions';
import { useTheme } from '../../../theme';
import sharedStyles from '../../../views/Styles';
import RightIcons from './RightIcons';
import { messageHaveAuthorName } from '../utils';
import MessageTime from './Time';
import { useResponsiveLayout } from '../../../lib/hooks/useResponsiveLayout/useResponsiveLayout';
import { useSetting } from '../../../lib/hooks/useSetting';
import { usePaper } from '../../Paper';
import { useIsOwnMessage, useMessageAuthor, useMessageGrouping, useMessageHeaderMeta, useMessageTone } from '../stores/MessageStore';
import { useNavToRoomInfo } from '../stores/MessageRoomStore';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	username: {
		flexShrink: 1,
		fontSize: 15,
		lineHeight: 20,
		...sharedStyles.textBold,
		fontWeight: '800'
	},
	usernameInfoMessage: {
		fontSize: 16,
		...sharedStyles.textMedium
	},
	titleContainer: {
		flexShrink: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4
	},
	alias: {
		fontSize: 14,
		...sharedStyles.textRegular
	},
	// Who is speaking, said once and quietly: a 10pt chip beside the name rather than a differently
	// shaped bubble. The paper tone under the row already carries the message.
	badge: {
		paddingHorizontal: 7,
		paddingVertical: 2,
		borderRadius: 6,
		overflow: 'hidden',
		fontSize: 10,
		lineHeight: 14,
		letterSpacing: 0.6,
		...sharedStyles.textBold,
		fontWeight: '800'
	}
});

const User = () => {
	'use memo';

	const useRealName = useSetting('UI_Use_Real_Name') as boolean;
	const navToRoomInfo = useNavToRoomInfo();
	const { colors } = useTheme();
	const { isLargeFontScale } = useResponsiveLayout();
	const isHeader = useMessageGrouping();
	const { u: author, alias } = useMessageAuthor();
	const { t: type } = useMessageHeaderMeta();
	const itsMe = useIsOwnMessage();
	const tone = useMessageTone();
	const p = usePaper();

	if (isHeader) {
		const username = (useRealName && author?.name) || author?.username;
		const aliasUsername = alias ? <Text style={[styles.alias, { color: colors.fontSecondaryInfo }]}> @{username}</Text> : null;

		const onUserPress = () => {
			navToRoomInfo?.({
				t: SubscriptionType.DIRECT,
				rid: author?._id || '',
				itsMe
			});
		};

		const textContent = (
			<>
				{alias || username}
				{aliasUsername}
			</>
		);

		if (messageHaveAuthorName(type as MessageTypesValues)) {
			return (
				<Text style={[styles.usernameInfoMessage, { color: colors.fontTitlesLabels }]} onPress={onUserPress}>
					{textContent}
				</Text>
			);
		}

		return (
			<View style={styles.container}>
				<Pressable testID={`username-header-${username}`} style={styles.titleContainer} onPress={onUserPress}>
					<Text
						style={[styles.username, { color: tone === 'assistant' ? p.accent : colors.fontTitlesLabels }]}
						numberOfLines={1}>
						{textContent}
					</Text>
					{tone === 'assistant' ? (
						<Text style={[styles.badge, { backgroundColor: p.accentSoft, color: p.accent }]}>ASSISTANT</Text>
					) : null}
					{tone === 'own' ? (
						<Text style={[styles.badge, { backgroundColor: p.ownBadge, color: p.inkSoft }]}>YOU</Text>
					) : null}
					{isLargeFontScale ? null : <MessageTime />}
				</Pressable>
				<RightIcons />
			</View>
		);
	}
	return null;
};

export default User;
