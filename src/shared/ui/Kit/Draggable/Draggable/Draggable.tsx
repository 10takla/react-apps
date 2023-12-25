import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    forwardRef,
    memo,
    MutableRefObject,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Draggable.module.scss';
import DragSvg from '@/shared/assets/icons/drag.svg';
import { HStack } from '../../../Stack';
import Flex from '@/shared/ui/Stack/Flex/Flex';

interface UseDragPros {
    onMove: (e: MouseEvent) => void;
    onEnd?: () => void;
}

const useDrag = ({
    onMove,
    onEnd,
}: UseDragPros) => {
    const [userSelect, setUserSelect] = useState<string>('none');

    const clearHandler = useCallback(() => {
        document.body.style.userSelect = userSelect;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', clearHandler);
        onEnd?.();
    }, [userSelect, onMove, onEnd]);

    useEffect(() => {
        return () => {
            if (userSelect !== 'none') {
                clearHandler();
            }
        };
    }, [clearHandler, onMove, userSelect]);

    const toStart = useCallback(() => {
        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', clearHandler);
        setUserSelect(document.body.style.userSelect);
    }, [clearHandler, onMove]);
    const toEnd = useCallback(() => {
        clearHandler();
    }, [clearHandler]);
    return [toStart, toEnd];
};

export interface DraggableProps
    extends Pick<UseDragPros, 'onEnd'>,
    Omit<ComponentProps<typeof HStack>, 'translate'> {
    className?: string;
    children: ReactElement;
    rootRef?: MutableRefObject<HTMLElement>;
    onCheck?: (target: DOMRect, translate: number, root: DOMRect) => void
    translate?: number
    step?: number
    direction: ComponentProps<typeof Flex>['direciton']
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        className,
        children,
        rootRef,
        style,
        onCheck,
        onEnd,
        direction,
        step = 1,
        translate = 0,
        ...otherProps
    } = props;
    const dir = direction === 'column' ? {
        top: 'top',
        bottom: 'bottom',
        clientY: 'clientY',
        Y: 'Y',
    } : {
        top: 'left',
        bottom: 'right',
        clientY: 'clientX',
        Y: 'X',
    };

    const hStackRef = useRef<ElementRef<typeof HStack>>(null);
    const [child, setChild] = useState<DOMRect>();
    useEffect(() => {
        if (hStackRef.current) {
            setChild(hStackRef.current.getBoundingClientRect());
        }
    }, []);
    const start = useRef(0);
    const [postTranslate, setPostTranslate] = useState(0);

    useEffect(() => {
        setPostTranslate(translate);
    }, [translate]);

    const [isMove, setIsMove] = useState(false);

    const [onStart] = useDrag({
        onMove: useCallback((e: MouseEvent) => {
            let trans = e[dir.clientY] - start.current;
            trans -= trans % step;

            if (child && rootRef?.current) {
                const root = rootRef.current.getBoundingClientRect();
                if (child[dir.top] + trans < root[dir.top]) {
                    trans = root[dir.top] - child[dir.top];
                } else if (child[dir.bottom] + trans > root[dir.bottom]) {
                    trans = root[dir.bottom] - child[dir.bottom];
                }

                onCheck?.(child, trans, root);
            }
            setPostTranslate(trans);
            setIsMove(true);
        }, [child, rootRef]),
        onEnd: useCallback(() => {
            onEnd?.();
            setIsMove(false);
            setPostTranslate(0);
        }, [onEnd]),
    });

    return (
        <div
            className={classNames(cls.Draggable, {}, [className])}
            ref={ref}
        >
            <HStack
                className={classNames(cls.drag, { [cls.moving]: isMove })}
                ref={hStackRef}
                style={{
                    ...style,
                    transform: `translate${dir.Y}(${postTranslate}px)`,
                }}
                align="center"
                gap={4}
                {...otherProps}
            >
                <DragSvg
                    className={cls.dragSvg}
                    onMouseDown={(e) => {
                        start.current = e[dir.clientY] - postTranslate;
                        onStart();
                    }}
                />
                {children}
            </HStack>
        </div>
    );
};
export default memo(forwardRef(Draggable));
