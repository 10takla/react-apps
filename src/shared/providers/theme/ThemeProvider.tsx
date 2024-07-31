import {
    memo, ReactNode,
} from 'react';
import { Theme, themeContext } from './themeContext';

interface ThemeProviderProps {
    children: ReactNode
    theme?: Theme
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        children,
        theme = Theme.Light,
    } = props;

    return (
        <themeContext.Provider value={theme}>
            {children}
        </themeContext.Provider>
    );
};

export default memo(ThemeProvider);
