import {
    ElementRef,
    ForwardedRef,
    forwardRef, memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import { Direction } from "src/wordLearner/shared/lib/direction/direction";
import cls from './InputRange.module.scss';
import Track, { TrackProps } from './ui/Track/Track';

type El = ElementRef<typeof Track>;

interface InputRangeProps extends Omit<TrackProps, 'direction'> {
    direction?: 'x' | 'y' | undefined;
}

const InputRange = (props: InputRangeProps, ref: ForwardedRef<El>) => {
    const {
        className,
        min: preMin,
        values: preValues,
        max: preMax,
        step: preStep,
        direction = 'x',
        onChange: onPreChange,
        onBlur: onPreBlur,
        ...otherProps
    } = props;
    const [values, setValues] = useState(preValues);
    useEffect(() => {
        setValues(preValues)
    }, [preValues]);

    const [min, max] = useMemo(() => {
        let min = preMin ?? (!values?.length ? 0 : undefined);
        if (preMin === undefined && values?.length) {
            min = Math.min(...values);
        }
        let max = preMax ?? (min !== undefined ? min + 100 : undefined);
        if (preMax === undefined && values && values.length > 1) {
            max = Math.max(...values);
        }
        return [min, max]
    }, [values, preMin, preMax])

    const step = preStep ?? (max - min) / 100;
    const postValues = values?.length ? values : [min];

    const postPostValues = useMemo(() => {
        const t = postValues.map((value) => {
            if (value > max) return max;
            if (value < min) return min
            return value;
        }).toSorted((a, b) => (a > b ? 1 : a < b ? -1 : 0))

        if (t.some((o, i) => (o !== postValues[i]))) {
            setValues(t)
            onPreChange?.(t)
        }

        return t
    }, [max, min, postValues]);

    const onChange = useCallback((newValues: number[]) => {
        // console.log(newValues);
        // setPostPostValues(newValues)
        onPreChange?.(newValues)
    }, [onPreChange])

    const onBlur = useCallback((newValues: number[]) => {
        // setPostPostValues(newValues)
        onPreBlur?.(newValues)
    }, [onPreChange])
    
    return (
        <Track
            className={classNames(cls.InputRange, [className])}
            ref={ref}
            gap={16}
            {...otherProps}
            direction={new Direction(direction)}
            values={postPostValues}
            {...{
                onChange, onBlur, min, max, step,
            }}
        />
    );
};

export default memo(forwardRef(InputRange));
