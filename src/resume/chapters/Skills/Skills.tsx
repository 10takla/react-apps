import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useImperativeHandle, useRef } from 'react';
import SvgStar from "S/assets/icons/star.svg";
import { VStack } from "S/ui/Stack";
import { skills } from 'resume/shared/const/info';
import { langContext, T } from 'resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { classNames } from 'src/shared/lib/classNames/classNames';
import getRgbGradient from 'src/shared/lib/getRgbGradient/getRgbGradient';
import { HStack } from 'src/shared/ui/Stack';
import Tag from "src/shared/ui/Stack/Tag/Tag";
import cls from './Skills.module.scss';
import SkillLine from './ui/SkillLine/SkillLine';
import Highlight from 'resume/shared/ui/Hightlight/Hightlight';
import { useLocation, useNavigate } from 'react-router-dom';

type Component = 'ol';
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
        <ol
            className={classNames(cls.Skills, [className])}
            ref={skillsRef}
            {...otherProps}
        >
            {
                skills.map(({block, skills}, i) => (
                    <VStack className={cls.skillBlock}
                        key={i}>
                        <li>{block}:</li>
                        <HStack tag="ul" className={cls.skills}>
                            {skills.map((skill, i) => (
                                <Highlight id={skill.isId && `${skill.name}`} className={cls.skill} key={i}>
                                    <HStack className={cls.skill} key={i} tag="li" align="center"
                                        style={{ "--color": getRgbGradient(skill.stars, { saturation: 60 }) }}
                                    >
                                        <Tag
                                            className={cls.name}
                                            tag={skill.link ? "a" : "div"} href={skill.link}
                                        >
                                            {skill.en ? <T ru={skill.name} en={skill.en} /> : skill.name}
                                        </Tag>
                                        {"level" in skill ? skill.level :
                                            <div className={cls.stars}>
                                                <HStack className={cls.backGround}>
                                                    {new Array(5).fill(null).map((_, i) => (
                                                        <SvgStar key={i} />
                                                    ))}
                                                </HStack>
                                                <HStack className={cls.frontGround}>
                                                    {new Array(skill.stars).fill(null).map((_, i) => (
                                                        <SvgStar key={i} />
                                                    ))}
                                                </HStack>
                                            </div>
                                        }
                                    </HStack>
                                </Highlight>
                            ))}
                        </HStack>
                    </VStack>
                ))}
            <SkillLine className={cls.skillLine} />
        </ol>
    )
};

export default memo(forwardRef(Skills));