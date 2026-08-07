import { memo, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import TabletHeader from './TabletHeader';

/**
 * Paper & Sky: the rooms list paints nothing of its own. The living sky is already behind it
 * (mounted once at the app root) and the screen floats a hero, glass chrome and one paper sheet
 * over it — so this container is a plain flex box, edge to edge, insets included, and the hero
 * takes the top inset itself.
 */
const styles = StyleSheet.create({ root: { flex: 1 } });

const Container = ({ children }: { children: ReactElement | ReactElement[] }) => {
	'use memo';

	return (
		<View testID='rooms-list-view' style={styles.root}>
			<TabletHeader />
			{children}
		</View>
	);
};

export default memo(Container);
