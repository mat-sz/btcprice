import React, { useContext } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../Styles';
import ThemedStylesContext from '../ThemedStylesContext';

const Section = ({ title, text, children }) => {
    const themedStyles = useContext(ThemedStylesContext);

    return (
        <View style={[styles.sectionContainer, themedStyles.sectionBackground]}>
            <Text style={[styles.sectionTitle, themedStyles.text]}>{title}</Text>
            {text ?
            <Text style={[styles.sectionDescription, themedStyles.text]}>
                {text}
            </Text> : null}
            {children}
        </View>
    );
};

export default Section;
