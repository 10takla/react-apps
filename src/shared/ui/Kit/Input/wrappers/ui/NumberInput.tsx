import { logDOM } from '@storybook/test';
import {
    forwardRef, memo, ForwardedRef, cloneElement, ReactElement, HTMLProps,
    useState,
    useCallback,
    useEffect,
    FormEventHandler,
    FormEvent,
    FocusEventHandler,
    useMemo,
} from 'react';

type El = HTMLElement | undefined;

interface NumberInputProps extends Pick<HTMLProps<HTMLInputElement>, 'value' | 'onBlur' | 'onChange' | 'type' | 'max' | 'min'> {
    children: ReactElement
    max: number
    min: number
    round?: number
}

const NumberInput = (props: NumberInputProps, ref: ForwardedRef<El>) => {
    const {
        children,
        value: preValue,
        onBlur: onPreBlur,
        onChange: onPreChange,
        max,
        min,
        round,
        ...otherProps
    } = props;

    const getValidValue = useCallback((v: typeof preValue) => {
        if (v === '') {
            return [true, '']
        }

        if (['.', '-'].includes(v)) {
            return [true, v]
        }

        const num = Number(v);
        if (Number.isNaN(num)) return [false, v]

        if (v[v.length - 1] === '.') {
            return [true, v]
        }
        
        if (num > max) {
            return [true, max]
        }
        if (num < min) {
            return [true, min]
        }

        return [true, num]
    }, [round, max, min])

    let stack = useMemo(() => {
        const [isValid, validValue] = getValidValue(preValue);
        if (!isValid) return ''

        return validValue
    }, [getValidValue])

    const [value, setValue] = useState(stack);
    useEffect(() => {
        const [isValid, validValue] = getValidValue(preValue);
        if (!isValid) return

        setValue(validValue)
    }, [preValue, getValidValue])

    const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const [isValid, validValue] = getValidValue(value);
        if (!isValid) {
            e.currentTarget.value = stack;
            return
        }

        stack = validValue;
        e.currentTarget.value = validValue;
        onPreChange?.(e)
    }, [onPreChange]);

    const onBlur = useCallback<FocusEventHandler<HTMLInputElement>>((e) => {
        const value = e.currentTarget.value;
        let [isValid, validValue] = getValidValue(value);
        
        if (round && typeof validValue == 'number') {
            const t = roundDownToNearestPowerOfTen(round)
            validValue = Math.round(validValue / t) * t
            e.currentTarget.value = validValue
        }
        if (isValid) {
            setValue(validValue)
            onPreBlur?.(e)
        }
    }, [onPreBlur])

    function roundDownToNearestPowerOfTen(num: number) {
        if (num <= 0) {
            return 0;
        }
        const log10 = Math.log10(num);
        const floorLog10 = Math.floor(log10);
        return Math.pow(10, floorLog10);
    }

    return (
        cloneElement(children, {
            value,
            onBlur,
            onChange,
            ...otherProps
        })
    );
};

export default memo(forwardRef(NumberInput));
