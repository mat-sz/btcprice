import { StyleSheet } from 'react-native';

const colors = {
    white: '#f1f1f1',
    black: '#090909',
    light: '#dddddd',
    dark: '#333333',
};

export const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 24,
        marginHorizontal: 12,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    sectionTitle: {
        fontSize: 24,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 24,
        textAlign: 'center',
    },
});

export const stylesLight = StyleSheet.create({
    background: {
        backgroundColor: colors.white,
    },
    sectionBackground: {
        backgroundColor: colors.light,
    },
    text: {
        color: colors.black,
    },
});

export const stylesDark = StyleSheet.create({
    background: {
        backgroundColor: colors.black,
    },
    sectionBackground: {
        backgroundColor: colors.dark,
    },
    text: {
        color: colors.white,
    },
});

export const accentLight = colors.dark;
export const accentDark = colors.light;