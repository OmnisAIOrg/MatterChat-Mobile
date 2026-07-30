/**
 * ConnectionsView — per-user Chi connector toggles (gallery §2a, guide §6).
 *
 * Lists the product connectors Chi can act through (CasePro, MatterChat, CaseNotes,
 * Gmail, Outlook) with per-user switches, plus roadmap connectors (LitBox, DepoLink)
 * rendered as disabled SOON rows. Toggles persist via the existing `chi.prefs`
 * endpoint — zero new backend. If the server doesn't expose `chi.prefs` yet,
 * the screen falls back to local defaults and silently disables persistence.
 */
import { useEffect, useLayoutEffect, useRef, useState, type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CustomIcon, type TIconsName } from '../../containers/CustomIcon';
import * as List from '../../containers/List';
import SafeAreaView from '../../containers/SafeAreaView';
import Switch from '../../containers/Switch';
import Touch from '../../containers/Touch';
import sdk from '../../lib/services/sdk';
import { type SettingsStackParamList } from '../../stacks/types';
import { useTheme } from '../../theme';
import sharedStyles from '../Styles';

type TConnectorSlug = 'casepro' | 'matterchat' | 'casenotes' | 'gmail' | 'outlook';

interface IConnector {
	slug: string;
	name: string;
	description: string;
	icon?: TIconsName;
}

const ACTIVE_CONNECTORS: IConnector[] = [
	{ slug: 'casepro', name: 'CasePro', description: 'Matters, parties, deadlines & tasks', icon: 'business' },
	{ slug: 'matterchat', name: 'MatterChat', description: 'Channels, DMs & message history', icon: 'message' },
	{ slug: 'casenotes', name: 'CaseNotes', description: 'Meeting notes & transcripts', icon: 'transcript' },
	{ slug: 'gmail', name: 'Gmail', description: 'Read & draft mail as you', icon: 'google-monochromatic' },
	{ slug: 'outlook', name: 'Outlook', description: 'Read & draft mail as you', icon: 'mail' }
];

const SOON_CONNECTORS: IConnector[] = [
	{ slug: 'litbox', name: 'LitBox', description: 'Documents & exhibits', icon: 'folder' },
	{ slug: 'depolink', name: 'DepoLink', description: 'Depositions & transcripts', icon: 'mic' }
];

const DEFAULT_CONNECTORS: Record<TConnectorSlug, boolean> = {
	casepro: true,
	matterchat: true,
	casenotes: true,
	gmail: true,
	outlook: true
};

const styles = StyleSheet.create({
	banner: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginHorizontal: 16,
		marginBottom: 16,
		padding: 14,
		borderRadius: 16,
		borderWidth: 1,
		gap: 12
	},
	bannerText: {
		flex: 1,
		fontSize: 13,
		lineHeight: 19,
		...sharedStyles.textRegular
	},
	bannerTextBold: {
		...sharedStyles.textBold
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 64,
		paddingHorizontal: 16,
		paddingVertical: 10
	},
	rowDisabled: {
		opacity: 0.55
	},
	tile: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12
	},
	tileInitial: {
		fontSize: 16,
		...sharedStyles.textBold
	},
	rowTextContainer: {
		flex: 1,
		justifyContent: 'center',
		marginRight: 12
	},
	rowName: {
		fontSize: 15,
		...sharedStyles.textBold
	},
	rowDescription: {
		fontSize: 13,
		marginTop: 2,
		...sharedStyles.textRegular
	},
	soonBadge: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 8,
		marginRight: 12
	},
	soonBadgeText: {
		fontSize: 10,
		fontWeight: '800',
		letterSpacing: 0.8,
		...sharedStyles.textBold
	},
	footer: {
		fontSize: 12,
		lineHeight: 18,
		textAlign: 'center',
		paddingHorizontal: 32,
		paddingTop: 8,
		...sharedStyles.textRegular
	}
});

const ConnectorTile = ({ connector }: { connector: IConnector }): ReactElement => {
	'use memo';

	const { colors } = useTheme();
	return (
		<View style={[styles.tile, { backgroundColor: colors.statusBackgroundInfo }]}>
			{connector.icon ? (
				<CustomIcon name={connector.icon} size={20} color={colors.fontInfo} />
			) : (
				<Text style={[styles.tileInitial, { color: colors.fontInfo }]}>{connector.name[0]}</Text>
			)}
		</View>
	);
};

interface IConnectorRow {
	connector: IConnector;
	value: boolean;
	soon?: boolean;
	onToggle?: (value: boolean) => void;
}

