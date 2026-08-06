// MatterChat design tokens — MIRRORS THE WEB APP (app.matterchat.com).
// Values sampled directly from the production web UI so mobile and web read as one product:
//   emerald #12B981 (primary) · mint #34E6A8 (dark accent) · deep #0D8F5F / #0E7A4A (text-safe green)
//   warm cream surfaces #FFFDF9 / #F6F1E8 / #F1EBDF · ink #0B1A14 · hairline #E3E8E2
//   forest darks #12402C → #0A2417 → #06170F → #030C07 (the web hero gradient stops)
// One accent red #E1053C stays reserved for destructive/mention.
// Themes: light (cream) / dark (forest dim) / black (forest OLED).

/**
 * The app frame green — sampled from the MatterChat app icon (#3BAB55 → #1A8335); this is
 * its midpoint. Every framing surface uses it: the status-bar strip, nav headers, the tab
 * bar and the navigator ground. Declared here (a leaf module) so importing it can never
 * create a cycle — an earlier version imported it from the navigation helpers and resolved
 * to `undefined` at module-eval time, silently falling back to the neutral surface.
 */
export const FRAME_GREEN = '#2A9645';

const backdropColor = '#000000';
const overlayBackground = 'rgba(22, 33, 26, 0.65)';

const light = {
	surfaceLight: '#FFFDF9',
	surfaceTint: '#F6F1E8',
	surfaceRoom: '#FFFDF9',
	surfaceNeutral: '#F1EBDF',
	surfaceDisabled: '#F6F1E8',
	surfaceHover: '#F3EEE4',
	surfaceSelected: '#E8F7EF',
	surfaceDark: '#0B1A14',
	surfaceFeatured: '#0D8F5F',
	surfaceFeaturedHover: '#0E7A4A',

	strokeExtraLight: '#EDE7DC',
	strokeLight: '#E3E8E2',
	strokeMedium: '#A9B5AC',
	strokeDark: '#55655C',
	strokeExtraDark: '#163024',
	strokeExtraLightHighlight: '#C7EFDD',
	strokeHighlight: '#12B981',
	strokeExtraLightError: '#FBD3DC',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#C2CCC5',
	fontAnnotation: '#7C8B83',
	fontHint: '#7C8B83',
	fontSecondaryInfo: '#55655C',
	fontDefault: '#163024',
	fontTitlesLabels: '#0B1A14',
	fontInfo: '#0E7A4A',
	fontDanger: '#C21038',
	fontPureBlack: '#0B1A14',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#E8F7EF',
	statusBackgroundSuccess: '#D9F5E8',
	statusBackgroundDanger: '#FBD3DC',
	statusBackgroundWarning: '#FBF1E6',
	statusBackgroundWarning2: '#FDF7E7',
	statusBackgroundService: '#F8E3D2',
	statusBackgroundService2: '#EDD0F7',
	statusFontInfo: '#0E7A4A',
	statusFontSuccess: '#0D8F5F',
	statusFontDanger: '#B00D30',
	statusFontWarning: '#B0611E',
	statusFontWarning2: '#26312A',
	statusFontService: '#974809',
	statusFontService2: '#7F1B9F',

	badgeBackgroundLevel1: '#7A8880',
	badgeBackgroundLevel2: '#12B981',
	badgeBackgroundLevel3: '#E09425',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#12B981',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#8FA096',
	userPresenceDisabled: '#E09425',

	buttonBackgroundPrimaryDefault: '#12B981',
	buttonBackgroundPrimaryPress: '#0D8F5F',
	buttonBackgroundPrimaryDisabled: '#E8F7EF',

	buttonBackgroundSecondaryDefault: '#F1EBDF',
	buttonBackgroundSecondaryPress: '#E6DFD0',
	buttonBackgroundSecondaryDisabled: '#F6F1E8',

	buttonBackgroundSecondaryDangerDefault: '#ECEFEB',
	buttonBackgroundSecondaryDangerPress: '#D8DFD9',
	buttonBackgroundSecondaryDangerDisabled: '#F1F4F0',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#FBD3DC',

	buttonBackgroundSuccessDefault: '#0D8F5F',
	buttonBackgroundSuccessPress: '#0E7A4A',
	buttonBackgroundSuccessDisabled: '#DBF3E6',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#A6B2A8',
	buttonFontSecondary: '#0B1A14',
	buttonSecondaryDisabled: '#A6B2A8',
	buttonFontSecondaryDanger: '#B00D30',
	buttonSecondaryDangerDisabled: '#E9AABB',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#FFFFFF',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#FFFFFF'
};

