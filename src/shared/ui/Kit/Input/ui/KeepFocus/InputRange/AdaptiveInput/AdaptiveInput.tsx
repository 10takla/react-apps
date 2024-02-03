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

    const [value, setValue] = useState(preValue);
    useEffect(() => {
        setValue(preValue);
    }, [preValue]);

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInput, HTMLInput>(
        ref,
        () => inputRef.current,
    );

    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const content = document.createElement('div');

        if (inputRef.current) {
            
        }

        content.className = cls.content;
        document.body.appendChild(content);
        contentRef.current = content;
        return () => {
            document.body.removeChild(content);
            contentRef.current = null;
        };
    }, []);

    const [adaptiveStyeles, setAdaptiveStyeles] = useState({});

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.textContent = value || 's';

            const { width, height } = contentRef.current.getBoundingClientRect();
            console.log(value, width, height);
            setAdaptiveStyeles({ width });
        }
    }, [value]);

    const onPostChange = useCallback((e) => {
        const newValue = e.target.value;
        setValue(newValue);
    }, []);

    return (
        <Tag
            tag={type === 'textarea' ? 'textarea' : 'input'}
            className={classNames(cls.AdaptiveInput, [className])}
            style={{
                ...style,
                ...adaptiveStyeles,
            }}
            type={type}
            placeholder={placeholder}
            ref={inputRef}
            value={value}
            onChange={onPostChange}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(AdaptiveInput));
