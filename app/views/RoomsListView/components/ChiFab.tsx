import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

/**
 * Floating "summon Chi" button on the chats list — the phone entry point to the Chi orb surface
 * (ChiOrbView → the server-hosted "C into B" page). The glyph is a lightweight ensō (an almost-closed
 * brush ring with the characteristic gap), self-contained via react-native-svg so it needs no bundled
 * asset. Tapping opens the half-sheet; from there the user swipes up into full-screen voice mode.
 */
const styles = StyleSheet.create({
	wrap: {
		position: 'absolute',
		right: 18,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		width: 58,
		height: 58,
		borderRadius: 29,
		backgroundColor: '#10151c',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#3b9bff',
		shadowOpacity: 0.35,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
		elevation: 8,
		borderWidth: 1,
		borderColor: 'rgba(90,160,255,0.28)'
	}
});

const ChiFab = (): React.ReactElement => {
	const navigation = useNavigation<any>();
	const { bottom } = useSafeAreaInsets();

	return (
		<View style={[styles.wrap, { bottom: bottom + 20 }]} pointerEvents='box-none'>
			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.85}
				accessibilityLabel='Chi assistant'
				accessibilityRole='button'
				onPress={() => navigation.navigate('ChiOrbView')}>
				<Svg width={30} height={30} viewBox='0 0 30 30'>
					{/* ensō: an open brush ring — dash/gap + rotation give the characteristic sweep */}
					<Circle
						cx={15}
						cy={15}
						r={10}
						stroke='#eaf2ff'
						strokeWidth={2.4}
						strokeLinecap='round'
						fill='none'
						strokeDasharray={[54, 12]}
						strokeDashoffset={8}
						transform='rotate(-35 15 15)'
					/>
				</Svg>
			</TouchableOpacity>
		</View>
	);
};

export default ChiFab;
