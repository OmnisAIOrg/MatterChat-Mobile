import { type SortBy, type DisplayMode } from '../lib/constants/constantDisplayMode';

export interface IPreferences {
	sortBy: SortBy;
	groupByType: boolean;
	showFavorites: boolean;
	showUnread: boolean;
	showAvatar: boolean;
	displayMode: DisplayMode;
	// reskin: Home/list header treatment — Forest (green gradient) or Classic (neutral)
	headerStyle?: 'forest' | 'classic';
}
