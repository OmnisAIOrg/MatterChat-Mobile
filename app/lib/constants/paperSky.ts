import { type TSupportedThemes } from '../../theme';

// Paper & Sky (PAPER-AND-SKY-GUIDE.md): "If you read it, it's paper. If it frames
// what you read, it's glass." These are the sky layers and glass-chrome fills for
// the two Paper & Sky themes; every other theme ignores them.

export const isPaperSky = (theme: TSupportedThemes): boolean => theme === 'paper' || theme === 'glass';

interface ISkySpec {
	// vertical sky gradient, top → horizon (gallery §8a "Paper chats")
	colors: string[];
	locations: number[];
	// sun-flare wash from the top and darkened-horizon vignette at the bottom
	flare: string;
	vignette: string;
}

export const sky: Record<'paper' | 'glass', ISkySpec> = {
	paper: {
		colors: ['#7ECD97', '#3F9C62', '#1D7141', '#0C4A27'],
		locations: [0, 0.38, 0.74, 1],
		flare: 'rgba(255, 255, 255, 0.5)',
		vignette: 'rgba(3, 24, 12, 0.6)'
	},
	glass: {
		colors: ['#375A41', '#1E3B27', '#0F2517', '#07140A'],
		locations: [0, 0.38, 0.74, 1],
		flare: 'rgba(255, 255, 255, 0.12)',
		vignette: 'rgba(0, 0, 0, 0.5)'
	}
};

// Smoked-glass chrome (search fields, date pills, tab bars) — translucent green
// gradient with a white rim. True backdrop blur needs a native blur module; these
// fills are the blur-less approximation from the gallery recipes.
export const glassChrome = {
	fillTop: 'rgba(24, 54, 32, 0.40)',
	fillBottom: 'rgba(8, 24, 14, 0.48)',
	rim: 'rgba(255, 255, 255, 0.20)'
};

// Warm shadow under paper cards (card recipe: 0 10px 26px sky-shadow @ .30)
export const paperShadow = {
	shadowColor: '#061A0E',
	shadowOpacity: 0.25,
	shadowRadius: 10,
	shadowOffset: { width: 0, height: 6 },
	elevation: 4
};
