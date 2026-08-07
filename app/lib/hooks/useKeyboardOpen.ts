import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { isIOS } from '../methods/helpers';

/**
 * True while the software keyboard is on screen.
 *
 * Used by the chrome that has to get out of its way — the floating dock hides, and the sheet gives
 * up the clearance it was keeping for it. iOS gets the `will` events so the chrome moves on the
 * same frame as the keyboard rather than a beat behind it.
 */
export const useKeyboardOpen = (): boolean => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const show = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow', () => setOpen(true));
		const hide = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide', () => setOpen(false));
		return () => {
			show.remove();
			hide.remove();
		};
	}, []);

	return open;
};
