// MatterChat design tokens — PAPER & SKY.
//
// The light theme *is* paper: warm cream (#FAF5EA sheet · #FFFDF6 bright · #F0E7D2 slab ·
// #F3EDDE own · #EAF2E6 "needs you / from Chi"), ink #2C2A21 through #8A8471, hairline #E9E1CE,
// and one accent — ensō green #175F35 — carrying buttons, names, counts, links and toggles.
// Amber #B0611E is deadlines only; red #B3402E is destructive only. Keeping that mapping strict
// is what makes colour readable at a glance in a room full of legal traffic.
//
// The chrome that frames paper is not in this file: it is glass over the living sky, and those
// recipes live in `paperSky.ts`. Dark/black themes stay forest so the sky still belongs to them.

// Re-exported so the many call sites that already import it from here keep working; the value
// itself lives in `paperSky.ts` alongside the sky it is the mid-tone of.
export { FRAME_GREEN } from './paperSky';

const backdropColor = '#000000';
const overlayBackground = 'rgba(22, 33, 26, 0.65)';

const light = {
	surfaceLight: '#FFFDF6',
	surfaceTint: '#F0E7D2',
	surfaceRoom: '#FAF5EA',
	surfaceNeutral: '#EAE1CB',
	surfaceDisabled: '#F0E7D2',
	surfaceHover: '#F3EDDE',
	surfaceSelected: '#EAF2E6',
	surfaceDark: '#2C2A21',
	surfaceFeatured: '#175F35',
	surfaceFeaturedHover: '#0F4A28',

	strokeExtraLight: '#E4D9C0',
	strokeLight: '#E4D8BC',
	strokeMedium: '#C9C2AC',
	strokeDark: '#8A8471',
	strokeExtraDark: '#2C2A21',
	strokeExtraLightHighlight: '#DCE8D6',
	strokeHighlight: '#175F35',
	strokeExtraLightError: '#EFD5CE',
	strokeError: '#B3402E',

	fontWhite: '#FFFFFF',
	fontDisabled: '#C9C2AC',
	fontAnnotation: '#8A8471',
	fontHint: '#8A8471',
	fontSecondaryInfo: '#6B675A',
	fontDefault: '#3B382E',
	fontTitlesLabels: '#2C2A21',
	fontInfo: '#175F35',
	fontDanger: '#B3402E',
	fontPureBlack: '#2C2A21',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#EAF2E6',
	statusBackgroundSuccess: '#E4F0DF',
	statusBackgroundDanger: '#F6DED8',
	statusBackgroundWarning: '#F7E9D6',
	statusBackgroundWarning2: '#FBF2E0',
	statusBackgroundService: '#F5E4D3',
	statusBackgroundService2: '#EDD0F7',
	statusFontInfo: '#175F35',
	statusFontSuccess: '#175F35',
	statusFontDanger: '#B3402E',
	statusFontWarning: '#B0611E',
	statusFontWarning2: '#4A463A',
	statusFontService: '#974809',
	statusFontService2: '#7F1B9F',

	badgeBackgroundLevel1: '#8A8471',
	badgeBackgroundLevel2: '#175F35',
	badgeBackgroundLevel3: '#B0611E',
	badgeBackgroundLevel4: '#B3402E',

	userPresenceOnline: '#2FA44A',
	userPresenceBusy: '#B3402E',
	userPresenceAway: '#D9A62E',
	userPresenceOffline: '#A39C86',
	userPresenceDisabled: '#E09425',

	buttonBackgroundPrimaryDefault: '#175F35',
	buttonBackgroundPrimaryPress: '#0F4A28',
	buttonBackgroundPrimaryDisabled: '#DCE8D6',

	buttonBackgroundSecondaryDefault: '#F0E7D2',
	buttonBackgroundSecondaryPress: '#E4D8BC',
	buttonBackgroundSecondaryDisabled: '#F3EDDE',

	buttonBackgroundSecondaryDangerDefault: '#F3EDDE',
	buttonBackgroundSecondaryDangerPress: '#E4D8BC',
	buttonBackgroundSecondaryDangerDisabled: '#F6F1E4',

	buttonBackgroundDangerDefault: '#B3402E',
	buttonBackgroundDangerPress: '#943324',
	buttonBackgroundDangerDisabled: '#F0D9D3',

	buttonBackgroundSuccessDefault: '#175F35',
	buttonBackgroundSuccessPress: '#0F4A28',
	buttonBackgroundSuccessDisabled: '#DCE8D6',

	buttonFontPrimary: '#FAF5EA',
	buttonPrimaryDisabled: '#A39C86',
	buttonFontSecondary: '#2C2A21',
	buttonSecondaryDisabled: '#A39C86',
	buttonFontSecondaryDanger: '#B3402E',
	buttonSecondaryDangerDisabled: '#D8AFA6',
	buttonFontDanger: '#FAF5EA',
	buttonDangerDisabled: '#FFFFFF',
	buttonFontSuccess: '#FAF5EA',
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
