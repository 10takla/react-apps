import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useEffect, useState, createElement, cloneElement, MutableRefObject } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Outline.module.scss';
import cloneRef from 'src/shared/lib/cloneRef';
import { elementType } from 'prop-types';
import { ConvexHull, PointDistribution } from 'rust_wasm';
import * as ch from 'convex-hull';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface OutlineProps extends ComponentProps<Component> {

}

const Outline = (props: OutlineProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        children,
        ...otherProps
    } = props;

    const outlineRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => outlineRef.current,
    );
    const childrenRef = useRef();
    useEffect(() => {
        if (childrenRef.current) {
            let points: [number, number][] = []
            childrenRef.current.children.forEach(element => {
                const domRect: DOMRect = element.getBoundingClientRect();
                points = [...points,
                [
                    domRect.x,
                    domRect.y
                ],
                [
                    domRect.x,
                    domRect.y + domRect.height
                ],
                [
                    domRect.x + domRect.width,
                    domRect.y + domRect.height
                ],
                [
                    domRect.x + domRect.width,
                    domRect.y
                ]
                ]
            });
        }
    }, [childrenRef]);

    return (
        <HStack
            className={classNames(cls.Outline, [className])}
            ref={outlineRef}
            {...otherProps}
        >
            {cloneElement(children, {
                ref: childrenRef,
            })}
            {/* <svg className={cls.outline}>
                <polygon points="50,150 150,50 250,150" />
            </svg> */}
        </HStack>
    )
};

export default memo(forwardRef(Outline));