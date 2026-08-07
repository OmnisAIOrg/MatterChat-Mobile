import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';

import ActivityIndicator from '../../containers/ActivityIndicator';
import EmptyState from '../../containers/EmptyState';
import MainTabBar, { DOCK_CLEARANCE, type TMainTab } from '../../containers/MainTabBar';
import RoomItem from '../../containers/RoomItem';
import { type IRoomItem } from '../../containers/RoomItem/interfaces';
import { ScreenSheet } from '../../containers/Paper';
import { MAX_SIDEBAR_WIDTH } from '../../lib/constants/tablet';
import { onSky } from '../../lib/constants/paperSky';
import { useAppSelector } from '../../lib/hooks/useAppSelector';
import { useMasterDetail } from '../../lib/hooks/useMasterDetail';
import { getRoomAvatar, getRoomTitle, getUidDirectMessage, isIOS, isRead } from '../../lib/methods/helpers';
import { goRoom } from '../../lib/methods/helpers/goRoom';
import { getUserSelector } from '../../selectors/login';
import { useSubscriptions } from '../RoomsListView/hooks/useSubscriptions';

/**
 * Shared list body for the Chats and Activity tabs.
 *
 * Same live `subscriptions`, same `RoomItem` rows as Home — only the client-side filter differs,
 * and the Paper & Sky shell is identical: a big white title written straight onto the sky, then
 * one paper sheet holding every row, floating clear of the dock.
 */
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	screenTitle: {
		fontSize: 30,
		fontWeight: '800',
		letterSpacing: -0.6,
		color: onSky.primary,
		textShadowColor: onSky.shadow,
		textShadowRadius: 10,
		textShadowOffset: { width: 0, height: 1 },
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 14
	}
});

const FilteredRoomsList = ({
	tab,
	title,
	filter,
	emptyTitle,
	emptyHint,
	testID
}: {
	tab: TMainTab;
	title: string;
	filter: (s: any) => boolean;
	emptyTitle: string;
	emptyHint: string;
	testID: string;
}) => {
	const navigation = useNavigation<any>();
	const { width } = useSafeAreaFrame();
	const { bottom } = useSafeAreaInsets();
	const isMasterDetail = useMasterDetail();
	const username = useAppSelector(state => getUserSelector(state).username);
	const useRealName = useAppSelector(state => state.settings.UI_Use_Real_Name) as boolean;
	const showLastMessage = useAppSelector(state => state.settings.Store_Last_Message) as boolean;
	const { displayMode, showAvatar } = useAppSelector(state => state.sortPreferences, shallowEqual);
	const subscribedRoom = useAppSelector(state => state.room.subscribedRoom);
	const { subscriptions, loading } = useSubscriptions();

	const rooms = useMemo(() => subscriptions.filter((s: any) => !!s?.rid && filter(s)), [subscriptions, filter]);

	const onPressItem = (item = {} as IRoomItem) => {
		if (!navigation.isFocused()) {
			return;
		}
		goRoom({ item, isMasterDetail });
	};

	const renderItem = ({ item }: { item: IRoomItem }) => {
		const id = getUidDirectMessage(item);
		return (
			<RoomItem
				item={item}
				id={id}
				username={username}
				showLastMessage={showLastMessage}
				onPress={onPressItem}
				width={isMasterDetail ? MAX_SIDEBAR_WIDTH : width}
				useRealName={useRealName}
				getRoomTitle={getRoomTitle}
				getRoomAvatar={getRoomAvatar}
				getIsRead={isRead}
				isFocused={subscribedRoom === item.rid}
				swipeEnabled={false}
				showAvatar={showAvatar}
				displayMode={displayMode}
			/>
		);
	};

	return (
		<View testID={testID} style={styles.container}>
			<Text style={styles.screenTitle}>{title}</Text>
			<ScreenSheet bottomInset={bottom} dockClearance={DOCK_CLEARANCE}>
				{loading ? <ActivityIndicator /> : null}
				{!loading && rooms.length === 0 ? <EmptyState title={emptyTitle} hint={emptyHint} /> : null}
				{!loading && rooms.length > 0 ? (
					<FlatList
						data={rooms}
						keyExtractor={(item: any) => item.rid}
						renderItem={renderItem}
						removeClippedSubviews={isIOS}
						keyboardShouldPersistTaps='always'
						contentContainerStyle={{ paddingBottom: 12 }}
						windowSize={9}
					/>
				) : null}
			</ScreenSheet>
			<MainTabBar active={tab} />
		</View>
	);
};

export default FilteredRoomsList;
