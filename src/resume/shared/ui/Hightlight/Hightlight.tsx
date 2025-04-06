import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, Children, cloneElement, useMemo, useEffect, useState } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Hightlight.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface HightlightProps extends ComponentProps<Component> {
    id: string
}

const Hightlight = (props: HightlightProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        children,
        id,
        ...otherProps
    } = props;

    const hightlightRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => hightlightRef.current,
    );

    const location = useLocation();

    const isHightligt = useMemo(() => {
        return `#${id}` == decodeURIComponent(location.hash)
    }, [location]);

    useEffect(() => {
        if (hightlightRef.current && isHightligt) {
            hightlightRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [isHightligt])

    const navigate = useNavigate();
    useEffect(() => {
        const event = () => {
            navigate(location.pathname, { replace: true });
        };
        if (isHightligt) {
            window.addEventListener("mousedown", event);
        }
        return () => {
            window.removeEventListener("mousedown", event);
        }
    }, [isHightligt, navigate, location]);

    return cloneElement(
        children,
        {
            className: classNames("", { [cls.Hightlight]: isHightligt }, [className, children.props.className]),
            ref: hightlightRef,
            id,
            ...otherProps
        }
    )
};

export default memo(forwardRef(Hightlight));

type HightlightLinkElRef = ElementRef<'a'> | null;

export const HightlightLink = forwardRef((props: { id: string } & ComponentProps<'a'>, ref: ForwardedRef<HightlightLinkElRef>) => {
    const {
        className,
        children,
        id,
        ...otherProps
    } = props;

    const hightlightLinkRef = useRef<HightlightLinkElRef>(null);
    useImperativeHandle<HightlightLinkElRef, HightlightLinkElRef>(
        ref,
        () => hightlightLinkRef.current,
    );

    const location = useLocation();

    return (
        <a
            href={`#${location.pathname}#${id}`}
            ref={hightlightLinkRef}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            {...otherProps}
        >
            {children}
        </a>
    )
});