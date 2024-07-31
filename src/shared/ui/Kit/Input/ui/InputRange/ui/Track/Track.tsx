import {
    ComponentProps,
    ForwardedRef,
    forwardRef, memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import Vector from "S/lib/geometry/vector";
import { Flex } from "S/ui/Stack";
import cls from './Track.module.scss';
import Slider, { SliderProps } from './ui/Slider';
import Tracks from './ui/Tracks/Tracks';

type El = HTMLElement | null;

export interface TrackProps extends ComponentProps<typeof Flex>,
    Pick<SliderProps, 'max' | 'min' | 'direction'> {
    values: Array<SliderProps['value']>
    onChange: (value: number[]) => void
    onBlur: (value: number[]) => void
    step: number
}

const Track = (props: TrackProps, ref: ForwardedRef<El>) => {
    const {
        className,
        max,
        min,
        direction: dir,
        values: preValues,
        onChange,
        step,
        side,
        onBlur,
        onFocus,
        ...otherProps
    } = props;
    const x = dir.get('x');

    const [values, setValues] = useState(preValues);
    useEffect(() => {
        setValues(preValues);
    }, [preValues]);

    const trackRef = useRef<El>(null);
    const slidersRef = useRef<HTMLElement[]>([]);
    const startRectRef = useRef<DOMRect>(null);

    const [sliderMaxWidth, setSliderMaxWidth] = useState(0);
    useEffect(() => {
        const childrens = slidersRef.current;
        if (childrens) {
            setSliderMaxWidth(Math.max(
                ...childrens
                    .map((el) => (
                        el.querySelector('[data-drag]')
                            .getBoundingClientRect()[dir.get('width')]
                    ))
            ));
        }
    }, [dir]);

    const [factor, setFactor] = useState<number>();
    const width = useMemo(() => max - min, [max, min]);

    const onCheck = useCallback((translate: Vector, i: number) => {
        if (factor === undefined) return

        if (!startRectRef.current) return
        const startPos = startRectRef.current[x];
        if (values[i + 1]) {
            const nextPos = startPos + ((values[i + 1] - min) / factor);
            if (startPos + translate[x] >= nextPos) {
                translate[x] = nextPos - startPos;
            }
        }
        if (values[i - 1]) {
            const prePos = startPos + ((values[i - 1] - min) / factor);
            if (startPos + translate[x] <= prePos) {
                translate[x] = prePos - startPos;
            }
        }
    }, [factor, min, values, x]);

    const [proValues, setProValues] = useState(preValues);
    useEffect(() => {
        setProValues(preValues);
    }, [preValues]);

    const order = useMemo(() => {
        return 10 ** Math.floor(Math.log10(Math.abs(step)));
    }, [step]);

    return (
        <Flex
            direction={dir.get('row')}
            className={classNames(cls.Track, [cls[dir.get('row')], className])}
            ref={(el) => {
                if (el) {
                    const maxWidth = el.getBoundingClientRect()[dir.get('width')] - sliderMaxWidth;
                    setFactor(width / maxWidth);
                    trackRef.current = el;
                    if (typeof ref === 'function') {
                        ref(el);
                    }
                }
            }}
            {...{
                ...otherProps,
                style: {
                    ...otherProps.style,
                    '--height': `${Math.max(...slidersRef.current?.map(slider => slider?.getBoundingClientRect()[dir.rev.get('width')]))}px`,
                    '--count-values': preValues.length,
                },
            }}
        >
            <Tracks
                className={classNames(cls.track, [cls[side]])}
                values={proValues}
                {...{
                    max, min, factor, sliderMaxWidth, side,
                }}
            />
            {values.map((value, i) => (
                <Slider
                    key={i}
                    ref={(el) => {
                        if (el && startRectRef && !startRectRef.current) {
                            slidersRef.current[i] = el;
                            const dragElement = el.querySelector('[data-drag]') as HTMLElement;
                            startRectRef.current = dragElement.getBoundingClientRect();
                        }
                    }}
                    boundsRectRef={trackRef}
                    direction={dir}
                    round={(v) => Number(v.toFixed(String(order).length - 1))}
                    {...{
                        value,
                        factor,
                        onFocus,
                        side,
                        step,
                        onBlur,
                        offset: min,
                        min: values[i - 1] ?? min,
                        max: values[i + 1] ?? max,
                    }}
                    onMove={(translate) => {
                        onCheck(translate, i);
                    }}
                    onCheck={(value) => {
                        if (!startRectRef.current) return
                        const vvalues = [min, ...values, max]
                        let j = i + 1;
                        let t = vvalues[j + 1]
                        if (value >= t) {
                            value = t;
                        }
                        let r = vvalues[j - 1]
                        if (value <= r) {
                            value = r;
                        }

                        return value
                    }}
                    onChange={(value) => {
                        const newValues = values.toSpliced(i, 1, value);
                        onChange(newValues);
                        setProValues(newValues);
                        setValues(newValues);
                    }}
                />
            ))}
        </Flex>
    );
};

export default memo(forwardRef(Track));
