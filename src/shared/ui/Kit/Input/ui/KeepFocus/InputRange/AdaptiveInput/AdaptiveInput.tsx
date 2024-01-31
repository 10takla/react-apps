import {
    CSSProperties,
    ForwardedRef,
    HTMLProps, forwardRef, memo,
    useCallback,
    useEffect,
    useImperativeHandle, useRef,
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
        value,
        style,
        placeholder,
        type,
        className,
        ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInput, HTMLInput>(
        ref,
        () => inputRef.current,
    );

    const [adaptiveStyeles, setAdaptiveStyeles] = useState<CSSProperties>({});
    const [span, setSpan] = useState<HTMLDivElement>();

    const updateWidthBySpanValue = useCallback((newValue: string) => {
        if (span) {
            span.textContent = newValue?.replace(/\n$/, '\n ') || ' '; // ' ' - чтобы произвести минимальный размер
            const spanRect = span.getBoundingClientRect();
            const width = window.getComputedStyle(inputRef.current).getPropertyValue('max-width');
            const height = window.getComputedStyle(inputRef.current).getPropertyValue('max-height');

            setAdaptiveStyeles({
                width: width === 'none' && spanRect.width + 1,
                height: height === 'none' && spanRect.height,
            });
        }
    }, [span]);

    const copyStylesFromInput = useCallback(() => {
        if (inputRef.current && span) {
            const inputStyles = window.getComputedStyle(inputRef.current);
            const injectStyles = ['font', 'font-size', 'font-family',
                'padding-bottom', 'padding-left', 'padding-right',
                'padding-top'];

            Array.from(inputStyles)
                .forEach((styleKey) => {
                    if (injectStyles.includes(styleKey)) {
                        const styleValue = inputStyles.getPropertyValue(styleKey);
                        // @ts-ignore
                        span.style[styleKey] = styleValue;
                    }
                });
        }
    }, [span]);

    // инициализация span и начльной width
    useEffect(() => {
        const span = document.createElement('вшм');

        span.style.position = 'absolute';
        span.style.top = '0';
        span.style.left = '0';
        span.style.whiteSpace = 'pre-wrap';
        span.style.overflowWrap = 'break-word';
        span.style.visibility = 'hidden';
        span.style.maxWidth = `${inputRef.current?.getBoundingClientRect().width}px`;

        document.body.appendChild(span);
        setSpan(span);

        return () => {
            span.remove();
        };
    }, []);

    // отслеживать любые внешние изменения Input для изменения width
    useEffect(() => {
        const inputElement = inputRef.current;
        if (inputElement) {
            const observer = new ResizeObserver(() => {
                copyStylesFromInput();
                updateWidthBySpanValue(value === '' ? placeholder : String(value));
            });

            observer.observe(inputElement);

            return () => {
                observer.unobserve(inputElement);
            };
        }
    }, [copyStylesFromInput, placeholder, updateWidthBySpanValue, value]);

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
            defaultValue={value || ''}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(AdaptiveInput));
