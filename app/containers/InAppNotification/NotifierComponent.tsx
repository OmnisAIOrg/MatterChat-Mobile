import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '../Avatar';
import { CustomIcon } from '../CustomIcon';
import sharedStyles from '../../views/Styles';
import { themes } from '../../lib/constants/colors';
import { useTheme } from '../../theme';
import { goRoom } from '../../lib/methods/helpers/goRoom';
import { type ISubscription, type SubscriptionType } from '../../definitions';
import { hideNotification } from '../../lib/methods/helpers/notifications';
import { useResponsiveLayout } from '../../lib/hooks/useResponsiveLayout/useResponsiveLayout';
import { withMasterDetail } from '../../lib/hooks/useMasterDetail';
import Touch from '../Touch';

export interface INotifierComponent {
	notification: {
		text: string;
		payload: {
			sender: { username: string };
			type: SubscriptionType;
			message?: { message?: string; msg?: string; t?: string };
		} & Pick<ISubscription, '_id' | 'name' | 'rid' | 'prid'>;
		title: string;
		avatar: string;
	};
	isMasterDetail: boolean;
}

const AVATAR_SIZE = 42;
const BUTTON_HIT_SLOP = { top: 12, right: 12, bottom: 12, left: 12 };

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 14,
		paddingRight: 30,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		borderWidth: 1,
		borderRadius: 16,
		shadowColor: '#0A140C',
		shadowOffset: { width: 0, height: 12 },
		shadowOpacity: 0.16,
		shadowRadius: 16,
		elevation: 12
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	inner: {
		flex: 1,
		marginRight: 10
	},
	avatar: {
		marginRight: 12
	},
	roomName: {
		fontSize: 16,
		lineHeight: 20,
		...sharedStyles.textBold
	},
	message: {
		fontSize: 15,
		lineHeight: 19,
		...sharedStyles.textRegular
	},
	closeButton: {
		width: 32,
		height: 32,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	small: {
		width: '50%',
		alignSelf: 'center'
	}
});

const NotifierComponent = memo(({ notification, isMasterDetail }: INotifierComponent) => {
	const { theme } = useTheme();
	const { rowHeight } = useResponsiveLayout();
	const insets = useSafeAreaInsets();
	const { text, payload } = notification;
	const { type, rid } = payload;
	const name = type === 'd' ? payload.sender.username : payload.name;
	// if sub is not on local database, title and avatar will be null, so we use payload from notification
	const { title = name, avatar = name } = notification;

	const onPress = () => {
		const { prid, _id } = payload;
		if (!rid) {
			return;
		}
		const item = {
			rid,
			name: title,
			t: type,
			prid
		};

		goRoom({ item, isMasterDetail, jumpToMessageId: _id });
		hideNotification();
	};

	return (
		<View
			testID={`in-app-notification-${text}`}
			style={[
				styles.container,
				isMasterDetail && styles.small,
				{
					backgroundColor: themes[theme].surfaceLight,
					borderColor: themes[theme].strokeLight,
					marginTop: insets.top,
					height: rowHeight
				}
			]}>
			<Touch
				style={styles.content}
				rectButtonStyle={styles.content}
				onPress={onPress}
				hitSlop={BUTTON_HIT_SLOP}
				testID={`in-app-notification-${text}`}>
				<Avatar text={avatar} size={AVATAR_SIZE} type={type} rid={rid} style={styles.avatar} />
				<View style={styles.inner}>
					<Text style={[styles.roomName, { color: themes[theme].fontTitlesLabels }]} numberOfLines={1}>
						{title}
					</Text>
					<Text style={[styles.message, { color: themes[theme].fontDefault }]} numberOfLines={1}>
						{text}
					</Text>
				</View>
			</Touch>
			<Touch
				onPress={hideNotification}
				hitSlop={BUTTON_HIT_SLOP}
				style={[
					styles.closeButton,
					{ backgroundColor: theme === 'light' || theme === 'paper' ? '#EAF6EC' : themes[theme].surfaceSelected }
				]}>
				<CustomIcon name='close' size={20} color={themes[theme].fontInfo} />
			</Touch>
		</View>
	);
});

export default withMasterDetail(NotifierComponent);
