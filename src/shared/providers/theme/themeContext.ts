import { createContext } from 'react';

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export const oppositesThemes = {
    [Theme.Light]: Theme.Dark,
};

export const themeContext = createContext<Theme>(Theme.Light);
