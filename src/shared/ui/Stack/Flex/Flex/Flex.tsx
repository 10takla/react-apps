import {
    ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef,
} from 'react';
import { classNames, Mods } from "S/lib/classNames/classNames";
import cls from './Flex.module.scss';

export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
    around: cls.justifyAround,
    evenly: cls.justifyEvenly,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};
export type FlexProps<T = ElementType> = {
    className?: string;
    children?: React.ReactNode;
    justify?: keyof typeof justifyClasses;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
    tag?: T;
} & ComponentPropsWithoutRef<T>;

const Flex = <T extends ElementType = 'div'>(
    props: FlexProps<T>,
    ref: ForwardedRef<HTMLElement | undefined>,
) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'stretch',
        direction = 'row',
        gap,
        tag: Tag = 'div',
        max,
        ...otherProps
    } = props;
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <Tag
            {...otherProps}
            className={classNames(cls.Flex, mods, classes)}
            ref={ref}
        >
            {children}
        </Tag>
    );
};
export default forwardRef(Flex);
