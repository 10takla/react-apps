import {
    ComponentProps,
    ForwardedRef,
    forwardRef, memo,
    useMemo,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import { Direction } from 'src/wordLearner/shared/lib/direction/direction';
import Draggable from '../../../Draggable/Draggable';
import cls from './InputRange.module.scss';
import Track from './ui/Track/Track';

type El = HTMLElement | undefined;

type P = Omit<ComponentProps<typeof Track>, 'direcion'>;
type E = Partial<Pick<P, 'max'|'min'|'values'|'step'|'onChange'>>;
type R = Extract<P, E>;

interface InputRangeProps extends R, ComponentProps<typeof HStack> {
    direction: ComponentProps<typeof Draggable>['direction']
}

const InputRange = (props: InputRangeProps, ref: ForwardedRef<El>) => {
    const {
        className,
        min: preMin,
        values: preValues,
        max: preMax,
        direction = 'x',
        onChange,
        step,
        ...otherProps
    } = props;
    const dir = useMemo(() => {
        return new Direction(direction);
    }, [direction]);

    // определение min max и values для самого начала
    let min = preMin ?? (!preValues?.length ? 0 : undefined);
    if (preMin === undefined && preValues?.length) {
        min = Math.min(...preValues);
    }
    let max = preMax ?? (min !== undefined ? min + 100 : undefined);
    if (preMax === undefined && preValues && preValues.length > 1) {
        max = Math.max(...preValues);
    }
    const values = preValues?.length ? preValues : [min];

    const postValues = useMemo(() => {
        return values.map((value) => {
            if (value > max) return max;
            if (value < min) return min;
            return value;
        }).toSorted((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    }, [max, min, values]);

    return (
        <Track
            className={classNames(cls.InputRange, [className])}
            ref={ref}
            gap={16}
            {...otherProps}
            direction={dir}
            values={postValues}
            {...{
                onChange, min, max, step,
            }}
        />
    );
};

export default memo(forwardRef(InputRange));
