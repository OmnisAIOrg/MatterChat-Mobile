/**
 * Paper & Sky — the design system.
 *
 *   If you read it, it's paper. If it frames what you read, it's glass.
 *
 * Three materials, no exceptions:
 *   • Sky   — a full-bleed layered green gradient that fills the window and is never covered
 *             edge to edge. It is state-driven (see `SKY`): the background is data.
 *   • Glass — chrome only. Nav headers sit transparent on the sky; search fields, filter chips,
 *             the floating tab dock and the composer dock are smoked glass.
 *   • Paper — ONE unified warm-cream sheet per screen holding all content as hairline-divided
 *             rows. Never multiple floating cards.
 *
 * Every value here is lifted verbatim from the design gallery (`MatterChat iOS Reskin.dc.html`,
 * section 8a) so the app and the drawings can be diffed pixel for pixel.
 *
 * This is a LEAF module: it imports nothing. An earlier reskin put a shared constant in a
 * non-leaf module, the import cycle made it `undefined` at module-eval time, and the whole frame
 * silently fell back to a neutral colour. Keep it leaf.
 */

/** Content surfaces. Warm cream — never white, never blue-grey. */
export const paper = {
	/** the screen's content sheet */
	sheet: '#FAF5EA',
	/** highlight rows: unread, assistant/Chi, briefings, selected */
	green: '#EAF2E6',
	/** brighter sheet head — deadline banners, the top row of a sheet */
	bright: '#FFFDF6',
	/** inner slabs: quotes, file cards, inputs */
	tint: '#F0E7D2',
	tintBorder: '#E4D8BC',
	/** your own message rows */
	own: '#F3EDDE',
	ownBadge: '#E2D8BE',

	ink: '#2C2A21',
	inkBody: '#3B382E',
	inkQuiet: '#4A463A',
	inkSoft: '#6B675A',
	inkFaint: '#8A8471',
	timestamp: '#A39C86',
	chevron: '#C9C2AC',

	/** row dividers; the tighter one is used inside conversations */
	hairline: '#E4D9C0',
	hairlineSoft: '#EBE3D1',
	/** borders of paperGreen bands */
	hairlineGreen: '#DCE8D6',
	/** outline buttons on paper */
	outline: '#D8CDAF',

	/** buttons, names, counts, links, icons, toggles */
	accent: '#175F35',
	accentSoft: '#E7F0E4',
	/** quote slab on a green row */
	quoteGreen: '#DEEBD8',
	quoteGreenBorder: '#C9DCC1',

	presence: '#2FA44A',
	warn: '#B0611E',
	danger: '#B3402E',

	/** the inset top rim that makes a sheet read as lit from above */
	rim: '#FFFEFA',
	/** the edge that separates paper from sky — a lit rim all the way round the sheet */
	edge: 'rgba(255,255,255,0.72)'
} as const;

/** Paper inverted for night mode. Warm, never neutral grey. */
export const paperNight = {
	sheet: '#26241D',
	green: '#1E2A1E',
	bright: '#2E2B23',
	tint: '#312D24',
	tintBorder: '#3F3A2E',
	own: '#2A281F',
	ownBadge: '#3A372C',

	ink: '#EDE8DA',
	inkBody: '#DCD6C6',
	inkQuiet: '#CFC8B6',
	inkSoft: '#A39C86',
	inkFaint: '#8A8471',
	timestamp: '#7C7565',
	chevron: '#5E5849',

	hairline: '#3A372C',
	hairlineSoft: '#332F26',
	hairlineGreen: '#33452F',
	outline: '#4A4436',

	accent: '#5FC77F',
	accentSoft: '#20321F',
	quoteGreen: '#243021',
	quoteGreenBorder: '#33452F',

	presence: '#2FA44A',
	warn: '#D08A3E',
	danger: '#E0715C',

	rim: 'rgba(255,255,255,0.07)',
	edge: 'rgba(255,255,255,0.10)'
} as const;

export type TPaper = typeof paper;

/** On-sky content: white with a soft cast so it survives the pale top of the gradient. */
export const onSky = {
	primary: '#FFFFFF',
	shadow: 'rgba(10,40,20,0.35)',
	/** the green that reads on a dark sky — presence dots, voice captions, glass chips */
	spring: '#8FE3A5'
} as const;

/**
 * Glass — chrome only.
 *
 * `blur` values are expo-blur `intensity` (0-100), tuned so the real UIVisualEffectView blur
 * shows through the tint rather than being swamped by it. The gallery's CSS alphas are for a
 * browser with no live blur underneath; on iOS the same alpha over a real blur reads far heavier,
 * so the tints below are the gallery values relaxed by ~0.18 with the blur making up the density.
 */
export const glass = {
	/** clear circle buttons, quick actions */
	clear: {
		fill: 'rgba(255,255,255,0.16)',
		border: 'rgba(255,255,255,0.38)',
		rim: 'rgba(255,255,255,0.42)',
		blur: 30
	},
	/** search fields, "To:" fields — a dark smoked pane */
	field: {
		from: 'rgba(24,54,32,0.30)',
		to: 'rgba(8,24,14,0.38)',
		border: 'rgba(255,255,255,0.30)',
		rim: 'rgba(255,255,255,0.22)',
		blur: 34
	},
	/** the floating tab dock and the composer dock */
	dock: {
		from: 'rgba(14,34,21,0.74)',
		to: 'rgba(5,16,10,0.84)',
		border: 'rgba(255,255,255,0.42)',
		rim: 'rgba(255,255,255,0.34)',
		blur: 46
	},
	/** green glass — Chi suggestion chips on the night sky */
	spring: {
		fill: 'rgba(72,196,106,0.16)',
		border: 'rgba(143,227,165,0.40)',
		blur: 30
	}
} as const;

