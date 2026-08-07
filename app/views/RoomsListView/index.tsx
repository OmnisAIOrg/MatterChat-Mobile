import { useNavigation } from '@react-navigation/native';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BackHandler, FlatList, RefreshControl } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';

import ActivityIndicator from '../../containers/ActivityIndicator';
import EmptyState from '../../containers/EmptyState';
import BackgroundContainer from '../../containers/BackgroundContainer';
import { ChangePasswordRequired } from '../../containers/ChangePasswordRequired';
import RoomItem from '../../containers/RoomItem';
import { type IRoomItem } from '../../containers/RoomItem/interfaces';
import { SupportedVersionsExpired } from '../../containers/SupportedVersions';
import i18n from '../../i18n';
import { MAX_SIDEBAR_WIDTH } from '../../lib/constants/tablet';
import { useAppSelector } from '../../lib/hooks/useAppSelector';
import { useMasterDetail } from '../../lib/hooks/useMasterDetail';
import { usePermissions } from '../../lib/hooks/usePermissions';
import { getRoomAvatar, getRoomTitle, getUidDirectMessage, isIOS, isRead, isTablet } from '../../lib/methods/helpers';
import { goRoom } from '../../lib/methods/helpers/goRoom';
import { events, logEvent } from '../../lib/methods/helpers/log';
import { getUserSelector } from '../../selectors/login';
import { useTheme } from '../../theme';
import MainTabBar, { DOCK_CLEARANCE } from '../../containers/MainTabBar';
import { ScreenSheet } from '../../containers/Paper';
import Container from './components/Container';
import GlassSearch from './components/GlassSearch';
import HomeFilters, { type THomeFilter } from './components/HomeFilters';
import SearchBar from './components/SearchBar';
import SkyHero from './components/SkyHero';
import HomeDashboard from './components/HomeDashboard';
import ListHeader from './components/ListHeader';
import SectionHeader from './components/SectionHeader';
import RoomsSearchProvider, { RoomsSearchContext } from './contexts/RoomsSearchProvider';
import { useGetItemLayout } from './hooks/useGetItemLayout';
import { useRefresh } from './hooks/useRefresh';
import { useSubscriptions } from './hooks/useSubscriptions';
import styles from './styles';

const INITIAL_NUM_TO_RENDER = isTablet ? 20 : 12;

