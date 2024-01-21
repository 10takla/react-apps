import {
    ChangeEvent,
    ForwardedRef,
    HTMLProps, forwardRef, memo,
    useCallback,
    useEffect,
    useImperativeHandle, useRef,
    useState,
} from 'react';

import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import AdaptiveInput from './ui/KeepFocus/InputRange/AdaptiveInput/AdaptiveInput';

interface InputProps extends HTMLProps<HTMLInputElement> {

}

type HTMLInput = HTMLInputElement | null

const Input = (props: InputProps, ref: ForwardedRef<HTMLInput>) => {
    const {
        className,
        value,
        style,
        onChange,
        ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInput, HTMLInput>(
        ref,
        () => inputRef.current,
    );

    const [postValue, setPostValue] = useState(String(value));
    useEffect(() => {
        setPostValue(String(value));
    }, [value]);

    const onPostChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = String(e.target.value);
        setPostValue(newValue);

        onChange?.(e);
    }, [onChange]);

    return (
        <AdaptiveInput
            className={classNames(cls.Input, {}, [className])}
            value={postValue}
            onChange={onPostChange}
            ref={inputRef}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(Input));
