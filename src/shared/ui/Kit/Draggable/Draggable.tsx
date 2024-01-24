import {
    ForwardedRef,
    ReactNode, cloneElement, forwardRef, memo, useImperativeHandle, useRef,
} from 'react';
import { HStack } from 'src/shared/ui/Stack';
import DragSvg from 'src/shared/assets/icons/drag.svg';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Draggable.module.scss';
import useDrag, { UseDragProps } from './useDrag';

type El = HTMLElement | undefined;

interface DraggableProps extends Omit<UseDragProps, 'elemenetRef'> {
    children: ReactNode
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<El>) => {
    const {
        children,
    } = props;

    const childrenRef = useRef<El>();
    useImperativeHandle<El, El>(
        ref,
        () => childrenRef.current,
    );

    useDrag({
        elemenetRef: childrenRef,
        step: 10,
        direction: 'y'
    });

    return (
        cloneElement(children, {
            ref: childrenRef,
        })
    );
};

export default memo(forwardRef(Draggable));

export const DraggableItem = (props: DraggableProps) => {
    const {
        children,
    } = props;

    return (
        <HStack className={classNames(cls.Draggable)}>
            <DragSvg data-drag />
            {children}
        </HStack>
    );
};