const RoomsListView = memo(function RoomsListView() {
	'use memo';

	const { searching, searchEnabled, searchResults, search, startSearch, stopSearch } = useContext(RoomsSearchContext);
	const { colors } = useTheme();
	const username = useAppSelector(state => getUserSelector(state).username);
	const requirePasswordChange = useAppSelector(state => getUserSelector(state).requirePasswordChange);
	const useRealName = useAppSelector(state => state.settings.UI_Use_Real_Name) as boolean;
	const showLastMessage = useAppSelector(state => state.settings.Store_Last_Message) as boolean;
	const { displayMode, showAvatar } = useAppSelector(state => state.sortPreferences, shallowEqual);
	const isMasterDetail = useMasterDetail();
	const navigation = useNavigation<any>();
	const { width } = useSafeAreaFrame();
	const { bottom } = useSafeAreaInsets();
	const getItemLayout = useGetItemLayout();
	const { subscriptions, loading } = useSubscriptions();
	// Reskin: Home filter chips — pure client-side filters over the subscribed rooms.
	// Grouped lists mix section-header strings into `subscriptions`; when a filter is
	// active we drop non-room entries so the filtered list renders flat.
	const [homeFilter, setHomeFilter] = useState<THomeFilter>('all');
	const filteredSubscriptions = useMemo(() => {
		if (homeFilter === 'all') {
			return subscriptions;
		}
		return subscriptions.filter((s: any) => {
			if (!s?.rid) {
				return false;
			}
			switch (homeFilter) {
				case 'unreads':
					return (s.alert || s.unread) && !s.hideUnreadStatus;
				case 'channels':
					return s.t === 'c' || s.t === 'p';
				case 'matters':
					return !!s.teamMain;
				default:
					return true;
			}
		});
	}, [subscriptions, homeFilter]);
	const subscribedRoom = useAppSelector(state => state.room.subscribedRoom);
	const changingServer = useAppSelector(state => state.server.changingServer);
	const { refreshing, onRefresh } = useRefresh({ searching });
	const supportedVersionsStatus = useAppSelector(state => state.supportedVersions.status);

	// What the hero, the sky and the dashboard are made of. Every number comes straight off the
	// subscriptions we already hold; nothing here costs a request.
	//
	// `subscriptions` arrives already sorted the way the user asked for (activity or alphabetical),
	// so the first match in each category is also the one worth linking to — which is why the
	// dashboard can hand you a room rather than just a count.
	const { unread, mentions, directs, threads, mentionRoom, threadRoom } = useMemo(() => {
		let u = 0;
		let m = 0;
		let d = 0;
		let t = 0;
		let mRoom: any = null;
		let tRoom: any = null;
		subscriptions.forEach((s: any) => {
			if (!s?.rid || s.hideUnreadStatus) {
				return;
			}
			const count = s.unread > 0 ? s.unread : 0;
			u += count;
			if (s.userMentions > 0) {
				m += s.userMentions;
				mRoom = mRoom ?? s;
			}
			const tu = s.tunread?.length ?? 0;
			if (tu > 0) {
				t += tu;
				tRoom = tRoom ?? s;
			}
			if (s.t === 'd' && count > 0) {
				d += 1;
			}
		});
		return { unread: u, mentions: m, directs: d, threads: t, mentionRoom: mRoom, threadRoom: tRoom };
	}, [subscriptions]);

	const [createPublic, createPrivate, createTeam, createDirect, createDiscussion] = usePermissions([
		'create-c',
		'create-p',
		'create-team',
		'create-d',
		'start-discussion'
	]);
	const canCreateRoom = [createPublic, createPrivate, createTeam, createDirect, createDiscussion].some(r => r === true);

	// The dashboard's halves are shortcuts, not just counters: each opens the room its number came
	// from. `goRoom` is the same entry the list rows use, so a mention opened from here behaves
	// exactly like a mention opened by scrolling to it.
	const goToDashboardRoom = useCallback(
		(item: any) => {
			if (!item || !navigation.isFocused()) {
				return;
			}
			logEvent(events.RL_GO_ROOM);
			goRoom({ item, isMasterDetail });
		},
		[isMasterDetail, navigation]
	);

	const goToChi = useCallback(() => {
		navigation.navigate('ChiOrbView');
	}, [navigation]);

	const goToNewMessage = useCallback(() => {
		logEvent(events.RL_GO_NEW_MSG);
		if (isMasterDetail) {
			navigation.navigate('ModalStackNavigator', { screen: 'NewMessageView' });
		} else {
			navigation.navigate('NewMessageStackNavigator');
		}
	}, [isMasterDetail, navigation]);

	useEffect(() => {
		const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
			if (searchEnabled) {
				stopSearch();
				navigation.goBack();
				return true;
			}
			return false;
		});
		return () => subscription.remove();
	}, [searchEnabled]);

	const onPressItem = (item = {} as IRoomItem) => {
		if (!navigation.isFocused()) {
			return;
		}
		if (item.rid === subscribedRoom) {
			return;
		}

		logEvent(events.RL_GO_ROOM);
		stopSearch();
		goRoom({ item, isMasterDetail });
	};

	const renderItem = ({ item }: { item: IRoomItem }) => {
		if (item.separator) {
			return <SectionHeader header={item.rid} />;
		}

		const id = item.search && item.t === 'd' ? item._id : getUidDirectMessage(item);
		// TODO: move to RoomItem
		const swipeEnabled = !(item?.search || item?.joinCodeRequired || item?.outside);

		return (
			<RoomItem
				item={item}
				id={id}
				username={username}
				showLastMessage={showLastMessage}
				onPress={onPressItem}
				// TODO: move to RoomItem
				width={isMasterDetail ? MAX_SIDEBAR_WIDTH : width}
				useRealName={useRealName}
				getRoomTitle={getRoomTitle}
				getRoomAvatar={getRoomAvatar}
				getIsRead={isRead}
				isFocused={subscribedRoom === item.rid}
				swipeEnabled={swipeEnabled}
				showAvatar={showAvatar}
				displayMode={displayMode}
			/>
		);
	};

	if (searchEnabled && searchResults.length === 0) {
		if (searching) {
			return <ActivityIndicator />;
		}
		return <BackgroundContainer text={i18n.t('No_rooms_found')} />;
	}

	if (loading || changingServer) {
		return <ActivityIndicator />;
	}

	if (supportedVersionsStatus === 'expired') {
		return <SupportedVersionsExpired />;
	}

	if (requirePasswordChange) {
		return <ChangePasswordRequired navigation={navigation} />;
	}

	return (
		<>
			{searchEnabled ? (
				<SearchBar onChangeText={search} onCancel={stopSearch} />
			) : (
				<>
					<SkyHero unread={unread} mentions={mentions} directs={directs} canCreate={canCreateRoom} onCreate={goToNewMessage} />
					<GlassSearch onPress={startSearch} />
					<HomeFilters active={homeFilter} onChange={setHomeFilter} />
				</>
			)}
			{/* The one sheet: the whole list is a single document, not a stack of cards. Geometry
			    comes from ScreenSheet so Home, Chats, Activity and You are identical surfaces. */}
			<ScreenSheet bottomInset={bottom} dockClearance={DOCK_CLEARANCE}>
				<FlatList
					data={searchEnabled ? searchResults : filteredSubscriptions}
					extraData={searchEnabled ? searchResults : filteredSubscriptions}
					keyExtractor={item => `${item.rid}-${searchEnabled}`}
					style={styles.list}
					contentContainerStyle={{ paddingBottom: 12 }}
					renderItem={renderItem}
					ListHeaderComponent={
						searchEnabled ? (
							ListHeader
						) : (
							<>
								<HomeDashboard
									mentions={{
										count: mentions,
										hint: mentionRoom ? getRoomTitle(mentionRoom) : 'Nothing waiting',
										onPress: () => goToDashboardRoom(mentionRoom)
									}}
									threads={{
										count: threads,
										hint: threadRoom ? getRoomTitle(threadRoom) : 'No unread threads',
										onPress: () => goToDashboardRoom(threadRoom)
									}}
									onChi={goToChi}
								/>
								<ListHeader />
							</>
						)
					}
					ListEmptyComponent={
						<EmptyState
							title={homeFilter === 'all' ? 'No conversations yet' : 'Nothing matches that filter'}
							hint={
								homeFilter === 'all'
									? 'Start one from the pencil at the top right, or ask Chi to find the room you need.'
									: 'Try another filter — All shows every room you are in.'
							}
						/>
					}
					ListFooterComponent={searching ? () => <ActivityIndicator /> : undefined}
					getItemLayout={getItemLayout}
					removeClippedSubviews={isIOS}
					keyboardShouldPersistTaps='always'
					initialNumToRender={INITIAL_NUM_TO_RENDER}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.fontSecondaryInfo} />}
					windowSize={9}
					onEndReachedThreshold={0.5}
					keyboardDismissMode={isIOS ? 'on-drag' : 'none'}
				/>
			</ScreenSheet>
		</>
	);
});

const RoomsListViewWithProvider = () => (
	<RoomsSearchProvider>
		<Container>
			<RoomsListView />
			{/* reskin: the floating Chi orb relocated into the tab bar's raised center button */}
			<MainTabBar active='home' />
		</Container>
	</RoomsSearchProvider>
);

export default memo(RoomsListViewWithProvider);
