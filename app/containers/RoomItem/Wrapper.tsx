import { type ReactElement } from 'react';
import { View } from 'react-native';

import { DisplayMode } from '../../lib/constants/constantDisplayMode';
import { isPaperSky, paperShadow } from '../../lib/constants/paperSky';
import { useTheme } from '../../theme';
import IconOrAvatar from './IconOrAvatar';
import { type IWrapperProps } from './interfaces';
import styles from './styles';
import { useResponsiveLayout } from '../../lib/hooks/useResponsiveLayout/useResponsiveLayout';

const Wrapper = ({
	accessibilityLabel,
	accessibilityHint,
	children,
	displayMode,
	unreadHighlight,
	...props
}: IWrapperProps): ReactElement => {
	const { colors, theme } = useTheme();
	const { rowHeight, rowHeightCondensed } = useResponsiveLayout();
	const height = displayMode === DisplayMode.Condensed ? rowHeightCondensed : rowHeight;
	const paperSky = isPaperSky(theme);
	return (
		<View
			style={[
				styles.container,
				// Paper & Sky: each row is a floating paper card over the sky. Vertical margins
				// are carved out of the fixed row height so getItemLayout stays exact.
				paperSky
					? {
							height: height - 6,
							marginVertical: 3,
							marginHorizontal: 12,
							borderRadius: 18,
							backgroundColor: unreadHighlight ? colors.surfaceSelected : colors.surfaceLight,
							...paperShadow
					  }
					: { height },
				// reskin: unread rows sit on the green-tinted selected surface
				!paperSky && unreadHighlight ? { backgroundColor: colors.surfaceSelected } : null
			]}
			accessibilityLabel={accessibilityLabel}
			accessibilityHint={accessibilityHint}
			accessible
			accessibilityRole='button'>
			<IconOrAvatar displayMode={displayMode} {...props} />
			<View
				style={[
					styles.centerContainer,
					{
						// paper cards carry their own edges — no hairline between cards
						borderColor: paperSky ? 'transparent' : colors.strokeLight
					}
				]}>
				{children}
			</View>
		</View>
	);
};

export default Wrapper;
