import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Education.module.scss';
import Books from '../Books/Books';
import TimeLine from 'src/resume/shared/ui/TimeLine/TimeLine';
import { educs } from 'src/resume/info';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface EducationProps extends ComponentProps<Component> {

}

const Education = (props: EducationProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const educationRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => educationRef.current,
    );

    return (
        <VStack
            className={classNames(cls.Education, [className])}
            ref={educationRef}
            {...otherProps}
        >
            {educs.map((u) => (
                <VStack className={cls.place} gap={16}>
                    <h4><a href={u.univercity.link}>{u.univercity.name}</a></h4>
                    <VStack className={cls.descript}>
                        <i><a href={u.department.link}>Кафедра {u.department.name}</a></i>
                        <span>
                            {u.degree}
                            <span style={{ marginLeft: "0.4em" }}><b>{u.speciality.number}</b> "{u.speciality.name}"</span>
                        </span>
                    </VStack>
                    <p>
                        <TimeLine time={u.time} />
                    </p>
                </VStack>
            ))}
        </VStack>
    )
};

export default memo(forwardRef(Education));