const dark = {
	surfaceLight: '#0A2417',
	surfaceTint: '#12402C',
	surfaceRoom: '#06170F',
	surfaceNeutral: '#12402C',
	surfaceDisabled: '#0A2417',
	surfaceHover: '#0C2C1C',
	surfaceSelected: '#123D2A',
	surfaceDark: '#F4FFF9',
	surfaceFeatured: '#12B981',
	surfaceFeaturedHover: '#0D8F5F',

	strokeExtraLight: '#12402C',
	strokeLight: '#1B4B34',
	strokeMedium: '#2E6A4C',
	strokeDark: '#5FBF95',
	strokeExtraDark: '#D7EFE3',
	strokeExtraLightHighlight: '#12402C',
	strokeHighlight: '#34E6A8',
	strokeExtraLightError: '#55232C',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#456B5A',
	fontAnnotation: '#5FBF95',
	fontHint: '#5FBF95',
	fontSecondaryInfo: '#8FD9B8',
	fontDefault: '#D7EFE3',
	fontTitlesLabels: '#F4FFF9',
	fontInfo: '#34E6A8',
	fontDanger: '#F0708D',
	fontPureBlack: '#0B1A14',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#12402C',
	statusBackgroundSuccess: '#12402C',
	statusBackgroundDanger: '#3D1620',
	statusBackgroundWarning: '#3A2C14',
	statusBackgroundWarning2: '#33290F',
	statusBackgroundService: '#3A2414',
	statusBackgroundService2: '#3A1E44',
	statusFontInfo: '#34E6A8',
	statusFontSuccess: '#34E6A8',
	statusFontDanger: '#F0708D',
	statusFontWarning: '#E8B931',
	statusFontWarning2: '#EDF2EE',
	statusFontService: '#DE9A66',
	statusFontService2: '#C393D2',

	badgeBackgroundLevel1: '#4A564E',
	badgeBackgroundLevel2: '#12B981',
	badgeBackgroundLevel3: '#B87F1F',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#34E6A8',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#75857A',
	userPresenceDisabled: '#B87F1F',

	buttonBackgroundPrimaryDefault: '#12B981',
	buttonBackgroundPrimaryPress: '#0D8F5F',
	buttonBackgroundPrimaryDisabled: '#12402C',

	buttonBackgroundSecondaryDefault: '#12402C',
	buttonBackgroundSecondaryPress: '#1B4B34',
	buttonBackgroundSecondaryDisabled: '#0A2417',

	buttonBackgroundSecondaryDangerDefault: '#222B24',
	buttonBackgroundSecondaryDangerPress: '#2C3830',
	buttonBackgroundSecondaryDangerDisabled: '#1B231D',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#3D1620',

	buttonBackgroundSuccessDefault: '#0D8F5F',
	buttonBackgroundSuccessPress: '#0E7A4A',
	buttonBackgroundSuccessDisabled: '#1F3A28',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#57645B',
	buttonFontSecondary: '#F4FFF9',
	buttonSecondaryDisabled: '#57645B',
	buttonFontSecondaryDanger: '#F0708D',
	buttonSecondaryDangerDisabled: '#7A3644',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#8FA096',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#8FA096'
};

const black = {
	surfaceLight: '#030C07',
	surfaceTint: '#06170F',
	surfaceRoom: '#020805',
	surfaceNeutral: '#0A2417',
	surfaceDisabled: '#06170F',
	surfaceHover: '#051209',
	surfaceSelected: '#0C2C1C',
	surfaceDark: '#F4FFF9',
	surfaceFeatured: '#12B981',
	surfaceFeaturedHover: '#0D8F5F',

	strokeExtraLight: '#0A2417',
	strokeLight: '#10301F',
	strokeMedium: '#25553C',
	strokeDark: '#5FBF95',
	strokeExtraDark: '#D7EFE3',
	strokeExtraLightHighlight: '#0A2417',
	strokeHighlight: '#34E6A8',
	strokeExtraLightError: '#4A1D28',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#3B5B4B',
	fontAnnotation: '#5FBF95',
	fontHint: '#5FBF95',
	fontSecondaryInfo: '#8FD9B8',
	fontDefault: '#D7EFE3',
	fontTitlesLabels: '#F4FFF9',
	fontInfo: '#34E6A8',
	fontDanger: '#F0708D',
	fontPureBlack: '#0B1A14',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#0A2417',
	statusBackgroundSuccess: '#0A2417',
	statusBackgroundDanger: '#361119',
	statusBackgroundWarning: '#33260F',
	statusBackgroundWarning2: '#2C230B',
	statusBackgroundService: '#331F10',
	statusBackgroundService2: '#33193C',
	statusFontInfo: '#34E6A8',
	statusFontSuccess: '#34E6A8',
	statusFontDanger: '#F0708D',
	statusFontWarning: '#E8B931',
	statusFontWarning2: '#EDF2EE',
	statusFontService: '#DE9A66',
	statusFontService2: '#C393D2',

	badgeBackgroundLevel1: '#4A564E',
	badgeBackgroundLevel2: '#12B981',
	badgeBackgroundLevel3: '#B87F1F',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#34E6A8',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#6B7A70',
	userPresenceDisabled: '#B87F1F',

	buttonBackgroundPrimaryDefault: '#12B981',
	buttonBackgroundPrimaryPress: '#0D8F5F',
	buttonBackgroundPrimaryDisabled: '#0A2417',

	buttonBackgroundSecondaryDefault: '#0A2417',
	buttonBackgroundSecondaryPress: '#10301F',
	buttonBackgroundSecondaryDisabled: '#06170F',

	buttonBackgroundSecondaryDangerDefault: '#141B16',
	buttonBackgroundSecondaryDangerPress: '#1E2620',
	buttonBackgroundSecondaryDangerDisabled: '#101613',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#361119',

	buttonBackgroundSuccessDefault: '#0D8F5F',
	buttonBackgroundSuccessPress: '#0E7A4A',
	buttonBackgroundSuccessDisabled: '#16301F',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#4E5A52',
	buttonFontSecondary: '#F4FFF9',
	buttonSecondaryDisabled: '#4E5A52',
	buttonFontSecondaryDanger: '#F0708D',
	buttonSecondaryDangerDisabled: '#7A3644',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#8FA096',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#8FA096'
};

export const colors = {
	light: {
		...light,
		backdropColor,
		overlayBackground,
		backdropOpacity: 0.3,
		attachmentLoadingOpacity: 0.7
	},
	dark: {
		...dark,
		backdropColor,
		overlayBackground,
		backdropOpacity: 0.9,
		attachmentLoadingOpacity: 0.3
	},
	black: {
		...black,
		backdropColor,
		overlayBackground,
		backdropOpacity: 0.9,
		attachmentLoadingOpacity: 0.3
	}
};

export const themes = colors;
