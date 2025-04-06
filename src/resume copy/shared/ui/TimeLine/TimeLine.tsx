import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, useEffect, useState, ComponentPropsWithRef } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './TimeLine.module.scss';
import { Ed } from "../../const/info"
import { langContext, T } from '../ToggleLanguage/ToggleLanguage';
import { SvgProps } from '@react-three/drei';

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
    const [_, [lang]] = useContext(langContext);
    return (
        <HStack className={classNames(cls.time, [className])}
            tag="span" {...otherProps}
        >
            {`${time.toLocaleString(lang === "ru" ? 'ru-RU' : "en-EN", { month: 'long' })}`
                .charAt(0).toUpperCase() +
                `${time.toLocaleString(lang === "ru" ? 'ru-RU' : "en-EN", { month: 'long' })}`.slice(1)}
            {" "}
            {time.getFullYear()}
        </HStack>
    )
}

interface TimeLineProps extends ComponentProps<Component> {
    time: Ed["time"]
    timeProps?: TimeProps
    lineProps?: ComponentProps<'svg'>
}

const TimeLine = (props: TimeLineProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        time,
        timeProps,
        lineProps,
        ...otherProps
    } = props;

    const timeLineRef = useRef<ElRef>(null);
    // useImperativeHandle<ElRef, ElRef>(
    //     ref,
    //     () => timeLineRef.current,
    // );

    return (
        <HStack
            className={classNames(cls.TimeLine, [className, "timeLine"])}
            ref={timeLineRef}
            justify="between" align="center"
            {...otherProps}
        >
            <Time {...timeProps} className={classNames(cls.start, [timeProps?.className])} time={time.start} />
            <svg {...lineProps} className={classNames(cls.timeLine, [lineProps?.className])}>
                {/* <mask id="lineMask">
                    <rect width="100%" height="100%" fill="white" />
                    <rect className={cls.mask} />
                </mask> */}
                <circle className={cls.leftPoint} cy="50%" />
                <circle className={time.end ? cls.rightPoint : cls.rightPointCont} cy="50%" />
                <rect className={cls.line} />
            </svg>
            {time.end ? (
                <Time {...timeProps} className={classNames(cls.end, [timeProps?.className])} time={time.end} />
            ) : (
                <span {...timeProps} className={classNames(cls.time, [cls.end, timeProps?.className])}>
                    <T
                        en={<>To date</>}
                        children={<>По настоящее время</>}
                    />
                </span>
            )
            }
        </HStack>
    )
};

export default memo(forwardRef(TimeLine));

export const TimeLength = ({ time: { start, end } }: Record<"time", Record<"start" | "end", Date>>) => {
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const v = months % 10;
    const args = {
        ru:
            months > 4 && months <= 20 ?
                "месяцев" :
                v == 1 ?
                    "месяц" :
                    v > 1 && v <= 4 ?
                        "месяца" :
                        "месяцев",
        en: v == 1 ?
            "month"
            :
            "months"
    };

    return <span style={{ color: "#6e6e6e" }}>
        ({months} {
            <T
                {...args}
            />
        })
    </span>
}


interface TimeLineWithLengthProps extends ComponentPropsWithRef<'span'> {
    timeLineProps?: Omit<ComponentProps<typeof TimeLine>, 'time'>,
    time: ComponentProps<typeof TimeLine>["time"]
}

export const TimeLineWithLength = forwardRef((props: TimeLineWithLengthProps, ref: ForwardedRef<HTMLSpanElement>) => {
    const {
        timeLineProps = {},
        time,
        ...otherProps
    } = props;
    return (
        <span className={cls.TimeLineWithLength} {...otherProps} ref={ref}>
            <TimeLine time={time} {...timeLineProps} />
            {" "}
            <TimeLength time={{
                ...time,
                end: time.end || new Date()
            }} />
        </span>
    )
});