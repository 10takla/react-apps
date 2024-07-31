import {
    ComponentProps,
    ForwardedRef,
    forwardRef,
    memo,
    useCallback,
    useState,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import Vector from "S/lib/geometry/vector";
import cls from './SwapList.module.scss';
import SwapListWithOutMode from './SwapListWithOutMode/SwapListWithOutMode';

interface SwapListProps extends ComponentProps<typeof SwapListWithOutMode> {
    mode?: 'swap' | 'offset'
}

const SwapList = (props: SwapListProps, ref: ForwardedRef<El>) => {
    const {
        mode = 'swap',
        draggableProps = {},
        direction,
        ...otherProps
    } = props;

    const transalteByMode = {
        swap: (itemRects, swap, i) => {
            if (i === swap.toI) {
                const toItem = new Vector(itemRects[swap.toI]);
                const fromItem = new Vector(itemRects[swap.fromI]);

                return fromItem.sub(toItem);
            }
        },
        offset: (itemRects, swap, i) => {
            const directionIndex = Math.sign(swap.fromI - swap.toI);
            const [leftBound, rightBound] = [swap.fromI, swap.toI].sort();

            if (leftBound <= i && i <= rightBound) {
                return new Vector(
                    directionIndex * itemRects[swap.fromI].width,
                    directionIndex * itemRects[swap.fromI].height,
                );
            }
        },
    };

    const getNewListByMode = {
        swap: (postList, swap) => {
            const newList = [...postList];
            [
                newList[swap.fromI],
                newList[swap.toI],
            ] = [
                newList[swap.toI],
                newList[swap.fromI],
            ];
            return newList;
        },
        offset: (postList, swap) => {
            const tmp = postList.toSpliced(swap.fromI, 1);
            return tmp.toSpliced(swap.toI, 0, postList[swap.fromI]);
        },
    };

    const [isTrunOffCurrDragged, setIsTurnOffCurrDragged] = useState(false);
    const dragClassesByMode = {
        swap: (swap, i) => '',
        offset: (swap, i) => {
            return classNames('', {
                [cls.isSomeDragged]: swap?.fromI !== undefined,
                [cls.isCurrDragged]: !isTrunOffCurrDragged && swap?.fromI === i,
            });
        },
    };

    const onMove = useCallback((trans: Vector, itemRects, swap, i: number) => {
        // эффукт резких перемещний при swap
        // НЕДОРАБОТАНО
        // if (swap) {
        //     const directionIndex = Math.sign(swap.fromI - swap.toI);
        //     const toRect = itemRects[swap.toI];
        //     const fromRect = itemRects[swap.fromI];

        //     let stop;
        //     if (directionIndex === 1) {
        //         stop = new Vector(0, toRect.top - fromRect.top);
        //     } else {
        //         stop = new Vector(0, toRect.bottom - fromRect.bottom);
        //     }

        //     const dirs = new Direction(direction).get('x');

        //     if (directionIndex === 1 ? trans[dirs] > stop[dirs] : trans[dirs] < stop[dirs]) {
        //         trans.set(stop);
        //         setIsTurnOffCurrDragged(true);
        //     } else {
        //         setIsTurnOffCurrDragged(false);
        //     }
        // } else {
        //     setIsTurnOffCurrDragged(false);
        // }

        draggableProps.onMove?.(trans, i);
    }, [direction, draggableProps]);

    return (
        <SwapListWithOutMode
            transalteByMode={(itemRects, swap, i) => transalteByMode[mode](itemRects, swap, i)}
            getNewListByMode={(postList, swap) => getNewListByMode[mode](postList, swap)}
            dragClassesByMode={(swap, i) => {
                return dragClassesByMode[mode](swap, i);
            }}
            draggableProps={{
                onMove,
                ...draggableProps,
            }}
            ref={ref}
            direction={direction}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(SwapList));
