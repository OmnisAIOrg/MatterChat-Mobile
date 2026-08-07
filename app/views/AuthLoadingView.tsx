import { memo, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * The loading root.
 *
 * The opening animation itself lives in `BootOverlay`, mounted at the app root so it can outlive
 * the root switch that ends the boot and ignite *over* the revealed app. All this screen has to be
 * is the ground beneath it — same colour, so there is no seam when the overlay burns away.
 */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#030E07'
	}
});

const AuthLoadingView = memo((): ReactElement => <View style={styles.container} />);

export default AuthLoadingView;