const ConnectorRow = ({ connector, value, soon, onToggle }: IConnectorRow): ReactElement => {
	'use memo';

	const { colors } = useTheme();

	const content = (
		<View
			style={[styles.row, soon && styles.rowDisabled]}
			accessible
			accessibilityRole='switch'
			accessibilityState={{ checked: value, disabled: !!soon }}
			accessibilityLabel={`${connector.name} ${connector.description}`}>
			<ConnectorTile connector={connector} />
			<View style={styles.rowTextContainer}>
				<Text style={[styles.rowName, { color: colors.fontTitlesLabels }]} numberOfLines={1}>
					{connector.name}
				</Text>
				<Text style={[styles.rowDescription, { color: colors.fontSecondaryInfo }]} numberOfLines={1}>
					{connector.description}
				</Text>
			</View>
			{soon ? (
				<View style={[styles.soonBadge, { backgroundColor: colors.statusBackgroundWarning }]}>
					<Text style={[styles.soonBadgeText, { color: colors.statusFontWarning }]}>SOON</Text>
				</View>
			) : null}
			<Switch
				value={value}
				disabled={soon}
				onValueChange={soon ? undefined : onToggle}
				testID={`connections-view-switch-${connector.slug}`}
			/>
		</View>
	);

	if (soon) {
		return <View style={{ backgroundColor: colors.surfaceRoom }}>{content}</View>;
	}

	return (
		<Touch
			onPress={() => onToggle?.(!value)}
			style={{ backgroundColor: colors.surfaceRoom }}
			testID={`connections-view-row-${connector.slug}`}>
			{content}
		</Touch>
	);
};

const ConnectionsView = (): ReactElement => {
	'use memo';

	const { colors } = useTheme();
	const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParamList, 'ConnectionsView'>>();
	const [connectors, setConnectors] = useState<Record<string, boolean>>(DEFAULT_CONNECTORS);
	const canPersist = useRef(true);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Connections'
		});
	}, [navigation]);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const result = (await sdk.get('chi.prefs' as any)) as { prefs?: { connectors?: Record<string, boolean> } };
				if (mounted && result?.prefs?.connectors) {
					setConnectors(prev => ({ ...prev, ...result.prefs?.connectors }));
				}
			} catch {
				// older server without chi.prefs — keep local defaults, disable persistence silently
				canPersist.current = false;
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const toggleConnector = (slug: string, value: boolean) => {
		const next = { ...connectors, [slug]: value };
		setConnectors(next);
		if (canPersist.current) {
			try {
				(sdk.post('chi.prefs' as any, { connectors: next } as any) as Promise<unknown>)?.catch?.(() => {
					// best-effort persistence — the optimistic local state stands
				});
			} catch {
				// Do nothing
			}
		}
	};

	return (
		<SafeAreaView testID='connections-view'>
			<List.Container testID='connections-view-list'>
				<View
					style={[
						styles.banner,
						{ backgroundColor: colors.statusBackgroundInfo, borderColor: colors.strokeExtraLightHighlight }
					]}>
					<CustomIcon name='shield-check' size={24} color={colors.fontInfo} />
					<Text style={[styles.bannerText, { color: colors.fontDefault }]}>
						Chi can act in your firm&apos;s products. Everything runs with <Text style={styles.bannerTextBold}>your</Text>{' '}
						permissions and every action is logged to <Text style={styles.bannerTextBold}>#chi-audit</Text>.
					</Text>
				</View>

				<List.Section title='Connected' translateTitle={false}>
					<List.Separator />
					<>
						{ACTIVE_CONNECTORS.map(connector => (
							<View key={connector.slug}>
								<ConnectorRow
									connector={connector}
									value={!!connectors[connector.slug]}
									onToggle={value => toggleConnector(connector.slug, value)}
								/>
								<List.Separator />
							</View>
						))}
					</>
				</List.Section>

				<List.Section title='Coming soon' translateTitle={false}>
					<List.Separator />
					<>
						{SOON_CONNECTORS.map(connector => (
							<View key={connector.slug}>
								<ConnectorRow connector={connector} value={false} soon />
								<List.Separator />
							</View>
						))}
					</>
				</List.Section>

				<Text style={[styles.footer, { color: colors.fontSecondaryInfo }]}>
					Chi runs with your permissions · actions are logged to #chi-audit
				</Text>
			</List.Container>
		</SafeAreaView>
	);
};

export default ConnectionsView;
