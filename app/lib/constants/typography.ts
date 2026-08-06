/**
 * MatterChat type system — mirrors the web app (app.matterchat.com).
 *
 * The web UI pairs four faces; the same families are bundled here so mobile and web
 * read as one product:
 *   • Newsreader      — serif display, incl. italic. Editorial lines ("…conversations *stay* privileged").
 *   • Space Grotesk   — screen/section headings ("Welcome back").
 *   • Inter / Inter Tight — body, inputs, controls (Inter already shipped with the app).
 *   • JetBrains Mono  — uppercase eyebrow labels with wide tracking ("SECURE SIGN-IN").
 *
 * Sizes/tracking below are taken from the live web styles so the rhythm matches.
 */
export const fontFamily = {
	serif: 'Newsreader-Regular',
	serifItalic: 'Newsreader-Italic',
	serifSemibold: 'Newsreader-SemiBold',
	display: 'SpaceGrotesk-Bold',
	displayMedium: 'SpaceGrotesk-Medium',
	mono: 'JetBrainsMono-Regular',
	monoBold: 'JetBrainsMono-Bold'
} as const;

/** Uppercase mono eyebrow — the web uses ~10.5–11px with 2–3px tracking. */
export const eyebrow = {
	fontFamily: fontFamily.mono,
	fontSize: 11,
	letterSpacing: 2,
	textTransform: 'uppercase'
} as const;

/** Screen/section heading — Space Grotesk 700. */
export const heading = {
	fontFamily: fontFamily.display,
	fontSize: 28,
	letterSpacing: -0.4
} as const;

/** Editorial serif line; pair `serifItalic` for the emphasised word. */
export const editorial = {
	fontFamily: fontFamily.serif,
	fontSize: 24,
	lineHeight: 32
} as const;

/** The web's signature gradients, reusable by LinearGradient consumers. */
export const gradients = {
	/** THE app frame green — sampled from the MatterChat app icon (#3BAB55 → #1A8335).
	 *  Used for every framing surface: onboarding ground, nav headers, tab bar. */
	brand: ['#3BAB55', '#2A9645', '#1A8335'],
	/** Deep forest — reserved for Chi's night surfaces, not the app frame. */
	forest: ['#12402C', '#0A2417', '#06170F', '#030C07'],
	/** Emerald CTA — the web's Sign in button. */
	emerald: ['#0D8F5F', '#12B981', '#17C98A'],
	/** Warm cream card. */
	cream: ['#FFFDF9', '#F6F1E8', '#F1EBDF']
} as const;
