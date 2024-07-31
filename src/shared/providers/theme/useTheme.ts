import { useContext } from 'react';
import { Theme, oppositesThemes, themeContext } from './themeContext';

export default () => {
    const theme = useContext(themeContext);

    const pairs: [Theme, Theme] = Object.entries(oppositesThemes);

    const oppositeTheme = pairs.reduce((acc, [a, b]) => {
        if (theme === a) {
            return b;
        } if (theme === b) {
            return a;
        }
        return acc;
    }, undefined as Theme | undefined);

    return [theme, oppositeTheme];
};
