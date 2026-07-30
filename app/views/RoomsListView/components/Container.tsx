import { memo, type ReactNode } from 'react';

import SafeAreaView from '../../../containers/SafeAreaView';
import { useTheme } from '../../../theme';
import TabletHeader from './TabletHeader';

const Container = ({ children }: { children: ReactNode }) => {
	'use memo';

	const { colors } = useTheme();
	return (
		<SafeAreaView testID='rooms-list-view' style={{ backgroundColor: colors.surfaceRoom }}>
			<TabletHeader />
			{children}
		</SafeAreaView>
	);
};

export default memo(Container);
