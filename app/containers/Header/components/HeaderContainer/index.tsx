import { memo } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEADER_GREEN } from '../../../../lib/methods/helpers/navigation';

interface IHeaderContainer extends ViewProps {
	addExtraNotchPadding?: boolean;
	isMasterDetail?: boolean;
	customLeftIcon?: boolean;
	customRightIcon?: boolean;
}

const HeaderContainer = memo(({ isMasterDetail = false, customRightIcon, customLeftIcon, children }: IHeaderContainer) => {
	'use memo';

	const insets = useSafeAreaInsets();
	const paddingTop = 4;
	const paddingBottom = 4;
	const paddingRight = isMasterDetail || !customRightIcon ? 4 : 16;

	return (
		<View
			style={{
				alignItems: 'center',
				flexDirection: 'row',
				paddingBottom,
				paddingTop,
				paddingRight: paddingRight + insets.right,
				paddingLeft: insets.left + (customLeftIcon ? 10 : 4),
				gap: isMasterDetail ? 4 : 12,
				// The header is part of the app's green frame (same green as the app icon),
				// so it reads continuously with the status-bar strip above it.
				backgroundColor: HEADER_GREEN,
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: 'rgba(255,255,255,0.14)'
			}}>
			{children}
		</View>
	);
});

export default HeaderContainer;
