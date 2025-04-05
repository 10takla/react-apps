import { cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { Ed, glossary } from 'resume/shared/const/info';
import { T } from 'src/resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Block from 'src/resume/shared/ui/Block/Block';
import PetProjects from 'src/resume/ui/Projects/Projects';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './Experience.module.scss';
import LeetCode from "resume/shared/assets/imgs/leet code.svg"
import CodeWars from "resume/shared/assets/imgs/codewars.svg"
import TimeLine, { TimeLength, TimeLineWithLength } from 'src/resume/shared/ui/TimeLine/TimeLine';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image';
import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import { listStyleType } from 'html2canvas/dist/types/css/property-descriptors/list-style-type';
import { backgroundOrigin } from 'html2canvas/dist/types/css/property-descriptors/background-origin';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ExperienceProps extends ComponentProps<Component> {

}

export const G = ({ children }: { children: keyof typeof glossary }) => {
    let el = glossary[children];
    return (
        <a href={el.link}>{children}</a>
    )
}

export const L = ({ children }: { children: any }) => {
    return (
        <code className={cls.lang}>{children}</code>
    )
}

const Experience = (props: ExperienceProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const experienceRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => experienceRef.current,
    );

    const list = [
        <div><T
            en={<>I've been developing in <L>rust</L> for over a year</>}
            children={<>Веду разработку на языке <L>rust</L> больше года.</>}
        /></div>,
        <Block
            head={<T en="Projects" children="Опыт работы" />}>
            <VStack tag="ol" style={{
                "padding-left": "1em",
            }}>
                {[
                    [
                        "Mertech",
                        <T
                            en={<>software development for commodity equipment</>}
                            children={<>разработка программного обеспечения для товарного оборудования</>}
                        />,
                        ["April 2024", "Febrary 2025"],
                        [<T ru="Реализовал решение по оптимизации процессов, что позволило сократить время обработки данных на 30%." en="Implemented a process optimization solution that reduced data processing time by 30%." />, <T ru="Внедрил модуль для быстрого обновления системы, обеспечив стабильность и удобство поддержки." en="Deployed a rapid update module that ensured system stability and ease of maintenance." />, <T ru="Совместными усилиями с командой улучшил ключевые бизнес-процессы, повысив надежность работы продукта." en="Collaborated with the team to enhance core business processes, increasing product reliability." />],
                        [
                            "Rust",
                            "Serde",
                            "Axum|REST",
                            "Jni|C FFI",
                            "1С",
                            "Docker|Bash",
                            "Gitlab|Github Actions|Gitlab CI/CD",
                        ]
                    ],

                    [
                        <>
                            QBDevelopment
                            {" "}
                            <T
                                en="(StartApp)"
                                children="(Стартап)"
                            />
                        </>,
                        <T
                            en={<>blockchain service development</>}
                            children={<>разработка блокчейн сервисов</>}
                        />,
                        ["December 2024", "January 2025"],
                        [
                            <T ru="В условиях сжатых сроков участвовал в создании цифрового решения для проведения интерактивных мероприятий." en="Contributed under tight deadlines to develop a digital solution for interactive events." />, <T ru="Содействовал интеграции фронтенд и бэкенд компонентов, ускорив вывод продукта на рынок." en="Facilitated the integration of front-end and back-end components, expediting the product's market launch." />, <T ru="Проявил инициативу в улучшении внутренних процессов, что повысило общую эффективность команды." en="Took the initiative to improve internal processes, enhancing overall team efficiency." />],
                        [
                            "FullStack - Rust|React",
                            "Actix|REST",
                            "Sqlx",
                            "Github|GitHub Projects",
                            "Docker|Bash"
                        ]
                    ],
                    [
                        <T
                            en="E-commerce company (online store)"
                            children="E-commerce компания (интернет-магазин)"
                        />,
                        <T
                            en="development of services in Rust to improve server efficiency in online commerce"
                            children="разработка сервисов на Rust для повышения эффективности серверов в онлайн-торговле"
                        />,
                        ["Jule 2023", "January 2024"],
                        [<T ru="Принял участие в оптимизации критичных участков системы, что заметно снизило время отклика сервиса." en="Participated in optimizing critical parts of the system, significantly reducing service response time." />, <T ru="Поддержал переход от устаревших решений к современным подходам, улучшив производительность продукта." en="Supported the transition from outdated solutions to modern approaches, boosting product performance." />, <T ru="В рамках проекта внес вклад в повышение стабильности системы, что способствовало росту эффективности онлайн-торговли." en="Contributed to enhancing system stability, fostering increased efficiency in online retail." />],
                        [
                            "Rust",
                            "Serde",
                            "Axum",
                            "PostgreSQL",
                            "Diesel",
                            "Clap",
                            "Docker",
                            "Github",
                        ]
                    ],
                ]
                    .map(([a, b, c, ...d]) => [a, b, c.map((v) => new Date(v)), ...d])
                    .map(([name, a, [start, end], e, b]) => (
                        <li>
                            <VStack gap={2} justify="between" align="start" style={{ width: "100%" }}>
                                <span>
                                    <b>{name}</b>{" — "}
                                    {a}.
                                </span>
                                <TimeLineWithLength
                                    timeLineProps={{
                                        className: cls.timeLine,
                                        style: {
                                        },
                                        lineProps: {
                                            style: {
                                                width: "10em",
                                            }
                                        }
                                    }}
                                    style={{
                                        display: "flex",
                                        "align-items": "center",
                                        whiteSpace: "nowrap",
                                        // width: "30em",
                                    }}
                                    time={{ start, end }}
                                />
                                <VStack className={cls.descrips} tag="ul">
                                    {e.map((v, i) => <li key={i}>{v}</li>)}
                                </VStack>
                                <HStack tag="ul"
                                    style={{
                                        "flex-wrap": "wrap",
                                        "padding-left": "2em",
                                        "gap": "0.5em 1.9em",
                                    }}
                                >
                                    {b.map((v, i) => <li key={i}>{v}</li>)}
                                </HStack>
                            </VStack>
                        </li>
                    ))}
            </VStack>
        </Block>,
        <Block
            head={<T en="Previous experience" children="Предыдущий опыт" />}
        >
            <T
                en={
                    <div>
                        Languages I have learnt: <L>Python</L>, <L>TypeScript</L>, <L>PHP</L>.
                        <br />
                        Previously mainly learnt <L>Python</L> and  <L>TypeScript</L>:
                        <VStack tag="ul">
                            <li><L>Python</L> at Junior level.<br />
                                <ol>mastered <L>Django</L>, wrote a <a href="https://github.com/10takla/planet-backend">server</a></ol>
                            </li>
                            <li><L>React</L>/<L>TypeScript</L>/<L>Redux</L> at Junior-Middle level.
                                <ol>completed the <a href='https://ulbitv.ru/frontend'>course</a> on which I wrote the <a href="https://github.com/10takla/ulbi">project</a></ol>
                            </li>
                        </VStack>
                    </div>
                }
                children={
                    <div>
                        Языки, которые я изучал: <L>Python</L>, <L>TypeScript</L>:
                        <VStack tag="ul">
                            <li><L>Python</L> на уровне Junior.<br />
                                <ol>осваивал <L>Django</L>, писал <a href="https://github.com/10takla/planet-backend">сервер</a></ol>
                            </li>
                            <li><L>React</L>/<L>TypeScript</L>/<L>Redux</L> на уровне Junior-Middle.
                                <ol>прошел <a href='https://ulbitv.ru/frontend'>курс</a> на котором писал <a href="https://github.com/10takla/ulbi">проект</a></ol>
                            </li>
                        </VStack>
                    </div>
                }
            />
        </Block>,
        <div>
            <span><T
                en="Used in practice:"
                children="Использовал на практике:"
            /></span>
            <ul>
                {[
                    <>
                        {
                            (() => {
                                const v = [
                                    "axum",
                                    "actix",
                                    "diesel",
                                    "sqlx",
                                    "serde",
                                    "utopia"
                                ];
                                const l = v.length - 1;
                                return [...v].map((v, i) => (
                                    <>
                                        <L><G>{v}</G></L>
                                        {i == l ? null : "|"}
                                    </>
                                ))
                            })()
                        }
                    </>,
                    <><L>wasm</L>|<L><G>wasm-bindgen</G></L></>,
                    "ffi к c|c++|python|java",
                    <T
                        en={<>Concurrency at <u>atomics</u> level, <u>memory ordering</u>, <u>futex</u> system calls</>}
                        children={<>Concurrency на уровне <u>atomics</u>, <u>memory ordering</u>, системные вызовы <u>futex</u></>}
                    />,
                    <T
                        en={<>Asynchronous programming, particularly <L><G>tokio</G></L></>}
                        children={<>Асинхронное программирование, в частности <L><G>tokio</G></L></>}
                    />,
                    <T
                        en={<>Creating CLI applications, particularly <L><G>clap</G></L></>}
                        children={<>Создание CLI-приложений, в частности <L><G>clap</G></L></>}
                    />
                ].map((c, i) => (
                    <li key={i}>{c}</li>
                ))}
            </ul>
            <T
                en="I translate all copy-paste code into procedural, declarative macros."
                children={"Весь \"копипаст\" кода перевожу в процедурные, декларативные макросы."}
            />
            <br />
            <T
                en={<>
                    <>I always accompany all logically important code with <u>unit</u> and integration tests.</>
                </>}
                children={<>
                    Весь логически важный код всегда сопровождаю <u>unit</u> и интеграционными тестами.
                </>}
            />
        </div>,
        <div>
            <T
                en={<>I have experience working with <L><G>rustc</G></L> compiler. At the moment I am  <a href="https://github.com/10takla/rust">working</a> on modification of the <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">overlap rule</a>.</>}
                children={<>Имею опыт работы с компилятором <L><G>rustc</G></L>. На данный момент <a href="https://github.com/10takla/rust">работаю</a> над модификацией <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">правила перекрытий</a>.</>}
            />
            <br />
        </div>,
        <HStack tag="span" align="ыефке" gap={8}>
            <span>
                <T
                    en={<>
                        I know algorithms and data structures, how to find optimal solutions for memory and CPU time. I constantly strive for <u>O(log n)</u> and <u>O(n)</u> complexity of algorithms.
                    </>}
                    children={<>
                        Знаю алгоритмы и структуры данных , как находить оптимальные решения для памяти и процессорного времени. Постоянно стремлюсь к <u>O(log n)</u> и <u>O(n)</u> сложности алгоритмов.
                    </>}
                />
            </span>
            <VStack className={cls.algoLinks} align="center">
                <a href="https://leetcode.com/u/10takla/">
                    <LeetCode id="leetcode" />
                </a>
                <a href="https://www.codewars.com/users/10takla">
                    <CodeWars id="codewars" />
                </a>
            </VStack>
        </HStack>,
        <div>
            <T
                en="Skilled in:"
                children="Умею:"
            />
            <VStack tag="ul">
                <li>
                    <T
                        en={<>Read, understand, and write rust documentation;</>}
                        children={<>Читать, понимать, и писать <L>rust</L>-овскую документацию;</>}
                    />
                </li>
                <li>
                    <T
                        en={<>Create and manage cargo packages in </>}
                        children={<>Создавать и управлять пакетами <L>cargo</L> в системе </>}
                    />
                    <L><a href="https://crates.io/">crates.io</a></L>/<L><a href="https://github.com/10takla">github</a></L>.
                </li>
            </VStack>
        </div>,
        <div>
            <T
                en="I plan my workflow carefully. I use trackers such as "
                children="Грамотно планирую свой рабочий процесс. Использую трекеры, такие как "
            />
            <a href="https://www.jetbrains.com/youtrack/">YouTrack</a>
            <T
                en=" to keep track of tasks completed."
                children=", для отслеживания выполненных задач."
            />
        </div>,
        <Block head={<T en="Pet projects" children="Pet-проекты" />} >
            <PetProjects />
        </Block>
    ];
    return (
        <VStack
            className={classNames(cls.Experience, [className])}
            ref={experienceRef}
            // justify="between"
            {...otherProps}
        >
            {list.map((item, i) => (
                cloneElement(
                    item,
                    {
                        key: i,
                        className: classNames(cls.item, [item.props.className]),
                    }
                )
            ))}
        </VStack >
    )
};

export default memo(forwardRef(Experience));