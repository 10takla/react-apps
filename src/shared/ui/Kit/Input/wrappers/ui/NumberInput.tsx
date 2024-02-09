import {
    forwardRef, memo, ForwardedRef, cloneElement, ReactElement, HTMLProps,
    useState,
    useCallback,
    useEffect,
} from 'react';

type El = HTMLElement | undefined;

interface NumberInputProps extends Pick<HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'max' | 'min'> {
    children: ReactElement
    max: number
    min: number
}

const NumberInput = (props: NumberInputProps, ref: ForwardedRef<El>) => {
    const {
        children,
        value,
        onChange,
        type,
        max,
        min,
    } = props;
    const [postValue, setPostValue] = useState<number | undefined>();

    useEffect(() => {
        const numberValue = Number(value);
        if (!Number.isNaN(numberValue)) {
            setPostValue(numberValue);
        }
    }, [value]);

    const onPostChange = useCallback((e) => {
        const tmp = e.target.value;
        let newValue = Number(tmp);

        if (!Number.isNaN(newValue)) {
            if (newValue > max) {
                newValue = max;
            }
            if (newValue < min) {
                newValue = min;
            }
            e.target.value = newValue;
            setPostValue(newValue);
            onChange?.(e);
        } else if (tmp !== '-') {
            e.target.value = postValue ?? '';
        }
    }, [max, min, onChange, postValue]);
    return (
        cloneElement(children, {
            value: postValue,
            onChange: onPostChange,
            type,
        })
    );
};

export default memo(forwardRef(NumberInput));
