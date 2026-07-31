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

// Evergreen — a richer forest-green dark level between "dim" dark and OLED black:
// surfaces keep a visible green cast instead of fading to neutral.
const evergreen = {
	surfaceLight: '#0E1B12',
	surfaceTint: '#132417',
	surfaceRoom: '#0B160F',
	surfaceNeutral: '#182B1D',
	surfaceDisabled: '#132417',
	surfaceHover: '#152618',
	surfaceSelected: '#173420',
	surfaceDark: '#EDF2EE',
	surfaceFeatured: '#148B3B',
	surfaceFeaturedHover: '#0F6B2E',

	strokeExtraLight: '#182B1D',
	strokeLight: '#1D3122',
	strokeMedium: '#2F4636',
	strokeDark: '#6F8377',
	strokeExtraDark: '#D5DED7',
	strokeExtraLightHighlight: '#1B3D26',
	strokeHighlight: '#34B457',
	strokeExtraLightError: '#4E2029',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#516057',
	fontAnnotation: '#8FA096',
	fontHint: '#7C9184',
	fontSecondaryInfo: '#93A89A',
	fontDefault: '#D8E2DA',
	fontTitlesLabels: '#EFF5F0',
	fontInfo: '#48C46A',
	fontDanger: '#F0708D',
	fontPureBlack: '#16211A',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#1B3D26',
	statusBackgroundSuccess: '#1B3D26',
	statusBackgroundDanger: '#3B141D',
	statusBackgroundWarning: '#372A12',
	statusBackgroundWarning2: '#31270D',
	statusBackgroundService: '#372212',
	statusBackgroundService2: '#371C40',
	statusFontInfo: '#48C46A',
	statusFontSuccess: '#48C46A',
	statusFontDanger: '#F0708D',
	statusFontWarning: '#E8B931',
	statusFontWarning2: '#EFF5F0',
	statusFontService: '#DE9A66',
	statusFontService2: '#C393D2',

	badgeBackgroundLevel1: '#455449',
	badgeBackgroundLevel2: '#2FA44A',
	badgeBackgroundLevel3: '#B87F1F',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#34B457',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#E8B931',
	userPresenceOffline: '#6F8377',
	userPresenceDisabled: '#B87F1F',

	buttonBackgroundPrimaryDefault: '#2FA44A',
	buttonBackgroundPrimaryPress: '#148B3B',
	buttonBackgroundPrimaryDisabled: '#1B3D26',

	buttonBackgroundSecondaryDefault: '#182B1D',
	buttonBackgroundSecondaryPress: '#213A28',
	buttonBackgroundSecondaryDisabled: '#132417',

	buttonBackgroundSecondaryDangerDefault: '#182B1D',
	buttonBackgroundSecondaryDangerPress: '#213A28',
	buttonBackgroundSecondaryDangerDisabled: '#132417',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#3B141D',

	buttonBackgroundSuccessDefault: '#148B3B',
	buttonBackgroundSuccessPress: '#0F6B2E',
	buttonBackgroundSuccessDisabled: '#1B3D26',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#516057',
	buttonFontSecondary: '#EDF2EE',
	buttonSecondaryDisabled: '#516057',
	buttonFontSecondaryDanger: '#F0708D',
	buttonSecondaryDangerDisabled: '#7A3644',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#8FA096',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#8FA096'
};

