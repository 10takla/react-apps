import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useImperativeHandle, useRef } from 'react';
import SvgStar from "S/assets/icons/star.svg";
import { VStack } from "S/ui/Stack";
import { skills } from 'resume/shared/const/info';
import { langContext, T } from 'src/resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { classNames } from 'src/shared/lib/classNames/classNames';
import getRgbGradient from 'src/shared/lib/getRgbGradient/getRgbGradient';
import { HStack } from 'src/shared/ui/Stack';
import Tag from "src/shared/ui/Stack/Tag/Tag";
import cls from './Skills.module.scss';
import Outline from 'src/resume/shared/ui/kit/Outline/Outline';
import { transformPath } from 'html2canvas/dist/types/render/path';

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
    const [t] = useContext(langContext);

    return (
        <HStack
            className={classNames(cls.Skills, [className])}
            ref={skillsRef}
            tag="ol"
            // justify="between"
            {...otherProps}
        >
            {
                Object.entries(skills).map(([block, skills], i) => (
                    <VStack className={cls.skillBlock} style={block === "Frontend" ? {
                        transform: "translateX(-7em)"
                    } : {}} key={i}>
                        <li>{t(block)}:</li>
                        <Outline>
                            <HStack tag="ul" className={cls.skills}>
                                {skills.map((skill, i) => {
                                    if (skill.level) {
                                        return <HStack className={cls.skill} key={i} tag="li" align="center"
                                            style={{ background: getRgbGradient(2, { saturation: 60 }) }}
                                        >
                                            <Tag
                                                className={cls.name}
                                                tag={skill.link ? "a" : "div"} href={skill.link}
                                            >
                                                <T en={"English"}>{skill.name}</T>
                                            </Tag >
                                            {skill.level}
                                        </HStack>
                                    }

                                    return <HStack className={cls.skill} key={i} tag="li" align="center"
                                        style={{ background: getRgbGradient(skill.stars, { saturation: 60 }) }}
                                    >
                                        <Tag
                                            className={cls.name}
                                            tag={skill.link ? "a" : "div"} href={skill.link}
                                        >
                                            {skill.name}
                                        </Tag >
                                        <div className={cls.stars} >
                                            <HStack className={cls.backGround}>
                                                {new Array(5).fill(null).map((_, i) => (
                                                    <SvgStar key={i} />
                                                ))}
                                            </HStack>
                                            <HStack className={cls.frontGround}  >
                                                {new Array(skill.stars).fill(null).map((_, i) => (
                                                    <SvgStar key={i} />
                                                ))}
                                            </HStack>
                                        </div>
                                    </HStack>
                                })}
                            </HStack>
                        </Outline>
                    </VStack>
                ))}
        </HStack>
    )
};

export default memo(forwardRef(Skills));