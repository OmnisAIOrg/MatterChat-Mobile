import { memo, type ReactElement } from 'react';

import SafeAreaView from '../../../containers/SafeAreaView';
import SkyBackground from '../../../containers/SkyBackground';
import { useTheme } from '../../../theme';
import TabletHeader from './TabletHeader';

const Container = ({ children }: { children: ReactElement | ReactElement[] }) => {
	'use memo';

	const { colors } = useTheme();
	return (
		<SafeAreaView testID='rooms-list-view' style={{ backgroundColor: colors.surfaceRoom }}>
			<SkyBackground />
			<TabletHeader />
			{children}
		</SafeAreaView>
	);
};

export default memo(Container);
