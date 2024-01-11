import {
    ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useRef,
    useState,
    useMemo,
} from 'react';
import { Flex } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FlexProps } from '@/shared/ui/Stack/Flex/Flex';
import cls from './InputRange.module.scss';
import DraggableWrapper from '@/shared/ui/Kit/Draggable/DraggableWrapper/DraggableWrapper';
import Input from '../../../Input';
import { Direction } from '@/shared/lib/direction/direction';
import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';

const reverse = [['row', 'column']].reduce((all, [a, b]) => ({ ...all, [a]: b, [b]: a }));

interface InputRangeProps extends Omit<FlexProps, 'direction' | 'max' | 'onChange'>,
    Partial<Pick<FlexProps, 'direction'>> {
    values: number[]
    min?: number
    max?: number
    step?: number
    inputDirection?: 'left' | 'right'
    onChange?: (values: InputRangeProps['values']) => void
}

const InputRange = (props: InputRangeProps, ref: ForwardedRef<ElementRef<typeof Flex>>) => {
    const {
        className,
        values,
        min,
        max,
        inputDirection = 'left',
        direction = 'row',
        step = 1,
        onChange,
        ...otherProps
    } = props;
    const dir = new Direction(direction);
    const flexRef = useRef<ElementRef<typeof Flex>>();
    useImperativeHandle(ref, () => flexRef.current);
    const childrensRef = useRef<HTMLElement[]>([]);

    const postMax = useMemo(() => {
        return max ?? values[values.length - 1];
    }, [max]);
    const postMin = useMemo(() => {
        return min ?? values[0];
    }, [min]);

    const length = postMax - postMin;
    const [childrenWidth, setChildrenWidth] = useState(1);
    const path = useMemo(() => {
        return (flexRef.current?.[dir.get('offsetWidth')] - childrenWidth) || 1;
    }, [childrenWidth, dir]);
    const factor = useMemo(() => length / path, [path]);

    const [postValues, setPostValues] = useState(values);

    const onPostChange = (value: number, i: number) => {
        let v = Math.floor(value);
        if (values[i - 1] > value) {
            v = values[i - 1];
        }
        if (values[i + 1] < value) {
            v = values[i + 1];
        }

        setPostValues?.(values.toSpliced(i, 1, v));
        onChange?.(postValues);
    };
    const [childrenSize, setChildrenSize] = useState(0);
    return (
        <Flex
            ref={flexRef}
            {...{ ...otherProps, direction }}
            className={classNames(cls.InputRange, {
                [cls.row]: direction === 'row',
                [cls.column]: direction === 'column',
            }, [className])}
            style={{
                [dir.rev(dir.get('width'))]: childrenSize,
            }}
            align="center"
            justify="center"
        >
            {postValues.toSpliced(postValues.length - 1).map((value, i) => {
                const left = value / factor + childrenWidth / 2;
                const width = postValues[i + 1] / factor - left + childrenWidth / 2;
                return (
                    <div
                        key={i}
                        className={cls.track}
                        style={{
                            background: getRgbGradient(i + 1, {}),
                            [dir.get('width')]: width,
                            [dir.get('left')]: left,
                        }}
                    />
                );
            })}
            {postValues.map((value, i) => {
                const [isDrag, setIsDrag] = useState(false);
                return (
                    <DraggableWrapper
                        key={i}
                        direction={direction}
                        rootRef={flexRef}
                        translate={[0, 0].map((_, i) => (i === dir.id ? value / factor : 0))}
                        ref={(el) => {
                            if (el && i === 0) {
                                setChildrenSize(el[dir.rev(dir.get('offsetWidth'))] + el.querySelector('input')?.[dir.rev(dir.get('offsetWidth'))]);
                            }
                        }}
                        dragRef={((el) => {
                            if (el) {
                                childrensRef.current[i] = el;
                                if (i === 0 && flexRef.current) {
                                    setChildrenWidth(el[dir.get('offsetWidth')]);
                                }
                            }
                        })}
                        step={step / factor}
                        onStart={() => setIsDrag(true)}
                        onEnd={() => setIsDrag(false)}
                        onCheck={(target, trans) => {
                            const nextRect = childrensRef.current[i + 1]?.getBoundingClientRect();
                            const preRect = childrensRef.current[i - 1]?.getBoundingClientRect();

                            const tran = trans[dir.get(0)];
                            const tar = target[dir.get('left')];

                            if (nextRect) {
                                const nextLeft = nextRect[dir.get('left')];
                                if (tar + tran > nextLeft) {
                                    onPostChange?.(tran * factor, i);
                                    return [0, 0].map((_, i) => (i === dir.id ? nextLeft - tar : 0));
                                }
                            }
                            if (preRect) {
                                const preLeft = preRect[dir.get('left')];
                                if (tar + tran < preLeft) {
                                    onPostChange?.(tran * factor, i);
                                    return [0, 0].map((_, i) => (i === dir.id ? preLeft - tar : 0));
                                }
                            }
                            onPostChange?.(tran * factor, i);
                        }}
                    >
                        <Flex
                            className={classNames(cls.value, { [cls.dragged]: isDrag })}
                            gap={8}
                            direction={dir.rev(direction)}
                            align="center"
                            justify="center"
                        >
                            <div className={`${cls.slider} dragTarge'`} />
                            <Input
                                className={classNames(
                                    cls.input,
                                    { [cls.left]: inputDirection === 'left', [cls.right]: inputDirection === 'right' },
                                )}
                                value={value}
                                type="number"
                                onBlur={(e) => {
                                    onPostChange?.(Number(e.target.value), i);
                                }}
                            />
                        </Flex>
                    </DraggableWrapper>
                );
            })}

        </Flex>
    );
};
export default memo(forwardRef(InputRange));
