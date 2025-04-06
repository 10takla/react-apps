import { cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { glossary } from 'src/resume copy/shared/const/info';
import { T } from 'src/resume copy/shared/ui/ToggleLanguage/ToggleLanguage';
import Block from 'src/resume copy/shared/ui/Block/Block';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './Experience.module.scss';
import LeetCode from "resume/shared/assets/imgs/leet code.svg"
import CodeWars from "resume/shared/assets/imgs/codewars.svg"
import { TimeLineWithLength } from 'src/resume copy/shared/ui/TimeLine/TimeLine';
import { HightlightLink } from 'src/resume copy/shared/ui/Hightlight/Hightlight';
import AboutMe from '../AboutMe/AboutMe';
import PetProject from './PetProject';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ExperienceProps extends ComponentProps<Component>, Pick<ComponentProps<typeof AboutMe>, "demo"> {

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

export const experienceList = [
    {
        name: "Mertech",
        position: <T ru="Rust Разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка программного обеспечения для товарного оборудования"
            en="software development for retail equipment"
        />,
        time: ["November 2023"],
        achievements: [
            [
                <T
                    ru="Создал универсальную библиотеку для динамической генерации этикеток для приложений печатающих весов, обеспечив гибкую адаптацию под различные аппаратные платформы."
                    en="Developed a universal library for dynamic label generation for applications of weighing scales, ensuring flexible adaptation to various hardware platforms."
                />,
                [
                    <T
                        ru={<>Построил <u>гибкую</u> и <u>расширяемую</u> модель отрисовки элементов этикеток.</>}
                        en={<>Designed a <u>flexible</u> and <u>extensible</u> model for rendering label elements.</>}
                    />,
                    <T
                        ru="Внедрил новый интерфейс для более гибкого и интенсивного взаимодействия, что упростило работу приложений весов и ускорило разработку."
                        en="Introduced a new interface for more flexible and intensive interaction, simplifying the operation of scale applications and speeding up development."
                    />,
                    <T
                        ru={<>Организовал полное <u>профилирование</u> и <u>бенчмаркинг</u> системы. Выявил узкие места в производительности и оптимизировал их, ускорив ключевые процессы и сократив время генерации этикеток на <u>40%</u>.</>}
                        en={<>Organized full system <u>profiling</u> and <u>benchmarking</u>. Identified performance bottlenecks and optimized them, accelerating key processes and reducing label generation time by <u>40%</u>.</>}
                    />,
                ]
            ],
            <T
                ru="Автоматизировал и оптимизировал процессы сборки и тестирования, сократив время релизов и повысив стабильность конечного продукта."
                en="Automated and optimized build and testing processes, reducing release time and increasing final product stability."
            />,
            [
                <T
                    ru="Разработка драйверов, связывающиe устройства товарного оборудования с корпоративной системой 1С. Позволило исключить ручной ввод при работе с устройствами и минимизировать риск ошибок при учёте."
                    en="Developed drivers linking retail equipment devices with the corporate 1C system, eliminating manual input when working with devices and minimizing accounting errors."
                />,
                [
                    <T
                        ru={<><u>Инициировал</u> задачу реализовать дополнительный функционал под специфику устройства, помимо стандартного для 1C компонент.</>}
                        en={<><u>Initiated</u> the task of implementing additional functionality specific to the device, beyond the standard 1C component.</>}
                    />,
                    <T
                        ru="Реализовал полное покрытие тестами."
                        en="Achieved full test coverage."
                    />
                ]
            ]
        ],
        stack: [
            { name: "Rust", id: "Rust" },
            { name: "Serde", id: "Serde" },
            [{ name: "Axum", id: "Axum" }, { name: "REST", id: "REST API" }],
            [{ name: "Docker", id: "Docker" }, { name: "Bash", id: "Bash" }],
            [{ name: "Gitlab", id: "GitLab" }, { name: "GitHub Actions", id: "GitHub Actions" }, { name: "GitLab CI/CD", id: "GitLab CI/CD" }],
            ["Jni", "C FFI"], "1С",
        ]
    },
    {
        name: <T
            ru="ВЕБСИСТЕМС, E-commerce компания (интернет-магазин)"
            en="WEBSYSTEMS, E-commerce company (online store)"
        />,
        position: <T ru="Rust Разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка сервисов на Rust для повышения эффективности серверов в онлайн-торговле"
            en="development of services in Rust to improve server efficiency in online commerce"
        />,
        time: ["Febrary 2023", "September 2023"],
        achievements: [
            <T
                ru={<>Осуществил перенос <u>высоконагруженных</u> сервисов с Django на Rust, добившись существенного ускорения обработки данных в пиковые периоды.</>}
                en={<>Migrated <u>high-load</u> services from Django to Rust, achieving significant acceleration of data processing during peak periods.</>}
            />,
            <T
                ru="Реализовал набор вспомогательных серверных приложений и консольных утилит для перераспределения нагрузки с основных Django-сервисов."
                en="Implemented a set of auxiliary server applications and console utilities to offload core Django services."
            />,
            <T
                ru="Разработал низкоуровневые библиотеки для бесшовной интеграции с Python, что снизило накладные расходы при ускорении сервисов."
                en="Developed low-level libraries for seamless integration with Python, reducing overhead while speeding up services."
            />,
            <T
                ru={<>Ввел <u>комплексное тестирование</u> и мониторинг, что снизило риски неожиданных сбоев и упростило масштабирование проекта.</>}
                en={<>Introduced <u>comprehensive testing</u> and monitoring, reducing the risk of unexpected failures and simplifying project scaling.</>}
            />,
        ],
        stack: [
            { name: "Rust", id: "Rust" },
            { name: "Serde", id: "Serde" },
            { name: "Axum", id: "Axum" },
            "PostgreSQL",
            { name: "Diesel", id: "Diesel" },
            "Clap",
            { name: "Docker", id: "Docker" },
            { name: "GitHub", id: "GitHub" }
        ]
    }
];

const demoEl = {
    name: <>
        QBDevelopment
        {" "}
        (
        <T
            ru="Стартап"
            en="StartApp"
        />
        {", "}
        <T
            ru="парт-тайм"
            en="part-time"
        />
        )
    </>,
    description: <T
        ru="разработка блокчейн сервисов"
        en="blockchain service development"
    />,
    time: ["December 2024", "Febrary 2025"],
    achievements: [
        <T
            ru="Разработал сервис для автоматизации розыгрышей и платежей, улучшив пользовательский опыт и снизив ручные операции."
            en="Developed a service for automating giveaways and payments, improving user experience and reducing manual operations."
        />,
        <T
            ru="Проектировал масштабируемую серверную архитектуру на Rust/Actix, обеспечив эффективное добавление новых функций в высоконагруженной среде."
            en="Designed a scalable server architecture using Rust/Actix, enabling efficient addition of new features in a high-load environment."
        />,
        <T
            ru="Внедрил систему контроля качества кода с автоматизированным статическим анализом и интеграционные проверки в CI."
            en="Implemented a code quality control system with automated static analysis and integration checks in CI."
        />
    ],
    stack: [
        <a>FullStack -
            <HightlightLink id={"Rust"}>
                Rust
            </HightlightLink>
            |<HightlightLink id={"React"}>
                React
            </HightlightLink></a>,
        [{ name: "Actix", id: "Actix" }, { name: "REST", id: "REST API" }],
        "Sqlx",
        [{ name: "GitHub", id: "GitHub" }, "GitHub Projects"],
        [{ name: "Docker", id: "Docker" }, { name: "Bash", id: "Bash" }]
    ]
};


const PetProjects = () => {
    const projects = [
        {
            name: "abstract",
            descr: <T
                ru="Лексический анализатор, парсер и ast."
                en="My own lexer, parser, and ast."
            />,
            githubLink: "abstract"
        },
        {
            name: "std-reset",
            descr: <T
                ru="Множество переработанных реализаций стандартной библиотеки, а также новые решения для простого кодинга."
                en="Many reworked implementations from the standard library, as well as new solutions for easy coding."
            />
        },
        {
            name: "lf-structs",
            descr: <T
                ru="Различные реализации свободных блокировок и атомарных структур."
                en="Various implementations of free locking and atomicity of data structures."
            />
        },
        // {
        //     name: "rust fork",
        //     descr: <T
        //         ru={<>Изменение атрибута <L><G>#[marker]</G></L> и <a href="https://doc.rust-lang.org/reference/items/implementations.html#trait-implementation-coherence">правила перекрытий</a>.</>}
        //         en={<>Changing <L><G>#[marker]</G></L> attribute and <a href="https://doc.rust-lang.org/reference/items/implementations.html#trait-implementation-coherence">overlap rules</a>.</>}
        //     />,
        //     githubLink: "rust"
        // },
        {
            name: "production-project",
            descr: <T
                ru='Web-приложение: Платформа для публикации контента.'
                en='Web application: Platforms for publishing content'
            />,
            githubLink: "ulbi"
        }
    ];
    ;


    return (
        <VStack tag="ol" style={{ "padding-left": "1em", "flex": "1 1 30%" }}>
            {projects.map(p => (
                <li key={p.name}>
                    <a href={`https://github.com/10takla/${p.githubLink || p.name}`}>
                        <L>{p.name}</L>
                    </a>
                    <br />
                    <i style={{ "margin-left": "1em" }}>{p.descr}</i>
                </li>
            ))}
        </VStack>
    )
}

const Experience = (props: ExperienceProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const experienceRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => experienceRef.current,
    );

    const tmp = useMemo(() => {
        const r = [...experienceList];

        !demo && r.splice(1, 0, demoEl)

        return r
    }, [demo]);

    const list = [
        <Block
            head={<T ru="Опыт работы" en="Projects" />}>
            <VStack tag="ol" style={{
                "padding-left": "1em",
                gap: "0.6em"
            }}>
                {tmp
                    .map(({ time, ...other }) => (
                        { ...other, time: time.map((v) => new Date(v)) }
                    ))
                    .map(({
                        name, position, description, time, achievements, stack
                    }, i) => (
                        <li key={i}>
                            <HStack justify="between" align="center">
                                <span>
                                    <b>
                                        {name}
                                        {" "}
                                        <span style={{ color: "#6e6e6e" }}>
                                            ({position})
                                        </span>
                                    </b>
                                </span>
                                <small>
                                    <TimeLineWithLength
                                        timeLineProps={{
                                            style: {
                                                "justify-self": "right",
                                                // "padding": "0.5em",
                                                "box-sizing": "border-box",
                                                "gap": "0.7em",
                                            },
                                            lineProps: {
                                                style: {
                                                    width: "6em",
                                                }
                                            }
                                        }}
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                        time={{ start: time[0], end: time[1] }}
                                    />
                                </small>
                            </HStack>
                            <VStack align="start" style={{ gap: "0.3em" }}>
                                <span>{"— "}{description}.</span>
                                <ul className={cls.achievements}>
                                    {achievements.map((v, i) => (
                                        <li key={i}>
                                            {
                                                Array.isArray(v) ?
                                                    <>
                                                        {
                                                            v.map((v) => (
                                                                Array.isArray(v) ?
                                                                    <ul>
                                                                        {v.map((v) => <li>– {v}</li>)}
                                                                    </ul>
                                                                    :
                                                                    <>* {v}</>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>* {v}</>
                                            }
                                        </li>
                                    ))}
                                </ul>
                                <HStack
                                    tag="ul"
                                    className={classNames(cls.stack, [cls.firstLevel])}
                                    align="center"
                                >
                                    {stack.map((v, i) => {
                                        const El = ({ v }) => {
                                            if (typeof v == "object" && "name" in v && "id" in v) {
                                                return <HightlightLink id={v.id}>
                                                    {v.name}
                                                </HightlightLink>
                                            } else {
                                                return v
                                            }
                                        };

                                        return (
                                            <li key={i}>
                                                {
                                                    Array.isArray(v) ?
                                                        <HStack
                                                            tag="ul"
                                                            className={cls.stack}
                                                            align="center"
                                                        >
                                                            {v.map((item, i) => (
                                                                <>
                                                                    <li>
                                                                        <El v={item} />
                                                                    </li >
                                                                    {i < v.length - 1 && "|"}
                                                                </>
                                                            ))}
                                                        </HStack>
                                                        :
                                                        <El v={v} />
                                                }
                                            </li>
                                        )
                                    })}
                                </HStack>
                            </VStack>
                        </li>
                    ))}
            </VStack>
        </Block >,
        <Block
            head={<T ru="Предыдущий опыт" en="Previous experience" />}
        >
            <T
                ru={
                    <div>
                        Языки, которые я изучал: <L>Python</L>, <L>TypeScript</L>:
                        <VStack tag="ul">
                            <li><L>Python</L> на уровне Junior.<br />
                                <ol>осваивал <L>Django</L>, писал <a href="https://github.com/10takla/planet-backend">сервер</a></ol>
                            </li>
                            <li><L>React</L>/<L>TypeScript</L>/<L>Redux</L> на уровне Junior-Middle.
                                <ol>прошёл <a href='https://ulbitv.ru/frontend'>курс</a>, на котором писал <a href="https://github.com/10takla/ulbi">проект</a></ol>
                            </li>
                        </VStack>
                    </div>
                }
                en={
                    <div>
                        Languages I have learnt: <L>Python</L>, <L>TypeScript</L>:
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
            />
        </Block>,
        <p>
            <span><T
                ru="Использовал на практике:"
                en="Used in practice:"
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
                        ru={<>Concurrency на уровне <u>atomics</u>, <u>memory ordering</u>, системные вызовы <u>futex</u></>}
                        en={<>Concurrency at <u>atomics</u> level, <u>memory ordering</u>, <u>futex</u> system calls</>}
                    />,
                    <T
                        ru={<>Асинхронное программирование, в частности <L><G>tokio</G></L></>}
                        en={<>Asynchronous programming, particularly <L><G>tokio</G></L></>}
                    />,
                    <T
                        ru={<>Создание CLI-приложений, в частности <L><G>clap</G></L></>}
                        en={<>Creating CLI applications, particularly <L><G>clap</G></L></>}
                    />
                ].map((c, i) => (
                    <li key={i}>{c}</li>
                ))}
            </ul>
        </p>,
        <p>
            <T
                ru={<>Имею опыт работы с компилятором <L><G>rustc</G></L>. На данный момент <a href="https://github.com/10takla/rust">работаю</a> над модификацией <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">правила перекрытий</a>.</>}
                en={<>I have experience working with <L><G>rustc</G></L> compiler. At the moment I am  <a href="https://github.com/10takla/rust">working</a> on modification of the <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">overlap rule</a>.</>}
            />
            <br />
        </p>,
        <HStack tag="p" align="start">
            <span>
                <T
                    ru={<>
                        Знаю алгоритмы и структуры данных, как находить оптимальные решения для памяти и процессорного времени. Постоянно стремлюсь к <u>O(log n)</u> и <u>O(n)</u> сложности алгоритмов.
                    </>}
                    en={<>
                        I know algorithms and data structures, how to find optimal solutions for memory and CPU time. I constantly strive for <u>O(log n)</u> and <u>O(n)</u> complexity of algorithms.
                    </>}
                />
            </span>
            <HStack className={cls.algoLinks} align="center">
                <a href="https://leetcode.com/u/10takla/">
                    <LeetCode id="leetcode" />
                </a>
                <a href="https://www.codewars.com/users/10takla">
                    <CodeWars id="codewars" />
                </a>
            </HStack>
        </HStack>,
        <p>
            <T
                ru="Умею:"
                en="Skilled in:"
            />
            <VStack tag="ul">
                <li>
                    <T
                        ru={<>Читать, понимать, и писать </>}
                        en={<>Read, understand, and write </>}
                    />
                    <a href="https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html#how-to-write-documentation">
                        <T
                            ru={<><L>rust</L>-овскую документацию;</>}
                            en={<><L>rust</L> documentation;</>}
                        />
                    </a>
                </li>
                <li>
                    <T
                        ru={<>Создавать и управлять <a href="https://doc.rust-lang.org/cargo/reference/publishing.html">пакетами <L>cargo</L></a> в системах </>}
                        en={<>Create and manage <a href="https://doc.rust-lang.org/cargo/reference/publishing.html"><L>cargo</L> packages</a> in </>}
                    />
                    <L><a href="https://crates.io/">crates.io</a></L>/<L><a href="https://github.com/10takla">github</a></L>.
                </li>
            </VStack>
            <T
                ru={<>Весь "копипаст" кода перевожу в процедурные, декларативные макросы.</>}
                en="I translate all copy-paste code into procedural, declarative macros."
            />
            <br />
            <T
                ru={<>
                    Весь логически важный код всегда сопровождаю <u>unit</u> и интеграционными тестами.
                </>}
                en={<>
                    <>I always accompany all logically important code with <u>unit</u> and integration tests.</>
                </>}
            />
        </p>,
        <p>
            <T
                ru="Грамотно планирую свой рабочий процесс. Использую трекеры, такие как "
                en="I plan my workflow carefully. I use trackers such as "
            />
            <a href="https://www.jetbrains.com/youtrack/">YouTrack</a>
            <T
                ru=", для отслеживания выполненных задач."
                en=" to keep track of tasks completed."
            />
        </p>,
        <Block head={<T ru="Pet-проекты" en="Pet projects" />}>
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
