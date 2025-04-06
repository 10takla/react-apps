import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Learning.module.scss';
import Books from './ui/Books/Books';
import Education from './ui/Education/Education';
import { langContext, T } from 'src/resume copy/shared/ui/ToggleLanguage/ToggleLanguage';
import TimeLine, { TimeLength, TimeLineWithLength } from 'src/resume copy/shared/ui/TimeLine/TimeLine';
import { experienceList } from '../Experience/Experience';
import { Chapter } from 'src/resume copy';
import Skills from '../Skills/Skills';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface LearningProps extends ComponentProps<Component> {

}

const Learning = (props: LearningProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const learningRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => learningRef.current,
    );
    const [t] = useContext(langContext);

    const lefts = [
        {
            head: <T ru="Образование" en="Education" />,
            body: <Education />
        },
        // {
        //     body: (() => {
        //         const end = experienceList[experienceList.length - 1].time[0];
        //         let start = new Date(end);
        //         start.setMonth(start.getMonth() - 14);
        //         const time = {
        //             start,
        //             end: new Date(end)
        //         };

        //         return <p>
        //             <T
        //                 ru="Больше года активного обучения языку rust и его экосистемы"
        //                 en="Over a year of actively learning the Rust language and its ecosystem" />
        //             {", "}
        //             <T
        //                 ru="фокусируясь на разработке высокопроизводительного и безопасного ПО"
        //                 en="with a focus on developing high-performance and safe software"
        //             />
        //             {". "}
        //             <small>
        //                 <TimeLineWithLength
        //                     timeLineProps={{
        //                         tag: "span",
        //                         className: cls.timeLine,
        //                         timeProps: {
        //                             style: { whiteSpace: "nowrap" }
        //                         },
        //                         style: { width: "17em", gap: "0.3em" },
        //                     }}
        //                     time={time}
        //                 />
        //             </small>
        //             {", "}
        //             <br />
        //             <T
        //                 children={`В стремлении к глубокому освоению Rust, я тщательно изучил ключевые руководства и публикации от сообщества и разработчиков языка.`}
        //                 en={`Driven by the goal of mastering Rust in depth, I have thoroughly studied key guides and publications from the Rust community and its core developers.`} />
        //         </p>;
        //     })(),
        // },
        // {
        //     head: <T ru="Навыки" en="Skills" />,
        //     body: <Skills />
        // }
        // {
        //     head: <T ru="Книги" en="Books" />,
        //     body: <Books />
        // }
    ];

    return (
        // <VStack
        //     className={classNames(cls.Learning, [className])}
        //     ref={learningRef}
        //     {...otherProps}
        // >
            <>
                {lefts.map(({ head, body }, i) => (
                    <Chapter key={i} head={head}>
                        {body}
                    </Chapter>
                ))}
            </>
        // </VStack>
    )
};

export default memo(forwardRef(Learning));