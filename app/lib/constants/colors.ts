// MatterChat reskin — ensō-green design language.
// Same semantic keys as upstream; values re-derived from the MatterChat palette:
// brand green #2FA44A (primary) / #148B3B (deep, text-safe on light), one accent red
// #E1053C reserved for destructive/mention, warm greenish neutrals throughout (no blue-greys).
// Three themes: light / dark ("dim" #161D18) / black (OLED #0B0F0C).

const backdropColor = '#000000';
const overlayBackground = 'rgba(22, 33, 26, 0.65)';

const light = {
	surfaceLight: '#FDFDFC',
	surfaceTint: '#F6F7F5',
	surfaceRoom: '#FDFDFC',
	surfaceNeutral: '#ECEFEB',
	surfaceDisabled: '#F6F7F5',
	surfaceHover: '#F2F4F1',
	surfaceSelected: '#F2FAF3',
	surfaceDark: '#16211A',
	surfaceFeatured: '#148B3B',
	surfaceFeaturedHover: '#0F6B2E',

	strokeExtraLight: '#EAEFEA',
	strokeLight: '#E1E7E1',
	strokeMedium: '#A9B5AC',
	strokeDark: '#5C6B61',
	strokeExtraDark: '#26312A',
	strokeExtraLightHighlight: '#D7F0DC',
	strokeHighlight: '#2FA44A',
	strokeExtraLightError: '#FBD3DC',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#C3CCC5',
	fontAnnotation: '#8FA096',
	fontHint: '#8FA096',
	fontSecondaryInfo: '#5C6B61',
	fontDefault: '#26312A',
	fontTitlesLabels: '#16211A',
	fontInfo: '#148B3B',
	fontDanger: '#C21038',
	fontPureBlack: '#16211A',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#EAF6EC',
	statusBackgroundSuccess: '#DBF3E6',
	statusBackgroundDanger: '#FBD3DC',
	statusBackgroundWarning: '#FBF1E6',
	statusBackgroundWarning2: '#FDF7E7',
	statusBackgroundService: '#F8E3D2',
	statusBackgroundService2: '#EDD0F7',
	statusFontInfo: '#148B3B',
	statusFontSuccess: '#0F6B2E',
	statusFontDanger: '#B00D30',
	statusFontWarning: '#B0611E',
	statusFontWarning2: '#26312A',
	statusFontService: '#974809',
	statusFontService2: '#7F1B9F',

	badgeBackgroundLevel1: '#7A8880',
	badgeBackgroundLevel2: '#2FA44A',
	badgeBackgroundLevel3: '#E09425',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#2FA44A',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#8FA096',
	userPresenceDisabled: '#E09425',

	buttonBackgroundPrimaryDefault: '#2FA44A',
	buttonBackgroundPrimaryPress: '#148B3B',
	buttonBackgroundPrimaryDisabled: '#ECEFEB',

	buttonBackgroundSecondaryDefault: '#ECEFEB',
	buttonBackgroundSecondaryPress: '#D8DFD9',
	buttonBackgroundSecondaryDisabled: '#F1F4F0',

	buttonBackgroundSecondaryDangerDefault: '#ECEFEB',
	buttonBackgroundSecondaryDangerPress: '#D8DFD9',
	buttonBackgroundSecondaryDangerDisabled: '#F1F4F0',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#FBD3DC',

	buttonBackgroundSuccessDefault: '#148B3B',
	buttonBackgroundSuccessPress: '#0F6B2E',
	buttonBackgroundSuccessDisabled: '#DBF3E6',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#A6B2A8',
	buttonFontSecondary: '#16211A',
	buttonSecondaryDisabled: '#A6B2A8',
	buttonFontSecondaryDanger: '#B00D30',
	buttonSecondaryDangerDisabled: '#E9AABB',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#FFFFFF',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#FFFFFF'
};

