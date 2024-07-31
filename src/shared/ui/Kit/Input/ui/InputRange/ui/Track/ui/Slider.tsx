import {
    memo, ForwardedRef, ElementRef, ComponentProps, forwardRef,
    useEffect,
    useState,
    useCallback,
    HTMLAttributeAnchorTarget,
    InputHTMLAttributes,
    HTMLProps,
    FocusEvent,
} from 'react';
import { Flex } from "S/ui/Stack";
import Draggable from "S/ui/Kit/Draggable/Draggable";
import Vector from "S/lib/geometry/vector";
import cls from '../Track.module.scss';
import { Direction } from "src/wordLearner/shared/lib/direction/direction";
import Input from '../../../../../Input';

export interface SliderProps extends Omit<ComponentProps<typeof Draggable>, 'children' | 'direction'> {
    value: number
    factor?: number
    offset: number
    min: number
    max: number
    onChange: (value: number) => void
    onCheck: (value: number) => number
    onBlur?: (value: number) => void
    onFocus?: () => void
    direction: Direction
    side?: 'left' | 'right'
    round: (value: number) => number
}

const Slider = (props: SliderProps, ref: ForwardedRef<ElementRef<typeof Draggable>>) => {
    const {
        value,
        factor,
        offset,
        min,
        max,
        onMove,
        round,
        step,
        direction: dir,
        onChange,
        onBlur,
        side = 'left',
        onFocus,
        onCheck,
        ...otherProps
    } = props;
    const x = dir.get('x')
    const [isMove, setIsMove] = useState(false);

    let save = round(value);
    const [postValue, setPostValue] = useState(round(value));
    useEffect(() => {
        setPostValue(round(value));
    }, [value]);

    const [trans, setTrans] = useState<Vector>(new Vector(0, 0));
    const getStartPos = useCallback((value: number) => {
        if (factor === undefined) return

        const pos = new Vector(0, 0);
        pos[x] = (value - offset) / factor;
        setTrans(pos);
    }, [dir, factor, offset]);

    useEffect(() => {
        if (!isMove) {
            getStartPos(value);
        }
    }, [getStartPos, value]);
    

    const onInputBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const newValue = onCheck(Number(e.target.value));
        setPostValue(newValue);
        onChange(newValue);
        return newValue
    }, [onCheck, setPostValue, onChange])

    return (
        <Draggable
            ref={ref}
            isBoundOnlyDrag
            direction={x}
            onStart={() => {
                onFocus?.()
                setIsMove(true)
            }}
            onMove={(translate) => {
                if (factor === undefined) return

                onMove?.(translate);
                const value = round(((translate[x]) * factor) + offset);
                if (value !== save) {
                    save = value;
                    setPostValue(value);
                    onChange(value);
                }
            }}
            onEnd={(translate) => {
                if (factor === undefined) return

                setIsMove(false)
                onMove?.(translate);
                const value = round(((translate[x]) * factor) + offset);
                onBlur?.(value);
            }}
            translate={trans}
            step={factor !== undefined && step !== undefined ? step / factor : undefined}
            {...otherProps}
        >
            <Flex
                className={cls.sliderInput}
                direction={dir.rev.get('row')}
                gap={4}
            >
                {[
                    <Input
                        key={'input'}
                        min={min}
                        max={max}
                        className={cls.input}
                        type="number"
                        value={postValue}
                        onFocus={onFocus}
                        onKeyDown={(e) => {
                            if (e.code === 'Enter') {
                                onInputBlur(e)
                            }
                        }}
                        onBlur={(e) => {
                            const newValue = onInputBlur(e)
                            onBlur?.(newValue)
                        }}
                    />,
                    <div key={'slider'} data-drag className={cls.slider} />,
                ].reduce((acc, curr) => {
                    return side === 'left' ?
                        [...acc, curr]
                        : [curr, ...acc,]
                }, [] as SVGRectElement[])}
            </Flex>
        </Draggable>
    );
};

export default memo(forwardRef(Slider));