// Paper — the "Legal" lane of the Paper & Sky system: flat cream desk, warm ink,
// clay accent, printable density. A light-level alternative to the green light theme.
const paper = {
	surfaceLight: '#FBF8F0',
	surfaceTint: '#F6F1E4',
	surfaceRoom: '#FBF8F0',
	surfaceNeutral: '#EFE9D8',
	surfaceDisabled: '#F6F1E4',
	surfaceHover: '#F3EDDE',
	surfaceSelected: '#F0EAD3',
	surfaceDark: '#2C2A21',
	surfaceFeatured: '#A85B28',
	surfaceFeaturedHover: '#8F4C20',

	strokeExtraLight: '#EDE6D2',
	strokeLight: '#E5DECB',
	strokeMedium: '#C8BFA6',
	strokeDark: '#7C7768',
	strokeExtraDark: '#3B3730',
	strokeExtraLightHighlight: '#F0DFC9',
	strokeHighlight: '#B4652F',
	strokeExtraLightError: '#F6D6DC',
	strokeError: '#E1053C',

	fontWhite: '#FFFFFF',
	fontDisabled: '#CFC7B2',
	fontAnnotation: '#8A8471',
	fontHint: '#8A8471',
	fontSecondaryInfo: '#7C7768',
	fontDefault: '#3B3730',
	fontTitlesLabels: '#2C2A21',
	fontInfo: '#A85B28',
	fontDanger: '#C21038',
	fontPureBlack: '#2C2A21',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: '#F4E6D4',
	statusBackgroundSuccess: '#E3EEDC',
	statusBackgroundDanger: '#F6D6DC',
	statusBackgroundWarning: '#F6EBD4',
	statusBackgroundWarning2: '#F9F2DD',
	statusBackgroundService: '#F3E0CE',
	statusBackgroundService2: '#EDD5F2',
	statusFontInfo: '#A85B28',
	statusFontSuccess: '#3F7A3C',
	statusFontDanger: '#B00D30',
	statusFontWarning: '#8F6224',
	statusFontWarning2: '#3B3730',
	statusFontService: '#8F4C20',
	statusFontService2: '#7F1B9F',

	badgeBackgroundLevel1: '#8A8471',
	badgeBackgroundLevel2: '#B4652F',
	badgeBackgroundLevel3: '#E09425',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#2FA44A',
	userPresenceBusy: '#E1053C',
	userPresenceAway: '#C9971C',
	userPresenceOffline: '#8A8471',
	userPresenceDisabled: '#E09425',

	buttonBackgroundPrimaryDefault: '#A85B28',
	buttonBackgroundPrimaryPress: '#8F4C20',
	buttonBackgroundPrimaryDisabled: '#EFE9D8',

	buttonBackgroundSecondaryDefault: '#EFE9D8',
	buttonBackgroundSecondaryPress: '#E0D8C2',
	buttonBackgroundSecondaryDisabled: '#F3EEE0',

	buttonBackgroundSecondaryDangerDefault: '#EFE9D8',
	buttonBackgroundSecondaryDangerPress: '#E0D8C2',
	buttonBackgroundSecondaryDangerDisabled: '#F3EEE0',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: '#F6D6DC',

	buttonBackgroundSuccessDefault: '#3F7A3C',
	buttonBackgroundSuccessPress: '#33642F',
	buttonBackgroundSuccessDisabled: '#E3EEDC',

	buttonFontPrimary: '#FFFFFF',
	buttonPrimaryDisabled: '#B3AC97',
	buttonFontSecondary: '#2C2A21',
	buttonSecondaryDisabled: '#B3AC97',
	buttonFontSecondaryDanger: '#B00D30',
	buttonSecondaryDangerDisabled: '#E9AABB',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: '#FFFFFF',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: '#FFFFFF'
};

