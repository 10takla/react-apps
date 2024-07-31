import {
    ChangeEvent,
    ForwardedRef,
    HTMLProps, forwardRef, memo,
    useCallback,
    useEffect,
    useImperativeHandle, useRef,
    useState,
} from 'react';

import { classNames } from "S/lib/classNames/classNames";
import cls from './Input.module.scss';
import AdaptiveInput from './ui/AdaptiveInput/AdaptiveInput';
import TypeRoutes from './wrappers/TypeRoutes';

export enum InputThemes {
    BASE = 'base',
}

interface InputProps extends HTMLProps<HTMLInputElement> {
    theme?: InputThemes
}

type HTMLInput = HTMLInputElement | null

const Input = (props: InputProps, ref: ForwardedRef<HTMLInput>) => {
    const {
        className,
        value,
        style,
        theme,
        onChange,
        ...otherProps
    } = props;
    
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInput, HTMLInput>(
        ref,
        () => inputRef.current,
    );

    const [postValue, setPostValue] = useState(value);
    useEffect(() => {
        setPostValue(value);
    }, [value]);

    const onPostChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = String(e.target.value);
        setPostValue(newValue);
        onChange?.(e);
    }, [onChange]);

    return (
        <TypeRoutes
            value={postValue}
            onChange={onPostChange}
            {...otherProps}
        >
            <AdaptiveInput
                className={classNames(cls.Input, { [cls[theme!]]: theme }, [className,])}
                ref={inputRef}
                {...{ style, ...otherProps }}
            />
        </TypeRoutes>
    );
};

export default memo(forwardRef(Input));
