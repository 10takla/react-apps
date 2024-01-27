import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    ReactNode,
    forwardRef,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Direction } from 'src/wordLearner/shared/lib/direction/direction';
import Draggable from '../Draggable/Draggable';
import { Vector } from '../Draggable/useDrag';
import List from '../../Stack/List/List';
import { Flex } from '../../Stack';

interface SwapListProps<T> extends Exclude<ComponentProps<typeof Flex>, ComponentProps<typeof Draggable>> {
    children: (item: T, index: number) => ReactNode
    list: T[]
    type?: 'swap' | 'offset'
    onChange?: (newList: T[]) => void,
    onBlur?: (newList: T[]) => void,
}

const SwapList = <T extends string>(props: SwapListProps<T>, ref: ForwardedRef<ElementRef<typeof List>>) => {
    const {
        children,
        list,
        direction,
        type = 'swap',
        onChange,
        onBlur,
        ...otherProps
    } = props;
    const rootRef = useRef<HTMLDivElement>(null);
    const itemRectsRef = useRef<Array<DOMRect>>([]);

    const [postList, setPostList] = useState(list);
    useEffect(() => {
        setPostList(list);
    }, [list]);

    const [toI, setToI] = useState<number>();
    const [fromI, setFromI] = useState<number>();
    let swap: {
        toI: number
        fromI: number
    };
    const getNewList = () => {
        if (type === 'swap') {
            const newList = [...postList];
            [newList[swap.fromI], newList[swap.toI]] = [newList[swap.toI], newList[swap.fromI]];
            return newList;
        }

        const tmp = postList.toSpliced(swap.fromI, 1);
        return tmp.toSpliced(swap.toI, 0, postList[swap.fromI]);
    };
    const onTmp = () => {
        onChange?.(getNewList());
    };

    const onEnd = () => {
        if (swap) {
            setPostList(getNewList());
            onBlur?.(getNewList());
        }
        swap = undefined;
        setFromI(undefined);
        setToI(undefined);
    };

    return (
        <Flex
            ref={rootRef}
            style={{ padding: 10, background: 'red' }}
            {...{ direction, ...otherProps }}
        >
            {postList.map((item, i) => (
                <Draggable
                    key={i}
                    ref={(el) => {
                        if (el) {
                            if (!itemRectsRef.current[i]) { // для единоразовой инициализации
                                itemRectsRef.current[i] = el.getBoundingClientRect();
                            }
                        }
                    }}
                    rootRef={rootRef}
                    direction={{ row: 'x', column: 'y' }[direction]}
                    translate={(() => {
                        if (fromI !== undefined && toI !== undefined) {
                            if (fromI !== i) {
                                if (type === 'swap') {
                                    if (i === toI) {
                                        const toItem = new Vector(itemRectsRef.current[toI]);
                                        const fromItem = new Vector(itemRectsRef.current[fromI]);

                                        return fromItem.sub(toItem);
                                    }
                                }
                                if (type === 'offset') {
                                    if (i > fromI && i <= toI) {
                                        const currItem = new Vector(itemRectsRef.current[i]);
                                        const preItem = new Vector(itemRectsRef.current[i - 1]);

                                        return preItem.sub(currItem);
                                    }
                                    if (i >= toI && i < fromI) {
                                        const currItem = new Vector(itemRectsRef.current[i]);
                                        const nextItem = new Vector(itemRectsRef.current[i + 1]);

                                        return nextItem.sub(currItem);
                                    }
                                }
                            }
                        }
                        return new Vector(0, 0);
                    })()}
                    onMove={(trans) => {
                        const currRect = itemRectsRef.current[i];

                        const findIndex = itemRectsRef.current
                            .findIndex((nearRect, j) => {
                                if (j !== i) {
                                    const dir = new Direction(direction);
                                    const y = dir.get('x');
                                    const top = dir.get('left');
                                    const height = dir.get('width');
                                    const bottom = dir.get('right');

                                    const topOffset = currRect[top] + trans[y];
                                    const bottomOffset = currRect[bottom] + trans[y];

                                    const preRect = itemRectsRef.current[j - 1];
                                    const nextRect = itemRectsRef.current[j + 1];

                                    let [topBound, bottomBound] = [nearRect[top], nearRect[bottom]];

                                    if (preRect) {
                                        topBound = preRect[top] + preRect[height] / 2;
                                    }
                                    if (nextRect) {
                                        bottomBound = nextRect[top] + nextRect[height] / 2;
                                    }

                                    if (
                                        (
                                            topOffset > topBound
                                                && topOffset < nearRect[top] + nearRect[height] / 2
                                        )
                                            || (
                                                bottomOffset > nearRect[top] + nearRect[height] / 2
                                                && bottomOffset < bottomBound
                                            )
                                    ) {
                                        return true;
                                    }
                                }
                            });

                        if (findIndex !== -1) {
                            setFromI(i);
                            setToI(findIndex);
                            if (!swap || (swap && swap.fromI !== i || swap.toI !== findIndex)) {
                                swap = { fromI: i, toI: findIndex };
                                onTmp();
                            }
                        } else {
                            swap = undefined;
                            setFromI(undefined);
                            setToI(undefined);
                        }
                    }}
                    onEnd={onEnd}
                >
                    {children(item, i)}
                </Draggable>
            ))}
        </Flex>
    );
};

export default memo(forwardRef(SwapList));