const dark = {
	surfaceLight: '#161D18',
	surfaceTint: '#1B231D',
	surfaceRoom: '#121814',
	surfaceNeutral: '#222B24',
	surfaceDisabled: '#1B231D',
	surfaceHover: '#1A211C',
	surfaceSelected: '#17281C',
	surfaceDark: '#EDF2EE',
	surfaceFeatured: '#148B3B',
	surfaceFeaturedHover: '#0F6B2E',

	strokeExtraLight: '#222B24',
	strokeLight: '#26302A',
	strokeMedium: '#3A463E',
	strokeDark: '#75857A',
	strokeExtraDark: '#D5DED7',
	strokeExtraLightHighlight: '#1F3A28',
	strokeHighlight: '#34B457',
	strokeExtraLightError: '#55232C',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#57645B',
	fontAnnotation: '#8FA096',
	fontHint: '#75857A',
	fontSecondaryInfo: '#8FA096',
	fontDefault: '#D5DED7',
	fontTitlesLabels: '#EDF2EE',
	fontInfo: '#48C46A',
	fontDanger: '#F0708D',
	fontPureBlack: '#16211A',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#1F3A28',
	statusBackgroundSuccess: '#1F3A28',
	statusBackgroundDanger: '#3D1620',
	statusBackgroundWarning: '#3A2C14',
	statusBackgroundWarning2: '#33290F',
	statusBackgroundService: '#3A2414',
	statusBackgroundService2: '#3A1E44',
	statusFontInfo: '#48C46A',
	statusFontSuccess: '#48C46A',
	statusFontDanger: '#F0708D',
	statusFontWarning: '#E8B931',
	statusFontWarning2: '#EDF2EE',
	statusFontService: '#DE9A66',
	statusFontService2: '#C393D2',

	badgeBackgroundLevel1: '#4A564E',
	badgeBackgroundLevel2: '#2FA44A',
	badgeBackgroundLevel3: '#B87F1F',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#34B457',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#75857A',
	userPresenceDisabled: '#B87F1F',

	buttonBackgroundPrimaryDefault: '#2FA44A',
	buttonBackgroundPrimaryPress: '#148B3B',
	buttonBackgroundPrimaryDisabled: '#1F3A28',

	buttonBackgroundSecondaryDefault: '#222B24',
	buttonBackgroundSecondaryPress: '#2C3830',
	buttonBackgroundSecondaryDisabled: '#1B231D',

	buttonBackgroundSecondaryDangerDefault: '#222B24',
	buttonBackgroundSecondaryDangerPress: '#2C3830',
	buttonBackgroundSecondaryDangerDisabled: '#1B231D',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#3D1620',

	buttonBackgroundSuccessDefault: '#148B3B',
	buttonBackgroundSuccessPress: '#0F6B2E',
	buttonBackgroundSuccessDisabled: '#1F3A28',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#57645B',
	buttonFontSecondary: '#EDF2EE',
	buttonSecondaryDisabled: '#57645B',
	buttonFontSecondaryDanger: '#F0708D',
	buttonSecondaryDangerDisabled: '#7A3644',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#8FA096',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#8FA096'
};

const black = {
	surfaceLight: '#0B0F0C',
	surfaceTint: '#101613',
	surfaceRoom: '#070A08',
	surfaceNeutral: '#141B16',
	surfaceDisabled: '#101613',
	surfaceHover: '#121812',
	surfaceSelected: '#122116',
	surfaceDark: '#EDF2EE',
	surfaceFeatured: '#148B3B',
	surfaceFeaturedHover: '#0F6B2E',

	strokeExtraLight: '#141B16',
	strokeLight: '#18211B',
	strokeMedium: '#2C3630',
	strokeDark: '#6B7A70',
	strokeExtraDark: '#D5DED7',
	strokeExtraLightHighlight: '#16301F',
	strokeHighlight: '#34B457',
	strokeExtraLightError: '#4A1D28',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#4E5A52',
	fontAnnotation: '#8FA096',
	fontHint: '#75857A',
	fontSecondaryInfo: '#8FA096',
	fontDefault: '#D5DED7',
	fontTitlesLabels: '#EDF2EE',
	fontInfo: '#48C46A',
	fontDanger: '#F0708D',
	fontPureBlack: '#16211A',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#16301F',
	statusBackgroundSuccess: '#16301F',
	statusBackgroundDanger: '#361119',
	statusBackgroundWarning: '#33260F',
	statusBackgroundWarning2: '#2C230B',
	statusBackgroundService: '#331F10',
	statusBackgroundService2: '#33193C',
	statusFontInfo: '#48C46A',
	statusFontSuccess: '#48C46A',
	statusFontDanger: '#F0708D',
	statusFontWarning: '#E8B931',
	statusFontWarning2: '#EDF2EE',
	statusFontService: '#DE9A66',
	statusFontService2: '#C393D2',

	badgeBackgroundLevel1: '#4A564E',
	badgeBackgroundLevel2: '#2FA44A',
	badgeBackgroundLevel3: '#B87F1F',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#34B457',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#6B7A70',
	userPresenceDisabled: '#B87F1F',

	buttonBackgroundPrimaryDefault: '#2FA44A',
	buttonBackgroundPrimaryPress: '#148B3B',
	buttonBackgroundPrimaryDisabled: '#16301F',

	buttonBackgroundSecondaryDefault: '#141B16',
	buttonBackgroundSecondaryPress: '#1E2620',
	buttonBackgroundSecondaryDisabled: '#101613',

	buttonBackgroundSecondaryDangerDefault: '#141B16',
	buttonBackgroundSecondaryDangerPress: '#1E2620',
	buttonBackgroundSecondaryDangerDisabled: '#101613',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#361119',

	buttonBackgroundSuccessDefault: '#148B3B',
	buttonBackgroundSuccessPress: '#0F6B2E',
	buttonBackgroundSuccessDisabled: '#16301F',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#4E5A52',
	buttonFontSecondary: '#EDF2EE',
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
