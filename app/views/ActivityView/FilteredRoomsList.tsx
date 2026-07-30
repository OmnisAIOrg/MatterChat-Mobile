import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';

import ActivityIndicator from '../../containers/ActivityIndicator';
import MainTabBar, { type TMainTab } from '../../containers/MainTabBar';
import RoomItem from '../../containers/RoomItem';
import { type IRoomItem } from '../../containers/RoomItem/interfaces';
import SafeAreaView from '../../containers/SafeAreaView';
import { MAX_SIDEBAR_WIDTH } from '../../lib/constants/tablet';
import { useAppSelector } from '../../lib/hooks/useAppSelector';
import { useMasterDetail } from '../../lib/hooks/useMasterDetail';
import { getRoomAvatar, getRoomTitle, getUidDirectMessage, isIOS, isRead } from '../../lib/methods/helpers';
import { goRoom } from '../../lib/methods/helpers/goRoom';
import { getUserSelector } from '../../selectors/login';
import { useTheme } from '../../theme';
import { useSubscriptions } from '../RoomsListView/hooks/useSubscriptions';

/**
 * Reskin (Tier 2, owned): shared list body for the DMs and Activity tabs.
 * Renders the SAME live `subscriptions` data the Home list uses, through the same
 * RoomItem rows — only the client-side filter differs. No new data sources.
 */
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	screenTitle: {
		fontSize: 26,
		fontWeight: '800',
		letterSpacing: -0.4,
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 12
	},
	empty: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40
	},
	emptyTitle: {
		fontSize: 16,
		fontWeight: '800',
		marginBottom: 6,
		textAlign: 'center'
	},
	emptyHint: {
		fontSize: 14,
		textAlign: 'center'
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
	const { colors } = useTheme();
	const navigation = useNavigation<any>();
	const { width } = useSafeAreaFrame();
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
		<SafeAreaView testID={testID} style={{ backgroundColor: colors.surfaceRoom }}>
			<View style={styles.container}>
				<Text style={[styles.screenTitle, { color: colors.fontTitlesLabels }]}>{title}</Text>
				{loading ? <ActivityIndicator /> : null}
				{!loading && rooms.length === 0 ? (
					<View style={styles.empty}>
						<Text style={[styles.emptyTitle, { color: colors.fontTitlesLabels }]}>{emptyTitle}</Text>
						<Text style={[styles.emptyHint, { color: colors.fontSecondaryInfo }]}>{emptyHint}</Text>
					</View>
				) : null}
				{!loading && rooms.length > 0 ? (
					<FlatList
						data={rooms}
						keyExtractor={(item: any) => item.rid}
						renderItem={renderItem}
						removeClippedSubviews={isIOS}
						keyboardShouldPersistTaps='always'
						windowSize={9}
					/>
				) : null}
			</View>
			<MainTabBar active={tab} />
		</SafeAreaView>
	);
};

export default FilteredRoomsList;
