import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, useState, useMemo } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Education.module.scss';
import Books from '../Books/Books';
import TimeLine from 'src/resume/shared/ui/TimeLine/TimeLine';
import { educs } from 'resume/shared/const/info';
import { langContext } from 'src/resume/shared/ui/ToggleLanguage/ToggleLanguage';

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
    const [t] = useContext(langContext);

    return (
        <VStack
            className={classNames(cls.Education, [className])}
            ref={educationRef}
            {...otherProps}
        >
            {educs.map((u, i) => (
                <VStack className={cls.place} key={i} gap={4}>
                    <h4><a href={u.univercity.link}>{t(u.univercity.name)}</a></h4>
                    <VStack className={cls.descript}>
                        <i><a href={u.department.link}>{t(`Кафедра ${u.department.name}`)}</a></i>
                        <span>
                            {t(u.degree)}
                            <span style={{ marginLeft: "0.4em" }}><b>{u.speciality.number}</b> "{t(u.speciality.name)}"</span>
                        </span>
                    </VStack>
                    <TimeLine className={cls.timeLine} time={u.time} />
                </VStack>
            ))}
        </VStack>
    )
};

export default memo(forwardRef(Education));