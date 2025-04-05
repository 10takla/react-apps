import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './SkillLine.module.scss';
import { skills } from 'resume/shared/const/info';
import getRgbGradient from 'src/shared/lib/getRgbGradient/getRgbGradient';
import Tag from 'src/shared/ui/Stack/Tag/Tag';
import { langContext, T } from 'src/resume/shared/ui/ToggleLanguage/ToggleLanguage';
import SvgStar from "S/assets/icons/star.svg";

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface SkillLineProps extends ComponentProps<Component> {

}

const SkillLine = (props: SkillLineProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const skillLineRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => skillLineRef.current,
    );

    return (
        <VStack
            className={classNames(cls.SkillLine, [className])}
            ref={skillLineRef}
            tag="ol"
            {...otherProps}
        >
            {new Array(5).fill(null).map((_, i) => (
                <HStack className={cls.lineBlock} key={i} align="center" justify="end"
                    style={{
                        "--i": i,
                        "--color": getRgbGradient(5 - i, {saturation: 60})
                    }}
                >
                    <HStack tag="span" align="center">
                        {[
                            <T en="Advanced" children="Продвинутый" />,
                            <T en="Developing" children="Развивающийся" />,
                            <T en="Intermediate" children="Средний" />,
                            <T en="Beginner" children="Начинающий" />,
                            <T en="Novice" children="Новичок" />
                        ][i]}
                        <HStack tag="span" justify="center"
                            align="center" >
                            <SvgStar />
                            <b>{5 - i}</b>
                        </HStack>
                    </HStack>
                    <div className={cls.line} />
                </HStack>
            ))}
        </VStack>
    )
};

export default memo(forwardRef(SkillLine));