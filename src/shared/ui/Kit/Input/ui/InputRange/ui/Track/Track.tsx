import {
    forwardRef, memo, ForwardedRef, ComponentProps, useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Flex, HStack } from 'src/shared/ui/Stack';
import { Direction } from 'src/wordLearner/shared/lib/direction/direction';
import Vector from 'src/shared/lib/geometry/vector';
import cls from './Track.module.scss';
import Slider, { SliderProps } from './Slider';

type El = HTMLElement | null;

interface TrackProps extends ComponentProps<typeof HStack> {
    direction: Direction
    values: Array<SliderProps['value']>
    onChange: (value: number[]) => void
    max: number
    min: number
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
    } = props;
    const x = dir.get('x');

    const [values, setValues] = useState(preValues);
    useEffect(() => {
        setValues(preValues);
    }, [preValues]);

    const trackRef = useRef<El>(null);
    const childrensRef = useRef<HTMLElement[]>([]);
    const startRectRef = useRef<DOMRect>(null);

    const [sliderMaxWidth, setSliderMaxWidth] = useState(0);
    useEffect(() => {
        const childrens = childrensRef.current;
        if (childrens) {
            setSliderMaxWidth(Math.max(...childrens
                .map((el) => el.offsetHeight)));
        }
    }, [dir]);

    const [factor, setFactor] = useState(0);
    const width = useMemo(() => max - min, [max, min]);

    const onMove = useCallback((translate: Vector, i: number) => {
        if (startRectRef.current) {
            const startPos = startRectRef.current[x];
            if (values[i + 1]) {
                const nextPos = startPos + (values[i + 1] / factor);
                if (startPos + translate[x] >= nextPos) {
                    translate[x] = nextPos - startPos;
                }
            }
            if (values[i - 1]) {
                const prePos = startPos + (values[i - 1] / factor);
                if (startPos + translate[x] <= prePos) {
                    translate[x] = prePos - startPos;
                }
            }
        }
    }, [factor, values, x]);

    return (
        <Flex
            direction={dir.get('row')}
            className={classNames(cls.Track, [cls[dir.get('row')], className])}
            ref={(el) => {
                if (el) {
                    const maxWidth = el.getBoundingClientRect()[dir.get('width')] - (sliderMaxWidth);
                    setFactor(width / maxWidth);
                    trackRef.current = el;
                    ref?.(el);
                }
            }}
            style={{
                [dir.rev.get('width')]: sliderMaxWidth,
            }}
        >

            {values.map((value, i) => (
                <Slider
                    key={i}
                    ref={(el) => {
                        if (el) {
                            const dragElement = el.querySelector('[data-drag]') as HTMLElement;
                            childrensRef.current[i] = dragElement;
                            if (startRectRef && !startRectRef.current) {
                                startRectRef.current = dragElement.getBoundingClientRect();
                            }
                        }
                    }}
                    rootRef={trackRef}
                    step={step / factor}
                    direction={dir}
                    onMove={(tr) => {
                        onMove(tr, i);
                    }}
                    {...{ value, factor, min }}
                    onChange={(v) => {
                        onChange(values.toSpliced(i, 1, v));
                    }}
                    onEnd={(v) => {
                        setValues(values.toSpliced(i, 1, v[x] * factor));
                    }}
                />
            ))}
        </Flex>
    );
};

export default memo(forwardRef(Track));
