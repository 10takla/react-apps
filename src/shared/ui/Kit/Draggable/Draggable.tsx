import {
    ForwardedRef,
    ReactElement,
    cloneElement, forwardRef, memo,
    useState,
    useRef,
    useEffect,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import useDrag, { UseDragProps } from "S/lib/hooks/useDrag/useDrag";
import cls from './Draggable.module.scss';
import { logDOM } from '@storybook/test';

type El = HTMLElement | null;

interface DraggableProps extends Omit<UseDragProps, 'elemenetRef' | 'boundsRectRef'> {
    children: ReactElement
    className?: string
    boundsRectRef?: UseDragProps['boundsRectRef'] | boolean
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<El>) => {
    const {
        className,
        children,
        onStart,
        onEnd,
        boundsRectRef: boundsRect = false,
        ...otherProps
    } = props;
    const childrenRef = useRef<El>(null);

    const [isDragged, setIsDragged] = useState(false);
    const userSelectStyleSave = document.body.style.userSelect;

    const boundsRectRef = useRef<Required<UseDragProps>['boundsRectRef']['current']>(null);
    useEffect(() => {
        if (typeof boundsRect === 'boolean') {
            if (boundsRect) {
                boundsRectRef.current = childrenRef.current?.parentElement
            }
        } else {
            boundsRectRef.current = boundsRect.current
        }
    }, [boundsRect]);

    useDrag({
        elemenetRef: childrenRef,
        onStart: () => {
            document.body.style.userSelect = 'none';
            setIsDragged(true);
            onStart?.();
        },
        onEnd: (trans) => {
            document.body.style.userSelect = userSelectStyleSave;
            setIsDragged(false);
            onEnd?.(trans);
        },
        boundsRectRef: boundsRectRef,
        ...otherProps,
    });

    return (
        cloneElement(children, {
            ref: (el: El) => {
                if (el) {
                    childrenRef.current = el;
                    if (typeof ref === 'function') {
                        ref(el);
                    } else if (ref) {
                        ref.current = el
                    }
                }
            },
            className: classNames(
                cls.Draggable,
                { [cls.isDragged]: isDragged },
                [children.props.className, className],
            ),
        })
    );
};

export default memo(forwardRef(Draggable));
