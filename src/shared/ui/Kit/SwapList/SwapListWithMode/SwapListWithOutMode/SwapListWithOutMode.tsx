import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    ReactNode,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    memo,
    useState,
    useEffect,
} from 'react';
import { Direction } from 'src/wordLearner/shared/lib/direction/direction';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Flex } from 'src/shared/ui/Stack';
import Draggable from 'src/shared/ui/Kit/Draggable/Draggable';
import List from 'src/shared/ui/Stack/List/List';
import Vector from 'src/shared/lib/geometry/vector';
import cls from './SwapListWithOutMode.module.scss';

type Swap = {
    toI: number
    fromI: number
}

interface SwapListWithOutModeProps<T> extends Exclude<ComponentProps<typeof Flex>, ComponentProps<typeof Draggable>> {
    children: (item: T, index: number) => ReactNode
    list: T[]
    onChange?: (newList: T[]) => void,
    onBlur?: (newList: T[]) => void,
    transalteByMode: (itemRects: DOMRect[], swap: Swap, i: number) => Vector | undefined
    getNewListByMode: (postList: T[], swap: Swap) => T[]
    dragClassesByMode: (swap: Swap, i: number) => string
    draggableProps?: ComponentProps<typeof Draggable> & {
        onStart?: (trans: Vector, i: number) => void,
        onEnd?: (trans: Vector, i: number) => void,
        onMove?: (trans: Vector, swap: Swap, i: number) => void,
    }
}

type El = ElementRef<typeof List>

const SwapListWithOutMode = <T extends string>(props: SwapListWithOutModeProps<T>, ref: ForwardedRef<El>) => {
    const {
        className,
        dragClassesByMode,
        children,
        list,
        direction,
        onChange,
        onBlur,
        transalteByMode,
        getNewListByMode,
        draggableProps = {},
        ...otherProps
    } = props;
    const {
        onStart,
        onEnd,
        onMove,
        ...otherDraggableProps
    } = draggableProps;
    const rootRef = useRef<HTMLDivElement>(null);
    useImperativeHandle<El, El>(
        ref,
        () => rootRef.current,
    );
    const itemRectsRef = useRef<Array<DOMRect>>([]);

    const [postList, setPostList] = useState(list);
    useEffect(() => {
        setPostList(list);
    }, [list]);

    const [toI, setToI] = useState<number>();
    const [fromI, setFromI] = useState<number>();
    const swap = useRef<Swap>();

    const getNewList = useCallback(() => {
        if (swap.current) {
            return getNewListByMode(postList, swap.current);
        }
        return postList;
    }, [postList, getNewListByMode]);

    const onPostEnd = useCallback((trans, i) => {
        if (swap.current) {
            setPostList(getNewList());
            onBlur?.(getNewList());
        }
        swap.current = undefined;
        setFromI(undefined);
        setToI(undefined);

        onEnd?.(trans, i);
    }, [getNewList, onBlur, onEnd]);

    const onPostMove = useCallback((trans: Vector, i: number) => {
        const currRect = itemRectsRef.current[i];

        const findIndex = itemRectsRef.current
            .findIndex((otherRect, j) => {
                if (j !== i) {
                    const dir = new Direction(direction);
                    const translate = trans[dir.get('x')];
                    const left = dir.get('left');
                    const width = dir.get('width');
                    const right = dir.get('right');

                    const topOffset = currRect[left] + translate;
                    const bottomOffset = currRect[right] + translate;

                    const preRect = itemRectsRef.current[j - 1];
                    const nextRect = itemRectsRef.current[j + 1];

                    /* если не существует сосденего элемента у текущего
                    (Например: верхнего или нижнего)
                    то берем соответвущие границы текущего элемента */
                    let [topBound, bottomBound] = [otherRect[left], otherRect[right]];
                    if (preRect) {
                        topBound = preRect[left] + preRect[width] / 2;
                    }
                    if (nextRect) {
                        bottomBound = nextRect[left] + nextRect[width] / 2;
                    }

                    /* вернуть условие смещения, если границы текущего элемента
                    нахояться между соответсвующими грацицами
                    и серединами соответсвующих соседних элементов
                    (Например: верхнего или нижнего) */
                    if (
                        (
                            topOffset > topBound
                            && topOffset < otherRect[left] + otherRect[width] / 2
                        )
                        || (
                            bottomOffset > otherRect[left] + otherRect[width] / 2
                            && bottomOffset < bottomBound
                        )
                    ) {
                        return true;
                    }
                }
            });

        if (findIndex !== -1) {
            setToI(findIndex);
            if (!swap.current || (swap.current && swap.current.fromI !== i || swap.current.toI !== findIndex)) {
                swap.current = { fromI: i, toI: findIndex };
                onChange?.(getNewList());
            }
        } else {
            if (swap.current !== undefined) {
                swap.current = undefined;
                onChange?.(getNewList());
            }
            setToI(undefined);
        }

        onMove?.(trans, itemRectsRef.current, swap.current, i);
    }, [onMove, direction, onChange, getNewList]);

    const setTranslate = useCallback((i: number) => {
        if (fromI !== undefined && toI !== undefined) {
            const t = transalteByMode(itemRectsRef.current, { fromI, toI }, i);
            if (fromI !== i && t) {
                return t;
            }
        }
        return new Vector(0, 0);
    }, [fromI, toI, transalteByMode]);
    return (
        <List
            className={classNames(cls.SwapListWithOutMode, [className])}
            ref={rootRef}
            {...{ direction, ...otherProps }}
        >
            {postList.map((item, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) {
                            itemRectsRef.current[i] = el.getBoundingClientRect();
                        }
                    }}
                >
                    <Draggable
                        {...otherDraggableProps}
                        className={dragClassesByMode({ fromI, toI }, i)}
                        rootRef={rootRef}
                        direction={new Direction(direction).get('x')}
                        translate={setTranslate(i)}
                        onStart={() => {
                            setFromI(i);
                            onStart?.(i);
                        }}
                        onMove={(trans) => onPostMove(trans, i)}
                        onEnd={onPostEnd}
                    >
                        {children(item, i)}
                    </Draggable>
                </div>
            ))}
        </List>
    );
};

export default memo(forwardRef(SwapListWithOutMode));
