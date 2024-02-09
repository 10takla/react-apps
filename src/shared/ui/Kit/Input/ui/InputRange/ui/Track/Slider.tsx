import {
    useState, useMemo, memo, ForwardedRef, ElementRef, ComponentProps, forwardRef,
    useEffect,
} from 'react';
import { Flex } from 'src/shared/ui/Stack';
import Draggable from 'src/shared/ui/Kit/Draggable/Draggable';
import Vector from 'src/shared/lib/geometry/vector';
import { Direction } from 'readline';
import cls from './Track.module.scss';
import Input from '../../../../Input';

export interface SliderProps extends Omit<ComponentProps<typeof Draggable>, 'children' | 'direction'> {
    value: number
    factor: number
    min: number
    onChange: (value: number) => void
    direction: Direction
}

const Slider = (props: SliderProps, ref: ForwardedRef<ElementRef<typeof Draggable>>) => {
    const {
        value,
        factor,
        min,
        onMove,
        direction: dir,
        onChange,
        ...otherProps
    } = props;
    let save = value;

    const [postValue, setPostValue] = useState(Math.round(value));
    useEffect(() => {
        setPostValue(Math.round(value));
    }, [value]);

    const startPos = useMemo(() => {
        const t = new Vector(0, 0);
        t[dir.get('x')] = (value - min) / factor;
        return t;
    }, [dir, value, min, factor]);

    return (
        <Draggable
            ref={ref}
            isBoundOnlyDrag
            direction={dir.get('x')}
            onMove={(translate) => {
                onMove?.(translate);
                const v = ((translate[dir.get('x')]) * factor) + min;
                if (v !== save) {
                    save = v;
                    const t = Math.round(v);
                    setPostValue(t);
                    onChange(t);
                }
            }}
            translate={startPos}
            {...otherProps}
        >
            <Flex
                className={cls.sliderInput}
                direction={dir.rev.get('row')}
                gap={4}
                align="cneter"
            >
                <div data-drag className={cls.slider} />
                <Input className={cls.input} type="number" value={postValue} />
            </Flex>
        </Draggable>
    );
};

export default memo(forwardRef(Slider));
