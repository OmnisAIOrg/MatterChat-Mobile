import { memo, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { batch, useDispatch } from 'react-redux';
import { type Subscription } from 'rxjs';

import { appStart } from '../../../actions/app';
import { selectServerRequest, serverInitAdd } from '../../../actions/server';
import { hideActionSheetRef } from '../../../containers/ActionSheet';
import Avatar from '../../../containers/Avatar';
import Button from '../../../containers/Button';
import { CustomIcon } from '../../../containers/CustomIcon';
import * as List from '../../../containers/List';
import ServerItem from '../../../containers/ServerItem';
import Status from '../../../containers/Status/Status';
import Navigation from '../../../lib/navigation/appNavigation';
import { getUserSelector } from '../../../selectors/login';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootEnum, type TServerModel } from '../../../definitions';
import I18n from '../../../i18n';
import { TOKEN_KEY } from '../../../lib/constants/keys';
import database from '../../../lib/database';
import { useAppSelector } from '../../../lib/hooks/useAppSelector';
import { useMasterDetail } from '../../../lib/hooks/useMasterDetail';
import { removeServer } from '../../../lib/methods/logout';
import EventEmitter from '../../../lib/methods/helpers/events';
import { goRoom } from '../../../lib/methods/helpers/goRoom';
import { showConfirmationAlert } from '../../../lib/methods/helpers/info';
import { localAuthenticate } from '../../../lib/methods/helpers/localAuthentication';
import { events, logEvent } from '../../../lib/methods/helpers/log';
import UserPreferences from '../../../lib/methods/userPreferences';
import { useTheme } from '../../../theme';
import styles from '../styles';

const ROW_HEIGHT = 68;
const MAX_ROWS = 4.5;

const ServersList = () => {
	'use memo';

	const subscription = useRef<Subscription | null>(null);
	const [servers, setServers] = useState<TServerModel[]>([]);
	const dispatch = useDispatch();
	const server = useAppSelector(state => state.server.server);
	const isMasterDetail = useMasterDetail();
	const { colors } = useTheme();
	// reskin: the sheet doubles as the workspace/account sheet — profile card + shortcuts
	const user = useAppSelector(state => getUserSelector(state));

	useLayoutEffect(() => {
		const init = () => {
			const serversDB = database.servers;
			const observable = serversDB.get('servers').query().observeWithColumns(['name']);

			subscription.current = observable.subscribe(data => {
				setServers(data);
			});
		};
		init();

		return () => {
			if (subscription.current && subscription.current.unsubscribe) {
				subscription.current.unsubscribe();
			}
		};
	}, []);

	const close = () => {
		hideActionSheetRef();
	};

	const navToNewServer = (previousServer: string) => {
		batch(() => {
			dispatch(appStart({ root: RootEnum.ROOT_OUTSIDE }));
			dispatch(serverInitAdd(previousServer));
		});
	};

	const addServer = () => {
		logEvent(events.RL_ADD_SERVER);
		close();
		setTimeout(() => {
			navToNewServer(server);
		}, 300);
	};

	const select = async (serverParam: string, version: string) => {
		close();
		if (server !== serverParam) {
			logEvent(events.RL_CHANGE_SERVER);
			const userId = UserPreferences.getString(`${TOKEN_KEY}-${serverParam}`);
			if (isMasterDetail) {
				goRoom({ item: {}, isMasterDetail });
			}
			if (!userId) {
				navToNewServer(server);
				// Intentionally not cleared, because it needs to trigger the emitter even after unmount
				setTimeout(() => {
					EventEmitter.emit('NewServer', { server: serverParam });
				}, 300);
			} else {
				await localAuthenticate(serverParam);
				dispatch(selectServerRequest(serverParam, version, true, true));
			}
		}
	};

	const remove = (server: string) =>
		showConfirmationAlert({
			message: I18n.t('This_will_remove_all_data_from_this_server'),
			confirmationText: I18n.t('Delete'),
			onPress: async () => {
				close();
				try {
					await removeServer({ server });
				} catch {
					// do nothing
				}
			}
		});

	const renderItem = ({ item }: { item: { id: string; iconURL: string; name: string; version: string } }) => (
		<ServerItem
			item={item}
			onPress={() => select(item.id, item.version)}
			onDeletePress={() => item.id === server || remove(item.id)}
			hasCheck={item.id === server}
		/>
	);

	return (
		<View
			style={{
				backgroundColor: colors.surfaceLight,
				borderColor: colors.strokeLight
			}}
			testID='rooms-list-header-servers-list'>
			{/* reskin: profile card — the sheet is the workspace/account switcher (design §1a) */}
			{user?.username ? (
				<TouchableOpacity
					onPress={() => {
						close();
						setTimeout(() => Navigation.navigate('ProfileStackNavigator', { screen: 'ProfileView' }), 300);
					}}
					testID='workspace-sheet-profile'
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 12,
						paddingHorizontal: 16,
						paddingVertical: 14,
						borderBottomWidth: 1,
						borderColor: colors.strokeLight
					}}>
					<Avatar text={user.username} size={44} />
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 16, fontWeight: '800', color: colors.fontTitlesLabels }} numberOfLines={1}>
							{user.name || user.username}
						</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 }}>
							<Status size={10} status={user.status || 'online'} />
							<Text style={{ fontSize: 13, color: colors.fontSecondaryInfo }} numberOfLines={1}>
								@{user.username}
							</Text>
						</View>
					</View>
					<CustomIcon name='chevron-right' size={22} color={colors.fontSecondaryInfo} />
				</TouchableOpacity>
			) : null}
			<View style={[styles.serversListContainerHeader, styles.serverHeader, { borderColor: colors.strokeLight }]}>
				<Text style={[styles.serverHeaderText, { color: colors.fontSecondaryInfo }]}>{I18n.t('Workspaces')}</Text>
			</View>
			<FlatList
				style={{ maxHeight: MAX_ROWS * ROW_HEIGHT }}
				data={servers}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				ItemSeparatorComponent={List.Separator}
				keyboardShouldPersistTaps='always'
			/>
			<List.Separator />
			<View style={styles.addServerButtonContainer}>
				<Button
					title={I18n.t('Add_Server')}
					type='primary'
					onPress={addServer}
					testID='rooms-list-header-server-add'
					style={styles.buttonCreateWorkspace}
					color={colors.buttonFontSecondary}
					backgroundColor={colors.buttonBackgroundSecondaryDefault}
				/>
			</View>
		</View>
	);
};

export default memo(ServersList);
