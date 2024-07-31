import React, { memo } from 'react';
import { Button, ButtonTheme } from "S/ui/Kit/Button";
import { classNames } from "S/lib/classNames/classNames";
import LightIcon from "S/assets/icons/theme-light.svg";
import DarkIcon from "S/assets/icons/theme-dark.svg";
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
