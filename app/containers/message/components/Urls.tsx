import { useContext, useEffect, useLayoutEffect, useState, type ReactElement } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Image } from 'expo-image';
import axios from 'axios';

import MessageActionTouchable from './Touchable/MessageActionTouchable';
import openLink from '../../../lib/methods/helpers/openLink';
import sharedStyles from '../../../views/Styles';
import { useTheme } from '../../../theme';
import { LISTENER } from '../../Toast';
import EventEmitter from '../../../lib/methods/helpers/events';
import I18n from '../../../i18n';
import { type IUrl } from '../../../definitions';
import { WidthAwareContext } from './WidthAwareView';
import { useUrls } from '../stores/MessageStore';
import { useBaseUrl, useMessageUser } from '../stores/MessageRoomStore';
import { useSetting } from '../../../lib/hooks/useSetting';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		gap: 4
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		padding: 12,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	title: {
		fontSize: 16,
		...sharedStyles.textMedium
	},
	description: {
		fontSize: 16,
		...sharedStyles.textRegular
	},
	loading: {
		flex: 1,
		height: 150
	}
});

const UrlContent = ({ title, description }: { title: string; description: string }) => {
	'use memo';

	const { colors } = useTheme();
	return (
		<View style={styles.textContainer}>
			{title ? (
				<Text style={[styles.title, { color: colors.fontInfo }]} numberOfLines={2}>
					{title}
				</Text>
			) : null}
			{description ? (
				<Text style={[styles.description, { color: colors.fontSecondaryInfo }]} numberOfLines={2}>
					{description}
				</Text>
			) : null}
		</View>
	);
};
const UrlImage = ({ image, hasContent }: { image: string; hasContent: boolean }) => {
	const { colors } = useTheme();
	const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
	const maxSize = useContext(WidthAwareContext);

	useLayoutEffect(() => {
		if (image && maxSize) {
			Image.loadAsync(image, {
				onError: () => {
					setImageDimensions({ width: -1, height: -1 });
				},
				maxWidth: maxSize
			}).then(image => {
				setImageDimensions({ width: image.width, height: image.height });
			});
		}
	}, [image, maxSize]);

	if (!imageDimensions.width || !imageDimensions.height) {
		return <View style={styles.loading} />;
	}
	if (imageDimensions.width === -1) {
		return null;
	}

	const width = Math.min(imageDimensions.width, maxSize) || 0;
	const height = Math.min((imageDimensions.height * ((width * 100) / imageDimensions.width)) / 100, maxSize) || 0;
	const imageStyle = {
		width,
		height
	};
	let containerStyle: ViewStyle = {
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		...(imageDimensions.width <= 64 && { width: 64 }),
		...(imageDimensions.height <= 64 && { height: 64 })
	};
	if (!hasContent) {
		containerStyle = {
			...containerStyle,
			borderColor: colors.strokeLight,
			borderWidth: 1,
			borderRadius: 4
		};
	}

	return (
		<View style={containerStyle}>
			<Image source={{ uri: image }} style={imageStyle} contentFit='contain' />
		</View>
	);
};

// reskin (§2a): CasePro links get a branded case card instead of the generic preview.
// Client-side only — renders the same server-provided URL metadata with CasePro treatment.
const CASEPRO_HOSTS = ['crm.omnisai.io', 'crm.stg-omnisai.io'];
const isCaseProUrl = (u?: string): boolean => {
	if (!u) {
		return false;
	}
	try {
		return CASEPRO_HOSTS.includes(new URL(u).hostname);
	} catch {
		return false;
	}
};

const caseProStyles = StyleSheet.create({
	card: {
		borderRadius: 12,
		borderWidth: 1,
		borderLeftWidth: 3,
		overflow: 'hidden',
		padding: 12,
		gap: 6
	},
	badgeRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6
	},
	badge: {
		fontSize: 10,
		fontWeight: '800',
		letterSpacing: 0.8,
		paddingHorizontal: 7,
		paddingVertical: 2.5,
		borderRadius: 6,
		overflow: 'hidden'
	},
	title: {
		fontSize: 15,
		...sharedStyles.textBold
	},
	description: {
		fontSize: 13,
		...sharedStyles.textRegular
	},
	open: {
		fontSize: 13,
		fontWeight: '700',
		marginTop: 2
	}
});

