import { Image, StyleSheet, Text, View } from 'react-native';

import { usePaper } from './Paper';

/**
 * The empty state.
 *
 * A blank sheet is the one place a design has nothing to hide behind, so this is where the brand
 * shows up: the ensō, ghosted back into the paper, with a title and a single line telling you what
 * will appear here. Never an apology, never a spinner that has stopped.
 */
const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40,
		paddingVertical: 48
	},
	mark: {
		width: 96,
		height: Math.round((96 * 748) / 784),
		opacity: 0.1,
		marginBottom: 20
	},
	title: {
		fontSize: 16,
		fontWeight: '800',
		textAlign: 'center'
	},
	hint: {
		fontSize: 14,
		lineHeight: 20,
		textAlign: 'center',
		marginTop: 6
	}
});

const EmptyState = ({ title, hint }: { title: string; hint?: string }) => {
	const p = usePaper();
	return (
		<View style={styles.root}>
			<Image
				source={require('../static/images/enso_bristle.png')}
				style={styles.mark}
				resizeMode='contain'
				tintColor={p.accent}
			/>
			<Text style={[styles.title, { color: p.ink }]}>{title}</Text>
			{hint ? <Text style={[styles.hint, { color: p.inkSoft }]}>{hint}</Text> : null}
		</View>
	);
};

export default EmptyState;
