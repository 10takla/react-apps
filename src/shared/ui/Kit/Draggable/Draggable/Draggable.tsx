import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    forwardRef,
    memo,
    ReactElement,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import DragSvg from '@/shared/assets/icons/drag.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../Stack';
import useDrag, { UseDragProps } from '../hooks/useDrag';
import cls from './Draggable.module.scss';

export interface DraggableProps extends
    Omit<ComponentProps<typeof HStack>, 'translate'> {
    className?: string;
    children: ReactElement;
    dragProps: Omit<UseDragProps, 'child'>
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        className,
        children,
        dragProps,
        onEnd,
        ...otherProps
    } = props;
    const hStackRef = useRef<ElementRef<typeof HStack>>();
    useImperativeHandle<ElementRef<typeof HStack>, ElementRef<typeof HStack>>(ref, () => hStackRef.current);

    const [isMove, setIsMove] = useState(false);

    const { toStart } = useDrag({
        ...dragProps,
        childRef: hStackRef,
        onStart: () => {
            setIsMove(true);
        },
        onTranslate: (trans) => {
        },
        onEnd: () => {
            setIsMove(false);
            onEnd?.();
        },
    });

    return (
        <HStack
            className={classNames(cls.Draggable, { [cls.moving]: isMove }, [className])}
            ref={hStackRef}
            align="center"
            gap={4}
            {...otherProps}
        >
            <DragSvg
                className={cls.dragSvg}
                onMouseDown={(e) => {
                    toStart(e);
                }}
            />
            {children}
        </HStack>
    );
};
export default memo(forwardRef(Draggable));
