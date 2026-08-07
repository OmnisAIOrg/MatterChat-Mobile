/**
 * Home has no navigation header on any layout now — it draws its own chrome (sky hero, glass
 * search, glass chips), and on tablet the master pane shows the same thing. Kept as a no-op so
 * the master-detail layout keeps its slot without a conditional in the screen body.
 */
const TabletHeader = () => null;

export default TabletHeader;
