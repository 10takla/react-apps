import {
    ForwardedRef,
    ReactElement, cloneElement, forwardRef, memo, useImperativeHandle, useRef,
    useEffect,
} from 'react';
import useDrag, { UseDragProps } from '../hooks/useDrag';

interface DraggableWrapperProps extends Omit<UseDragProps, 'childRef'> {
    children: ReactElement
    dragRef: ForwardedRef<HTMLElement>
}

const DraggableWrapper = (props: DraggableWrapperProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        children,
        dragRef,
        ...otherProps
    } = props;
    const childRef = useRef<HTMLElement>();
    const attr = 'div';
    useImperativeHandle<HTMLElement | undefined, HTMLElement | undefined>(
        ref,
        () => {
            return childRef.current;
        },
    );

    useImperativeHandle<HTMLElement | undefined, HTMLElement | undefined>(
        dragRef,
        () => {
            const el = childRef.current?.querySelector(attr);
            if (el) {
                return el;
            }
            return childRef.current;
        },
    );

    const { toStart } = useDrag({
        childRef,
        ...otherProps,
    });

    useEffect(() => {
        if (childRef.current) {
            const f = (e: React.MouseEvent) => {
                toStart(e);
            };
            const el = childRef.current.querySelector(attr);
            if (el) {
                el.addEventListener('mousedown', f);
                return () => {
                    el.removeEventListener('mousedown', f);
                };
            }
            childRef.current.addEventListener('mousedown', f);
            return () => {
                childRef.current?.removeEventListener('mousedown', f);
            };
        }
    }, [toStart]);

    return cloneElement(children, {
        ref: childRef,
    });
};

export default memo(forwardRef(DraggableWrapper));
