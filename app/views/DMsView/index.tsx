import FilteredRoomsList from '../ActivityView/FilteredRoomsList';

/**
 * Reskin (Tier 2, owned): the DMs tab — direct messages only, from the existing
 * live subscriptions (t === 'd' covers 1:1 and group DMs).
 */
const dmFilter = (s: any): boolean => s.t === 'd';

const DMsView = () => (
	<FilteredRoomsList
		tab='dms'
		title='Chats'
		filter={dmFilter}
		emptyTitle='No direct messages yet'
		emptyHint='Start a conversation from the + button on Home.'
		testID='dms-view'
	/>
);

export default DMsView;
