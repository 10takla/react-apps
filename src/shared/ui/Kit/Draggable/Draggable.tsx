import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    ReactNode, cloneElement, forwardRef, memo, useImperativeHandle, useRef,
} from 'react';
import DragSvg from 'src/shared/assets/icons/drag.svg';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './Draggable.module.scss';
import useDrag, { UseDragProps } from './useDrag';

type El = HTMLElement | undefined;

interface DraggableProps extends Omit<UseDragProps, 'elemenetRef'> {
    children: ReactNode
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<El>) => {
    const {
        children,
        onStart,
        onEnd,
        ...otherProps
    } = props;

    const childrenRef = useRef<El>();
    useImperativeHandle<El, El>(
        ref,
        () => childrenRef.current,
    );

    const userSelectStyleSave = document.body.style.userSelect;
    let zIndexStyleSave: string;

    useDrag({
        elemenetRef: childrenRef,
        onStart: () => {
            document.body.style.userSelect = 'none';
            if (childrenRef.current) {
                const zIndexStyleSave = childrenRef.current.style.zIndex;
                childrenRef.current.style.zIndex = '1000';
            }
            onStart?.();
        },
        onEnd: (trans) => {
            document.body.style.userSelect = userSelectStyleSave;
            if (childrenRef.current) {
                childrenRef.current.style.zIndex = zIndexStyleSave;
            }
            onEnd?.(trans);
        },
        ...otherProps,
    });

    return (
        cloneElement(children, {
            ref: childrenRef,
        })
    );
};

export default memo(forwardRef(Draggable));

interface DraggableItemProps extends ComponentProps<typeof HStack> {
    children: ReactNode
}

export const DraggableItem = forwardRef(
    (props: DraggableItemProps, ref: ForwardedRef<ElementRef<typeof HStack>>) => {
        const {
            children,
            ...otherProps
        } = props;

        return (
            <HStack
                className={classNames(cls.Draggable)}
                ref={ref}
                {...otherProps}
            >
                <DragSvg
                    data-drag
                />
                {children}
            </HStack>
        );
    },
);