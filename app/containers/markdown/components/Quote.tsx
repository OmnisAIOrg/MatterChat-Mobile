import { useContext } from 'react';
import { View } from 'react-native';
import { type Quote as QuoteProps } from '@rocket.chat/message-parser';

import { themes } from '../../../lib/constants/colors';
import { useTheme } from '../../../theme';
import MarkdownContext from '../contexts/MarkdownContext';
import styles from '../styles';
import Paragraph from './Paragraph';

interface IQuoteProps {
	value: QuoteProps['value'];
}

const Quote = ({ value }: IQuoteProps) => {
	const { theme } = useTheme();
	const context = useContext(MarkdownContext);
	const quoteContextValue = {
		...context,
		textStyle: [context.textStyle, { color: themes[theme].fontSecondaryInfo }]
	};
	return (
		<View style={styles.container}>
			<View style={[styles.quote, { backgroundColor: themes[theme].strokeLight }]} />
			<View style={styles.childContainer}>
				<MarkdownContext.Provider value={quoteContextValue}>
					{value.map(item => (
						<Paragraph value={item.value} />
					))}
				</MarkdownContext.Provider>
			</View>
		</View>
	);
};

export default Quote;
