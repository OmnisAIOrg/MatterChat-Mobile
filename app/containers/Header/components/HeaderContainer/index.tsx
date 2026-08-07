import { memo } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
	const paddingBottom = 6;
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
				backgroundColor: 'transparent'
			}}>
			{children}
		</View>
	);
});

export default HeaderContainer;
