import {
    ForwardedRef,
    HTMLProps, forwardRef, memo,
    useCallback,
    useEffect,
    useImperativeHandle, useRef,
    useState,
} from 'react';

interface AdaptiveInputProps extends HTMLProps<HTMLInputElement> {

}

type HTMLInput = HTMLInputElement | null

const AdaptiveInput = (props: AdaptiveInputProps, ref: ForwardedRef<HTMLInput>) => {
    const {
        value,
        style,
        ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInput, HTMLInput>(
        ref,
        () => inputRef.current,
    );

    const [width, setWidth] = useState<number>('auto');
    const [span, setSpan] = useState<HTMLDivElement>();

    const updateWidthBySpanValue = useCallback((newValue: string) => {
        if (span) {
            span.textContent = newValue;
            setWidth(span.offsetWidth);
        }
    }, [span]);

    const copyStylesFromInput = useCallback(() => {
        if (inputRef.current && span) {
            const inputStyles = window.getComputedStyle(inputRef.current);
            const injectStyles = ['font', 'font-size', 'font-family', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top'];

            Array.from(inputStyles)
                .forEach((styleKey) => {
                    if (styleKey.substring('padding')) {
                        console.log(styleKey);
                    }
                    if (injectStyles.includes(styleKey)) {
                        const styleValue = inputStyles.getPropertyValue(styleKey);
                        console.log(styleKey, styleValue);

                        // @ts-ignore
                        span.style[styleKey] = styleValue;
                    }
                });
        }
    }, [span]);

    // инициализация span и начльной width
    useEffect(() => {
        const span = document.createElement('div');

        span.style.position = 'absolute';
        span.style.whiteSpace = 'pre';
        span.style.visibility = 'hidden';

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
                updateWidthBySpanValue(String(value));
            });

            observer.observe(inputElement);

            return () => {
                observer.unobserve(inputElement);
            };
        }
    }, [copyStylesFromInput, updateWidthBySpanValue, value]);

    return (
        <input
            style={{
                ...style,
                width,
            }}
            value={value}
            ref={inputRef}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(AdaptiveInput));