const CaseProCard = ({ url, onPress, onLongPress }: { url: IUrl; onPress: () => void; onLongPress: () => void }) => {
	'use memo';

	const { colors } = useTheme();
	return (
		<MessageActionTouchable
			onPress={onPress}
			onLongPress={onLongPress}
			style={[
				caseProStyles.card,
				{ backgroundColor: colors.surfaceTint, borderColor: colors.strokeLight, borderLeftColor: colors.strokeHighlight }
			]}>
			<>
				<View style={caseProStyles.badgeRow}>
					<Text style={[caseProStyles.badge, { backgroundColor: colors.statusBackgroundInfo, color: colors.statusFontInfo }]}>
						CASEPRO
					</Text>
				</View>
				{url.title ? (
					<Text style={[caseProStyles.title, { color: colors.fontTitlesLabels }]} numberOfLines={2}>
						{url.title}
					</Text>
				) : null}
				{url.description ? (
					<Text style={[caseProStyles.description, { color: colors.fontSecondaryInfo }]} numberOfLines={2}>
						{url.description}
					</Text>
				) : null}
				<Text style={[caseProStyles.open, { color: colors.fontInfo }]}>Open in CasePro →</Text>
			</>
		</MessageActionTouchable>
	);
};

const Url = ({ url }: { url: IUrl }) => {
	'use memo';

	const { colors, theme } = useTheme();
	const baseUrl = useBaseUrl();
	const user = useMessageUser();
	const API_Embed = useSetting('API_Embed') as boolean;
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		const verifyUrlIsImage = async () => {
			try {
				const rawImageUrl = url.image || url.url;
				if (!rawImageUrl || !API_Embed) return;

				const _imageUrl = rawImageUrl.startsWith('http')
					? rawImageUrl
					: `${baseUrl}/${rawImageUrl}?rc_uid=${user?.id ?? ''}&rc_token=${user?.token ?? ''}`;

				const response = await axios.head(_imageUrl);
				const contentType = response.headers['content-type'];
				if (contentType?.startsWith?.('image/')) {
					setImageUrl(_imageUrl);
				}
			} catch {
				// do nothing
			}
		};
		verifyUrlIsImage();
	}, [url.image, url.url, API_Embed, baseUrl, user?.id, user?.token]);

	const onPress = () => openLink(url.url, theme);

	const onLongPress = () => {
		Clipboard.setString(url.url);
		EventEmitter.emit(LISTENER, { message: I18n.t('Copied_to_clipboard') });
	};

	const hasContent = !!(url.title || url.description);

	if (!url || url?.ignoreParse || !API_Embed) {
		return null;
	}

	if (isCaseProUrl(url.url)) {
		return <CaseProCard url={url} onPress={onPress} onLongPress={onLongPress} />;
	}

	return (
		<MessageActionTouchable
			onPress={onPress}
			onLongPress={onLongPress}
			style={[
				styles.container,
				hasContent && {
					backgroundColor: colors.surfaceTint,
					borderColor: colors.strokeLight,
					borderRadius: 4,
					borderWidth: 1,
					overflow: 'hidden'
				}
			]}>
			<>
				{imageUrl ? <UrlImage image={imageUrl} hasContent={hasContent} /> : null}
				{hasContent ? <UrlContent title={url.title} description={url.description} /> : null}
			</>
		</MessageActionTouchable>
	);
};
const Urls = (): ReactElement[] | null => {
	'use memo';

	const urls = useUrls();

	if (!urls || urls.length === 0) {
		return null;
	}

	return urls.map((url: IUrl) => <Url url={url} key={url.url} />);
};

export default Urls;
