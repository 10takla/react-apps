import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useRef } from 'react';
import Svg from "S/ui/Kit/Svg/Svg";
import { VStack } from "S/ui/Stack";
import { skills } from 'src/resume/info';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import Tag from "src/shared/ui/Stack/Tag/Tag";
import cls from './Skills.module.scss';


type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface SkillsProps extends ComponentProps<Component> {

}

const Skills = (props: SkillsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const skillsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => skillsRef.current,
    );

    return (
        <VStack
            className={classNames(cls.Skills, [className])}
            ref={skillsRef}
            tag="ol" gap={8}
            {...otherProps}
        >
            {Object.entries(skills).map(([block, skills]) => (
                <VStack className={cls.skillBlock} >
                    <li>{block}</li>
                    <HStack tag="ul" gap={8} className={cls.skills}>
                        {skills.map(skill => (
                            <HStack tag="li" className={cls.skill} align="center" gap={4}>
                                <Tag
                                    tag={skill.link ? "a" : "div"} href={skill.link}
                                >
                                    {skill.name}
                                </Tag >
                                <div className={cls.stars}>
                                    <HStack>
                                        {new Array(5).fill(null).map((i) => (
                                            <Svg path="/icons/star" />
                                        ))}
                                    </HStack>
                                    <HStack className={cls.backGround}>
                                        {new Array(skill.stars).fill(null).map((i) => (
                                            <Svg path="/icons/star" />
                                        ))}
                                    </HStack>
                                </div>
                            </HStack>
                        ))}
                    </HStack>
                </VStack>
            ))}
        </VStack>
    )
};

export default memo(forwardRef(Skills));