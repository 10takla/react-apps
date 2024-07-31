import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from "S/lib/classNames/classNames";
import cls from './Words.module.scss';
import { Word, WordProps } from './ui/Word/Word';

interface WordsProps {
    className?: string;
}

export const Words = memo((props: WordsProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();

    const words: WordProps[] = [];

    return (
        <div className={classNames(cls.Words, {}, [className])}>
            {words.map((word) => (
                <Word {...word} />
            ))}
            <Word />
        </div>
    );
});
