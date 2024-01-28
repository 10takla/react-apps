import {
    ComponentProps,
    ForwardedRef,
    forwardRef,
    memo,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import Vector from 'src/shared/lib/geometry/vector';
import cls from './SwapList.module.scss';
import SwapListWithOutMode from './SwapListWithOutMode/SwapListWithOutMode';

interface SwapListProps extends ComponentProps<typeof SwapListWithOutMode> {
    mode?: 'swap' | 'offset'
}

const SwapList = (props: SwapListProps, ref: ForwardedRef<El>) => {
    const {
        mode = 'swap',
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
            const nearItemIndex = i + Math.sign(swap.fromI - swap.toI);
            const [leftBound, rightBound] = [swap.fromI, swap.toI].sort();
            if (leftBound <= i && i <= rightBound && itemRects[nearItemIndex]) {
                const currItem = new Vector(itemRects[i]);
                const nearItem = new Vector(itemRects[nearItemIndex]);

                return nearItem.sub(currItem);
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

    const dragClassesByMode = {
        swap: (swap, i) => '',
        offset: (swap, i) => {
            return classNames('', {
                [cls.isSomeDragged]: swap?.fromI !== undefined,
                [cls.isCurrDragged]: swap?.fromI === i,
            });
        },
    };

    return (
        <SwapListWithOutMode
            transalteByMode={(itemRects, swap, i) => transalteByMode[mode](itemRects, swap, i)}
            getNewListByMode={(postList, swap) => getNewListByMode[mode](postList, swap)}
            dragClassesByMode={(swap, i) => {
                return dragClassesByMode[mode](swap, i);
            }}
            ref={ref}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(SwapList));
