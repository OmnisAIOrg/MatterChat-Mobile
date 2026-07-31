export type TThemeMode = 'automatic' | 'light' | 'dark';

export type TDarkLevel = 'black' | 'dark' | 'evergreen' | 'glass';

export type TLightLevel = 'light' | 'paper';

export interface IThemePreference {
	currentTheme: TThemeMode;
	darkLevel: TDarkLevel;
	lightLevel?: TLightLevel;
}
