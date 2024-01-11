import React, {
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle, useMemo,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    isKeepingFocus?: boolean
}

export type InputRef = HTMLInputElement
const Input = (props: InputProps, ref: ForwardedRef<InputRef>) => {
    const {
        className,
        value,
        type,
        min, max,
        onChange,
        maxLength,
        isKeepingFocus = false,
        onBlur,
        ...otherProps
    } = props;
    const inputRef = useRef<InputRef>(null);

    useImperativeHandle<InputRef | null, InputRef | null>(
        ref,
        () => inputRef.current,
    );

    const checkMaxMin = useCallback((v: InputProps['value']) => {
        if (typeof v === 'number') {
            if (Number(v) < Number(min)) {
                return String(min);
            }
            if (Number(v) > Number(max)) {
                return String(max);
            }
        }
        return v as InputProps['value'];
    }, [max, min]);

    // const [postValue, setPostValue] = useUpdateState(() => checkMaxMin(value), [value]);

    const [postValue, setPostValue] = useState(value);

    useEffect(() => {
        setPostValue(value);
    }, [value]);

    const onPostChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const chValue = event.target.value;
        setPostValue(chValue);
        onChange?.(event);
    }, [onChange, setPostValue]);

    const onPostBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const chValue = event.target.value;
        const t = checkMaxMin(chValue);
        setPostValue(t);
        event.target.value = t;
        onBlur?.(event);
    }, [checkMaxMin, setPostValue, onBlur]);

    const onInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && ref) {
            // @ts-ignore
            onPostBlur?.(event);
        }
    }, [onPostBlur, ref]);

    const postPostValue = useMemo(() => {
        if (type === 'number') {
            if (!Number.isNaN(Number(postValue))) {
                return Number(postValue).toFixed(maxLength);
            }
        } else {
            return postValue;
        }
    }, [maxLength, postValue, type]);

    const [widthInput, setWidthInput] = useState<number | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            const inputElement = inputRef.current;
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.padding = window.getComputedStyle(inputElement).getPropertyValue('padding');
            tempSpan.style.font = window.getComputedStyle(inputElement).getPropertyValue('font');
            tempSpan.style.fontSize = window.getComputedStyle(inputElement).getPropertyValue('font-size');
            tempSpan.style.fontFamily = window.getComputedStyle(inputElement).getPropertyValue('font-family');
            tempSpan.textContent = String(postPostValue);
            document.body.appendChild(tempSpan);
            setWidthInput(tempSpan.offsetWidth);
            return () => {
                tempSpan.remove();
            };
        }
    }, [postPostValue]);

    return (
        <input
            {...{ ...otherProps, type, onBlur }}
            onKeyUp={onInputKeyDown}
            ref={inputRef}
            onChange={onPostChange}
            onBlur={onPostBlur}
            className={classNames(cls.Input, {}, [className])}
            value={postPostValue}
            data-keepingfocus={isKeepingFocus || undefined}
            // @ts-ignore
            style={{ '--length': `${widthInput}px` }}
        />
    );
};
export default memo(forwardRef(Input));
