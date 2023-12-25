import { HTMLProps, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Hide.module.scss';
import ArrowDownSvg from '@/shared/assets/icons/arrows/arrow_down.svg';
import ArrowDownUp from '@/shared/assets/icons/arrows/arrow_up.svg';

interface HideProps extends HTMLProps<HTMLDivElement>{
    className?: string;
    isHide: boolean;
}

export const Hide = memo((props: HideProps) => {
    const {
        className,
        isHide,
        ...otherProps
    } = props;
    return (
        <div
            {...otherProps}
            className={classNames(cls.Hide, {}, [className])}
        >
            {isHide ? <ArrowDownSvg /> : <ArrowDownUp />}
        </div>
    );
});
