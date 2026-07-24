/**
 * ChiOrbView — the Siri/ChatGPT-style Chi experience for mobile.
 *
 * Full-screen WebView hosting the SAME orb the web + desktop ship
 * (`{server}/omnis-widgets/chi-window.html`): chat, action chips, Flow dictation, settings,
 * and realtime voice (the page runs the proven WebRTC session; WKWebView supports
 * getUserMedia on iOS 14.3+). One orb codebase everywhere — orb releases reach mobile
 * instantly, no App Store review.
 *
 * Auth: the app's stored credentials are injected as `Meteor.loginToken` / `Meteor.userId`
 * into the page's localStorage BEFORE load — the exact mechanism the desktop Chi window uses
 * (same origin as the workspace, so the orb's REST calls run as the member).
 *
 * INTEGRATION (the only upstream touches, ~10 lines):
 *   1. Register the route: in the app Stack (app/stacks/InsideStack.tsx), add
 *        <Inside.Screen name='ChiOrbView' component={ChiOrbView} options={{ headerShown: false }} />
 *   2. Entry point: SidebarView — add a 'Chi' list item navigating to 'ChiOrbView'
 *      (and/or a floating ensō button on RoomsListView).
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector } from '../../lib/hooks';
import { getUserSelector } from '../../selectors/login';

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#07090c' },
	webview: { flex: 1, backgroundColor: 'transparent' }
});

const ChiOrbView = (): React.ReactElement => {
	const navigation = useNavigation();
	const server = useAppSelector(state => state.server.server);
	const user = useAppSelector(state => getUserSelector(state));

	// Same-origin auth injection — the orb reads these exactly like the desktop Chi window.
	const inject = `(function(){try{
		localStorage.setItem('Meteor.loginToken', ${JSON.stringify(user?.token || '')});
		localStorage.setItem('Meteor.userId', ${JSON.stringify(user?.id || '')});
		localStorage.setItem('chi-orb-min', '0');
	}catch(e){}})(); true;`;

	// The orb relays navigate actions (open a channel/DM) via the desktop bridge when present;
	// on mobile we surface them through postMessage → native navigation.
	const onMessage = (event: { nativeEvent: { data: string } }): void => {
		try {
			const msg = JSON.parse(event.nativeEvent.data);
			if (msg?.type === 'chi:navigate' && msg.rid) {
				// @ts-ignore upstream nav types are looser than this call
				navigation.navigate('RoomView', { rid: msg.rid, t: msg.t || 'c', name: msg.name });
			} else if (msg?.type === 'chi:close') {
				// tapping the dimmed area above the Chi sheet dismisses the screen
				if (navigation.canGoBack()) {
					navigation.goBack();
				}
			}
		} catch {
			// non-JSON messages are not ours
		}
	};

	return (
		<View style={styles.container}>
			<WebView
				style={styles.webview}
				source={{ uri: `${server}/omnis-widgets/chi-mobile.html` }}
				injectedJavaScriptBeforeContentLoaded={inject}
				onMessage={onMessage}
				allowsInlineMediaPlayback
				mediaPlaybackRequiresUserAction={false}
				// realtime voice: WKWebView getUserMedia — grant without a per-site prompt
				mediaCapturePermissionGrantType='grant'
				originWhitelist={['https://*']}
				setSupportMultipleWindows={false}
			/>
		</View>
	);
};

export default ChiOrbView;
