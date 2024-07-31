import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './TimeLine.module.scss';
import { Ed } from "../../../info"

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface TimeProps extends ComponentProps<Component> {
    time: Date
}
const Time = (props: TimeProps) => {
    const {
        className,
        time,
        ...otherProps
    } = props;
    return (
        <HStack
            className={classNames(cls.time, [className])} tag="span" gap={16} {...otherProps}>
            {time.toLocaleString('default', { month: 'long' })}
            <br />
            {time.getFullYear()}
        </HStack>
    )
}

interface TimeLineProps extends ComponentProps<Component> {
    time: Ed["time"]
}

const TimeLine = (props: TimeLineProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        time,
        ...otherProps
    } = props;

    const timeLineRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => timeLineRef.current,
    );

    return (
        <HStack
            className={classNames(cls.TimeLine, [className])}
            ref={timeLineRef}
            {...otherProps} justify="between" gap={8} align="center">
            <Time time={time.start} className={cls.start} />
            <svg className={cls.timeLine}>
                <mask id="lineMask">
                    <rect width={"100%"} height={"100%"} fill="white" />
                    <rect className={cls.mask} />
                </mask>
                <circle className={cls.leftPoint} cy="50%" />
                <circle className={time.end ? cls.rightPoint : cls.rightPointCont} cy="50%" />
                <rect className={cls.line} />
            </svg>
            {time.end ? (
                <Time time={time.end} className={cls.end} />
            ) : (
                <span className={classNames(cls.time, [cls.end])}>
                    по настоящее<br />время
                </span>
            )
            }
        </HStack>
    )
};

export default memo(forwardRef(TimeLine));