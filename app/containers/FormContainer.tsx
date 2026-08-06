import { type ReactElement } from 'react';
import { type ScrollViewProps, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import sharedStyles from '../views/Styles';
import scrollPersistTaps from '../lib/methods/helpers/scrollPersistTaps';
import { useTheme } from '../theme';
import AppVersion from './AppVersion';
import { isTablet } from '../lib/methods/helpers';
import SafeAreaView from './SafeAreaView';
import { gradients } from '../lib/constants/typography';

interface IFormContainer extends ScrollViewProps {
	testID: string;
	children: ReactElement | ReactElement[] | null;
	showAppVersion?: boolean;
	/** Full-bleed art rendered above the padded form content (see BrandHero). */
	hero?: ReactElement | null;
}

const styles = StyleSheet.create({
	scrollView: {
		flexGrow: 1
	},
	// Onboarding sits on the brand's forest ground (mirrors the web login) with the form
	// floating above it in a warm cream card.
	forest: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		// reach above the screen container so the status-bar strip is green too —
		// the frame should read as one continuous surface from the very top edge
		top: -240
	},
	heroSpace: {
		paddingTop: 76,
		paddingBottom: 30
	},
	card: {
		marginHorizontal: 16,
		borderRadius: 24,
		paddingHorizontal: 20,
		paddingTop: 24,
		paddingBottom: 20,
		shadowColor: '#020805',
		shadowOpacity: 0.28,
		shadowRadius: 24,
		shadowOffset: { width: 0, height: 12 },
		elevation: 10
	}
});

export const FormContainerInner = ({
	children,
	accessibilityLabel
}: {
	children: (ReactElement | null)[];
	accessibilityLabel?: string;
}): ReactElement => (
	<View accessibilityLabel={accessibilityLabel} style={[sharedStyles.container, isTablet && sharedStyles.tabletScreenContent]}>
		{children}
	</View>
);

const FormContainer = ({ children, testID, showAppVersion = true, hero, ...props }: IFormContainer): ReactElement => {
	const { colors } = useTheme();
	const { bottom } = useSafeAreaInsets();

	// With a hero the screen becomes the forest ground + a cream card; without one it keeps
	// the plain themed background (used by the rest of the auth stack).
	if (hero) {
		return (
			<View style={sharedStyles.container}>
				<LinearGradient
					colors={gradients.brand as unknown as string[]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.forest}
				/>
				<KeyboardAwareScrollView
					style={sharedStyles.container}
					contentContainerStyle={[styles.scrollView, { paddingBottom: Math.max(28, bottom) }]}
					bottomOffset={20}
					{...scrollPersistTaps}
					{...props}>
					<View style={styles.heroSpace}>{hero}</View>
					<SafeAreaView testID={testID} style={[styles.card, { backgroundColor: colors.surfaceLight }]}>
						{children}
					</SafeAreaView>
					<>{showAppVersion && <AppVersion />}</>
				</KeyboardAwareScrollView>
			</View>
		);
	}

	return (
		<KeyboardAwareScrollView
			style={[sharedStyles.container, { backgroundColor: colors.surfaceRoom }]}
			contentContainerStyle={[sharedStyles.containerScrollView, styles.scrollView, { paddingBottom: Math.max(24, bottom) }]}
			bottomOffset={20}
			{...scrollPersistTaps}
			{...props}>
			<SafeAreaView testID={testID} style={{ backgroundColor: colors.surfaceRoom }}>
				{children}
				<>{showAppVersion && <AppVersion />}</>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
};

export default FormContainer;
