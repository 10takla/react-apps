import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Learning.module.scss';
import Books from 'src/resume/ui/Books/Books';
import Education from 'src/resume/ui/Education/Education';
import { langContext, T } from 'src/resume/shared/ui/ToggleLanguage/ToggleLanguage';
import TimeLine, { TimeLength, TimeLineWithLength } from 'src/resume/shared/ui/TimeLine/TimeLine';

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
            head: t("Образование"),
            body: <Education />
        },
        {
            _body: (() => {
                const end = "June 2023 14:48 UTC";
                let start = new Date(end);
                start.setMonth(start.getMonth() - 14);
                const time = {
                    start,
                    end: new Date(end)
                };

                return <>
                    <T
                        ru="Больше года активного обучения языка rust и его экосистемы,"
                        en="Over a year of actively learning the Rust language and its ecosystem" />
                    {" "}
                    <TimeLineWithLength
                        timeLineProps={{
                            tag: "span",
                            className: cls.timeLine,
                            timeProps: {
                                style: { whiteSpace: "nowrap" }
                            },
                            style: { width: "15em", gap: "0.3em" },
                        }}
                        time={time}
                    />
                    {" "}
                    <T
                        ru="фокусируясь на разработке высокопроизводительного и безопасного ПО."
                        en="with a focus on developing high-performance and safe software." />
                    <br />
                    <T
                        children={`В стремлении к глубокому освоению Rust, я тщательно изучил ключевые руководства и публикации от сообщества и разработчиков rust.`}
                        en={`Driven by the goal of mastering Rust in depth, I have thoroughly studied key guides and publications from the Rust community and its core developers.`} />
                </>;
            })(),
            get body() {
                return this._body;
            },
            set body(value) {
                this._body = value;
            },
        },
        {
            head: t("Книги"),
            body: <Books />
        }
    ];

    return (
        <VStack
            className={classNames(cls.Learning, [className])}
            ref={learningRef}
            {...otherProps}
        >
            {lefts.map(({ head, body }, i) => (
                <div key={i}>
                    {head && <h3>{head}</h3>}
                    {body}
                </div>
            ))}
        </VStack>
    )
};

export default memo(forwardRef(Learning));