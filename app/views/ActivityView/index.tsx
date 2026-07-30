import FilteredRoomsList from './FilteredRoomsList';

/**
 * Reskin (Tier 2, owned): the Activity tab — rooms that need your attention right now:
 * unreads, mentions, and unread threads, straight from the existing live subscriptions.
 */
const activityFilter = (s: any): boolean =>
	((s.alert || s.unread > 0) && !s.hideUnreadStatus) || s.userMentions > 0 || s.groupMentions > 0 || (s.tunread?.length ?? 0) > 0;

const ActivityView = () => (
	<FilteredRoomsList
		tab='activity'
		title='Activity'
		filter={activityFilter}
		emptyTitle='All caught up'
		emptyHint='Unreads, mentions and thread replies land here.'
		testID='activity-view'
	/>
);

export default ActivityView;
