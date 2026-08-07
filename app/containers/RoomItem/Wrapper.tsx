import { type ReactElement } from 'react';
import { View } from 'react-native';

import { DisplayMode } from '../../lib/constants/constantDisplayMode';
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
	const { colors } = useTheme();
	const { rowHeight, rowHeightCondensed } = useResponsiveLayout();
	return (
		<View
			style={[
				styles.container,
				{ height: displayMode === DisplayMode.Condensed ? rowHeightCondensed : rowHeight },
				// reskin: unread rows sit on the green-tinted selected surface
				unreadHighlight ? { backgroundColor: colors.surfaceSelected } : null
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
						// The row hairline is the softer of the two paper strokes: dividers inside a
						// sheet should separate rows without drawing a grid over them.
						borderColor: colors.strokeExtraLight
					}
				]}>
				{children}
			</View>
		</View>
	);
};

export default Wrapper;
