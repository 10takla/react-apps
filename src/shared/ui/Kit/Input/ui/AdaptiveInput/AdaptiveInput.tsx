import {
    ForwardedRef,
    HTMLProps, forwardRef, memo,
    useImperativeHandle, useRef,
    useEffect,
    useCallback,
    useState,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import Tag from 'src/shared/ui/Stack/Tag/Tag';
import cls from './AdaptiveInput.module.scss';

interface AdaptiveInputProps extends HTMLProps<HTMLInputElement> {

}

type HTMLInput = HTMLInputElement | null

const AdaptiveInput = (props: AdaptiveInputProps, ref: ForwardedRef<HTMLInput>) => {
    const {
        value: preValue,
        style,
        placeholder,
        type,
        className,
        onChange,
        ...otherProps
    } = props;

    const [value, setValue] = useState(preValue !== undefined ? String(preValue) : '');
    useEffect(() => {
        setValue(preValue !== undefined ? String(preValue) : '');
    }, [preValue]);

    const onPostChange = useCallback((e) => {
        onChange?.(e);
        const newValue = e.target.value;
        setValue(newValue);
    }, [onChange]);

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInput, HTMLInput>(
        ref,
        () => inputRef.current,
    );

    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const wrapContent = document.createElement('pre');
        wrapContent.className = cls.wrap;
        document.body.appendChild(wrapContent);

        const content = document.createElement('pre');
        content.className = cls.content;
        if (inputRef.current) {
            const inputStyles = window.getComputedStyle(inputRef.current);
            const injectStyles = ['font', 'font-size', 'font-family',
                'padding-bottom', 'padding-left', 'padding-right',
                'padding-top'];

            Array.from(inputStyles)
                .forEach((styleKey) => {
                    if (injectStyles.includes(styleKey)) {
                        const styleValue = inputStyles.getPropertyValue(styleKey);
                        // @ts-ignore
                        content.style[styleKey] = styleValue;
                    }
                });

            inputRef.current.style.width = '100%';
            const { width } = inputRef.current.getBoundingClientRect();
            content.style.maxWidth = `${width}px`;
        }

        wrapContent.appendChild(content);
        contentRef.current = content;

        return () => {
            document.body.removeChild(wrapContent);
            contentRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (contentRef.current && inputRef.current) {
            contentRef.current.textContent = value?.replace(/\n$/, '\n ') || placeholder || Array(1).fill(' ').join('');

            const [width, height] = [
                contentRef.current.scrollWidth,
                contentRef.current.scrollHeight,
            ];

            inputRef.current.style.width = `${width + 1}px`;
            if (type === 'textarea') {
                inputRef.current.style.height = `${height + 1}px`;
            }
        }
    }, [placeholder, type, value]);

    return (
        <Tag
            tag={type === 'textarea' ? 'textarea' : 'input'}
            className={classNames(cls.AdaptiveInput, [className])}
            style={{
                ...style,
            }}
            // type={type}
            placeholder={placeholder}
            ref={inputRef}
            value={value}
            onChange={onPostChange}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(AdaptiveInput));