// Glass — the sky-forward lane: warm dusk-sky depths with translucent white
// "glass" surfaces and the #FFE6CB accent that survives on translucency.
// (No backdrop blur in RN core — translucent whites over the sky base approximate it.)
const glass = {
	surfaceLight: '#42260E',
	surfaceTint: '#4C2D12',
	surfaceRoom: '#3A210C',
	surfaceNeutral: 'rgba(255, 255, 255, 0.16)',
	surfaceDisabled: '#4C2D12',
	surfaceHover: 'rgba(255, 255, 255, 0.10)',
	surfaceSelected: 'rgba(255, 255, 255, 0.20)',
	surfaceDark: '#FAF5EA',
	surfaceFeatured: 'rgba(255, 255, 255, 0.24)',
	surfaceFeaturedHover: 'rgba(255, 255, 255, 0.32)',

	strokeExtraLight: 'rgba(255, 255, 255, 0.14)',
	strokeLight: 'rgba(255, 255, 255, 0.20)',
	strokeMedium: 'rgba(255, 255, 255, 0.30)',
	strokeDark: 'rgba(255, 255, 255, 0.55)',
	strokeExtraDark: '#FAF5EA',
	strokeExtraLightHighlight: 'rgba(255, 230, 203, 0.35)',
	strokeHighlight: '#FFE6CB',
	strokeExtraLightError: 'rgba(229, 143, 128, 0.35)',
	strokeError: '#E58F80',

	fontWhite: '#FFFFFF',
	fontDisabled: 'rgba(255, 255, 255, 0.45)',
	fontAnnotation: 'rgba(255, 255, 255, 0.65)',
	fontHint: 'rgba(255, 255, 255, 0.65)',
	fontSecondaryInfo: 'rgba(255, 255, 255, 0.78)',
	fontDefault: 'rgba(255, 255, 255, 0.92)',
	fontTitlesLabels: '#FFFFFF',
	fontInfo: '#FFE6CB',
	fontDanger: '#FFC7BB',
	fontPureBlack: '#2C2A21',
	fontPureWhite: '#FFFFFF',

	statusBackgroundInfo: 'rgba(255, 230, 203, 0.22)',
	statusBackgroundSuccess: 'rgba(140, 220, 160, 0.22)',
	statusBackgroundDanger: 'rgba(229, 143, 128, 0.25)',
	statusBackgroundWarning: 'rgba(225, 164, 106, 0.25)',
	statusBackgroundWarning2: 'rgba(225, 164, 106, 0.18)',
	statusBackgroundService: 'rgba(248, 227, 210, 0.22)',
	statusBackgroundService2: 'rgba(195, 147, 210, 0.25)',
	statusFontInfo: '#FFE6CB',
	statusFontSuccess: '#BFEBC9',
	statusFontDanger: '#FFC7BB',
	statusFontWarning: '#F5CFA0',
	statusFontWarning2: '#FFFFFF',
	statusFontService: '#F5CFA0',
	statusFontService2: '#E3C1F0',

	badgeBackgroundLevel1: 'rgba(255, 255, 255, 0.35)',
	badgeBackgroundLevel2: '#D98A50',
	badgeBackgroundLevel3: '#E09425',
	badgeBackgroundLevel4: '#E1053C',

	userPresenceOnline: '#8FE3A6',
	userPresenceBusy: '#FF8F7E',
	userPresenceAway: '#F5CF6E',
	userPresenceOffline: 'rgba(255, 255, 255, 0.5)',
	userPresenceDisabled: '#E09425',

	buttonBackgroundPrimaryDefault: '#FAF5EA',
	buttonBackgroundPrimaryPress: '#EBDFC7',
	buttonBackgroundPrimaryDisabled: 'rgba(255, 255, 255, 0.18)',

	buttonBackgroundSecondaryDefault: 'rgba(255, 255, 255, 0.16)',
	buttonBackgroundSecondaryPress: 'rgba(255, 255, 255, 0.26)',
	buttonBackgroundSecondaryDisabled: 'rgba(255, 255, 255, 0.10)',

	buttonBackgroundSecondaryDangerDefault: 'rgba(255, 255, 255, 0.16)',
	buttonBackgroundSecondaryDangerPress: 'rgba(255, 255, 255, 0.26)',
	buttonBackgroundSecondaryDangerDisabled: 'rgba(255, 255, 255, 0.10)',

	buttonBackgroundDangerDefault: '#E1053C',
	buttonBackgroundDangerPress: '#B00D30',
	buttonBackgroundDangerDisabled: 'rgba(225, 5, 60, 0.3)',

	buttonBackgroundSuccessDefault: '#148B3B',
	buttonBackgroundSuccessPress: '#0F6B2E',
	buttonBackgroundSuccessDisabled: 'rgba(20, 139, 59, 0.3)',

	buttonFontPrimary: '#42260E',
	buttonPrimaryDisabled: 'rgba(255, 255, 255, 0.45)',
	buttonFontSecondary: '#FFFFFF',
	buttonSecondaryDisabled: 'rgba(255, 255, 255, 0.45)',
	buttonFontSecondaryDanger: '#FFC7BB',
	buttonSecondaryDangerDisabled: 'rgba(255, 199, 187, 0.5)',
	buttonFontDanger: '#FFFFFF',
	buttonDangerDisabled: 'rgba(255, 255, 255, 0.6)',
	buttonFontSuccess: '#FFFFFF',
	buttonSuccessDisabled: 'rgba(255, 255, 255, 0.6)'
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
	},
	evergreen: {
		...evergreen,
		backdropColor,
		overlayBackground,
		backdropOpacity: 0.9,
		attachmentLoadingOpacity: 0.3
	},
	paper: {
		...paper,
		backdropColor,
		overlayBackground,
		backdropOpacity: 0.3,
		attachmentLoadingOpacity: 0.7
	},
	glass: {
		...glass,
		backdropColor,
		overlayBackground,
		backdropOpacity: 0.9,
		attachmentLoadingOpacity: 0.3
	}
};

export const themes = colors;
