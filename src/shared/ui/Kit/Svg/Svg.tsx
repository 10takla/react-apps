import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, Suspense } from 'react';
import { HStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './Svg.module.scss';
import React from 'react';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface SvgProps extends ComponentProps<Component> {
    path: string,
    commonPath: string,
}

const Svg = (props: SvgProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        path,
        commonPath = "/src/shared/assets/",
        ...otherProps
    } = props;

    const Icon = React.lazy(() => import(`${commonPath}/${path}.svg`));

    return (
        <Suspense>
            <Icon
                className={classNames(cls.Svg, [className])}
                ref={ref}
                {...otherProps}
            />
        </Suspense>
    )
};

export default memo(forwardRef(Svg));