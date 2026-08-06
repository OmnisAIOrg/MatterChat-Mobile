import { type ReactElement } from 'react';
import { type ActivityIndicatorProps, StyleSheet, View } from 'react-native';

import EnsoLoader from './EnsoLoader';

interface IActivityIndicator extends ActivityIndicatorProps {
	absolute?: boolean;
}

const styles = StyleSheet.create({
	indicator: {
		padding: 16,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	absolute: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

/**
 * Every wait in the app shows the brand's looping ensō instead of a system spinner.
 * Component name and props are unchanged so all existing call sites inherit it untouched;
 * `size` maps small → 32 and large → 52.
 */
const RCActivityIndicator = ({ absolute, size, style }: IActivityIndicator): ReactElement => (
	<View style={[styles.indicator, absolute && styles.absolute, style]}>
		<EnsoLoader size={size === 'large' ? 52 : 32} />
	</View>
);

export default RCActivityIndicator;
