import { memo, type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import EnsoLoader from '../containers/EnsoLoader';
import { fontFamily } from '../lib/constants/typography';
import { useAppSelector } from '../lib/hooks/useAppSelector';

/**
 * The startup screen — the app's counterpart to the web's initializing state: a green
 * particle ensō turning on the deep ground, with a wide-tracked INITIALIZING caption beneath.
 * Any status text the boot reports (server name, migration step) replaces the caption.
 */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// the ground the web initializes on — near-black with a green cast
		backgroundColor: '#0B120D'
	},
	caption: {
		fontFamily: fontFamily.mono,
		fontSize: 11,
		letterSpacing: 3.2,
		color: 'rgba(215, 239, 227, 0.72)',
		textAlign: 'center',
		marginTop: 44,
		textTransform: 'uppercase'
	}
});

const AuthLoadingView = memo((): ReactElement => {
	const text = useAppSelector(state => state.app.text);
	return (
		<View style={styles.container}>
			<EnsoLoader size={96} />
			<Text style={styles.caption}>{text || 'Initializing'}</Text>
		</View>
	);
});

export default AuthLoadingView;
