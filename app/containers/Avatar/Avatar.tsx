import { memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { settings as RocketChatSettings } from '@rocket.chat/sdk';

import Emoji from '../markdown/components/emoji/Emoji';
import { getAvatarURL } from '../../lib/methods/helpers/getAvatarUrl';
import { SubscriptionType } from '../../definitions';
import { type IAvatar } from './interfaces';
import I18n from '../../i18n';
import Touch from '../Touch';

const Avatar = memo(
	({
		server,
		style,
		avatar,
		children,
		userId,
		token,
		onPress,
		emoji,
		avatarETag,
		isStatic,
		rid,
		blockUnauthenticatedAccess,
		serverVersion,
		text,
		size = 25,
		borderRadius = Math.round(size * 0.31),
		type = SubscriptionType.DIRECT,
		avatarExternalProviderUrl,
		roomAvatarExternalProviderUrl,
		cdnPrefix,
		accessibilityLabel,
		accessible = true
	}: IAvatar) => {
		if ((!text && !avatar && !emoji && !rid) || !server) {
			return null;
		}

		const avatarAccessibilityLabel = accessibilityLabel ?? I18n.t('Avatar_Photo', { username: text });
		// The design's squircle is 31% of the size, and the edge + cast are what stop a row of
		// avatars reading as flat stickers on the sheet.
		const avatarStyle = {
			width: size,
			height: size,
			borderRadius,
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: 'rgba(44,42,33,0.12)',
			...Platform.select({
				ios: {
					shadowColor: '#2C2A21',
					shadowOffset: { width: 0, height: 2 },
					shadowRadius: 4,
					shadowOpacity: 0.16
				},
				android: { elevation: 2 }
			})
		};

		let image;
		if (emoji) {
			image = (
				<Emoji
					block={{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: emoji }, shortCode: emoji }}
					style={avatarStyle}
					isAvatar={true}
				/>
			);
		} else {
			let uri = avatar;
			if (!isStatic) {
				uri = getAvatarURL({
					type,
					text,
					size,
					userId,
					token,
					avatar,
					server,
					avatarETag,
					serverVersion,
					rid,
					blockUnauthenticatedAccess,
					avatarExternalProviderUrl,
					roomAvatarExternalProviderUrl,
					cdnPrefix
				});
			}

			image = (
				<Image
					style={avatarStyle}
					source={{
						uri,
						headers: RocketChatSettings.customHeaders
					}}
					priority='high'
				/>
			);
		}

		if (onPress) {
			image = (
				<Touch accessible={accessible} accessibilityLabel={avatarAccessibilityLabel} onPress={onPress}>
					{image}
				</Touch>
			);
		}

		return (
			<View
				accessible={accessible}
				accessibilityLabel={!onPress ? avatarAccessibilityLabel : undefined}
				style={[avatarStyle, style]}
				testID='avatar'>
				{image}
				{children}
			</View>
		);
	}
);

export default Avatar;