/** The Chi orb's depth recipe — a lit sphere, not a flat circle. */
export const orb = {
	base: '#1E8A44',
	specularFrom: 'rgba(255,255,255,0.55)',
	border: 'rgba(255,255,255,0.65)',
	shadowColor: 'rgba(4,18,10,1)'
} as const;

export type TSkyState = 'clear' | 'day' | 'dusk' | 'night';

export interface ISky {
	/** vertical ground, top → bottom */
	stops: string[];
	locations: number[];
	/** sun flare: a soft radial hung off the top edge */
	flare: { color: string; x: number; y: number; rx: number; ry: number };
	/** horizon vignette: the dark radial that anchors the bottom */
	vignette: { color: string; x: number; y: number; rx: number; ry: number };
	/** the colour a paper sheet casts onto the sky beneath it */
	sheetShadow: string;
	/** true when the sky is dark enough that chrome must brighten */
	dark: boolean;
}

/**
 * The living sky. Four states, driven entirely by data the app already has — no new endpoints.
 *
 *   clear — caught up, no deadline inside 48h
 *   day   — the default; unreads present
 *   dusk  — a CasePro filing/SOL deadline inside 24h
 *   night — voice mode and Do-Not-Disturb
 *
 * Radial geometry is in fractions of the screen box (x/y = centre, rx/ry = radii), matching the
 * gallery's `radial-gradient(<rx> <ry> at <x> <y>, …)` percentages.
 */
export const SKY: Record<TSkyState, ISky> = {
	clear: {
		stops: ['#9CDCAE', '#57B377', '#27874E', '#0E5530'],
		locations: [0, 0.32, 0.62, 1],
		flare: { color: 'rgba(255,255,255,0.70)', x: 0.64, y: -0.06, rx: 0.58, ry: 0.36 },
		vignette: { color: 'rgba(3,26,13,0.65)', x: 0.5, y: 1.18, rx: 1.3, ry: 0.55 },
		sheetShadow: 'rgba(4,20,10,0.42)',
		dark: false
	},
	day: {
		stops: ['#7ECD97', '#3F9C62', '#1D7141', '#0C4A27'],
		locations: [0, 0.38, 0.74, 1],
		flare: { color: 'rgba(255,255,255,0.62)', x: 0.78, y: -0.04, rx: 0.52, ry: 0.32 },
		vignette: { color: 'rgba(3,24,12,0.66)', x: 0.5, y: 1.18, rx: 1.3, ry: 0.55 },
		sheetShadow: 'rgba(4,20,10,0.42)',
		dark: false
	},
	dusk: {
		stops: ['#57B378', '#2A7F4B', '#14562F', '#0C4224'],
		locations: [0, 0.36, 0.74, 1],
		flare: { color: 'rgba(255,214,150,0.34)', x: 0.72, y: -0.05, rx: 0.56, ry: 0.34 },
		vignette: { color: 'rgba(2,18,9,0.72)', x: 0.5, y: 1.16, rx: 1.3, ry: 0.58 },
		sheetShadow: 'rgba(2,16,8,0.5)',
		dark: false
	},
	night: {
		stops: ['#10281A', '#0A1C12', '#040D08', '#030905'],
		locations: [0, 0.45, 0.82, 1],
		flare: { color: 'rgba(120,220,150,0.28)', x: 0.5, y: -0.08, rx: 0.6, ry: 0.4 },
		vignette: { color: 'rgba(0,0,0,0.45)', x: 0.5, y: 1.2, rx: 1.3, ry: 0.5 },
		sheetShadow: 'rgba(0,0,0,0.5)',
		dark: true
	}
};

/**
 * The frame colour used by anything that has to paint a single flat green before the sky can
 * mount (the native launch background, the status-bar fallback). It is the sky's mid-tone, so a
 * flash of it never reads as a different app.
 */
export const FRAME_GREEN = '#2A9645';

/**
 * Sheet geometry. One recipe, used by every paper surface.
 *
 * `border` and `divider` are deliberately a full point rather than a hairline: at 3x a 0.33pt rule
 * disappears into the cream and every edge in the app goes soft. A real line is what stops the
 * design reading flat.
 */
export const sheet = {
	radius: 26,
	radiusSmall: 22,
	rowPaddingV: 12,
	rowPaddingH: 16,
	border: 1.5,
	divider: 1,
	/** glass panes carry a heavier edge than paper — they have no shadow of their own to define them */
	glassBorder: 1.5,
	glassRim: 2
} as const;

/** Corner radii are symmetric everywhere — no speech-tail bubbles. */
export const radii = {
	avatar: (size: number) => Math.round(size * 0.31),
	pill: 999,
	chip: 12,
	button: 10,
	field: 14
} as const;
