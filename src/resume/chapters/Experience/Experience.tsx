import { cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Ed, glossary, skills } from 'resume/shared/const/info';
import { T } from 'resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Block from 'resume/shared/ui/Block/Block';
import PetProjects from 'resume/chapters/Experience/ui/Projects/Projects';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './Experience.module.scss';
import LeetCode from "resume/shared/assets/imgs/leet code.svg"
import CodeWars from "resume/shared/assets/imgs/codewars.svg"
import TimeLine, { TimeLength, TimeLineWithLength } from 'resume/shared/ui/TimeLine/TimeLine';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image';
import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import { listStyleType } from 'html2canvas/dist/types/css/property-descriptors/list-style-type';
import { backgroundOrigin } from 'html2canvas/dist/types/css/property-descriptors/background-origin';
import Description from 'src/shared/ui/Kit/Description/Description';
import { useLocation, useNavigate } from 'react-router-dom';
import { HightlightLink } from 'resume/shared/ui/Hightlight/Hightlight';
import { e } from 'vite/dist/node/types.d-aGj9QkWt';
import PersonalInfo from '../PersonalInfo/PersonalInfo';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ExperienceProps extends ComponentProps<Component>, Pick<ComponentProps<typeof PersonalInfo>, "demo"> {

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
        description: <T
            ru="разработка программного обеспечения для товарного оборудования"
            en="software development for retail equipment"
        />,
        time: ["November 2023"],
        achievements: [
            <><T
                ru="Разработал универсальную библиотеку для динамической генерации этикеток для приложений печатающих весов, обеспечив гибкую адаптацию под различные аппаратные платформы."
                en="Developed a universal library for dynamic label generation for applications of weighing scales, ensuring flexible adaptation to various hardware platforms."
            />
                <ul>
                    <li><T
                        ru="Оптимизировал алгоритм, сократив время генерации этикеток на 40%."
                        en="Optimized the algorithm, reducing label generation time by 40%."
                    /></li>
                    <li><T
                        ru="Разработал гибкую и расширяемую модель отрисовки элементов этикеток."
                        en="Designed a flexible and extensible model for rendering label elements."
                    /></li>
                    <li><T
                        ru="Ввел новый интерфейс для более гибкого и интенсивного взаимодействия, что упростило работу приложений весов и ускорило разработку."
                        en="Introduced a new interface for more flexible and intensive interaction, simplifying the operation of scale applications and speeding up development."
                    /></li>
                </ul>
            </>,
            <T
                ru="Автоматизировал и оптимизировал процессы сборки и тестирования, сократив время релизов и повысив стабильность конечного продукта."
                en="Automated and optimized build and testing processes, reducing release time and increasing final product stability."
            />,
            <>
                <T
                    ru="Разработка драйверов, связывающиx устройства товарного оборудования с корпоративной системой 1С. Позволило исключить ручной ввод при работе с утсройствами и минимизировать риск ошибок при учёте."
                    en="Developed drivers linking retail equipment devices with the corporate 1C system, eliminating manual input when working with devices and minimizing accounting errors."
                />
                <ul>
                    <li><T
                        ru="Инициировал задачу релазиовать дополнительный функционал под специфику устройства, помимо стандартного для 1C компанент."
                        en="Initiated the task of implementing additional functionality specific to the device, beyond the standard 1C component."
                    /></li>
                    <li><T
                        ru="Реализовал 100%-ое покрытие тестами."
                        en="Achieved 100% test coverage."
                    /></li>
                </ul>
            </>
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
        description: <T
            ru="разработка сервисов на Rust для повышения эффективности серверов в онлайн-торговле"
            en="development of services in Rust to improve server efficiency in online commerce"
        />,
        time: ["Febrary 2023", "September 2023"],
        achievements: [
            <T
                ru="Осуществил перенос высоконагруженных сервисов с Django на Rust, добившись существенного ускорения обработки данных в пиковые периоды."
                en="Migrated high-load services from Django to Rust, achieving significant acceleration of data processing during peak periods."
            />,
            <T
                ru="Реализовал набор вспомогательных серверныx приложений и консольныx утилит для перераспределения нагрузки с основыных сервисов Django."
                en="Implemented a set of auxiliary server applications and console utilities to offload core Django services."
            />,
            <T
                ru="Разработал низкоуровневые библиотеки для бесшовной интеграции с Python, что снизило накладные расходы при ускорении сервисов."
                en="Developed low-level libraries for seamless integration with Python, reducing overhead while speeding up services."
            />,
            <T
                ru="Ввел комплексное тестирование и мониторинг, что снизило риски неожиданных сбоев и упростило масштабирование проекта."
                en="Introduced comprehensive testing and monitoring, reducing the risk of unexpected failures and simplifying project scaling."
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

    useEffect(() => {
        console.log(tmp)
    }, [tmp]);

    const list = [
        <Block
            head={<T ru="Опыт работы" en="Projects" />}>
            <VStack tag="ol" style={{
                "padding-left": "0em",
            }}>
                {tmp
                    .map(({ time, ...other }) => (
                        { ...other, time: time.map((v) => new Date(v)) }
                    ))
                    .map(({
                        name, description, time, achievements, stack
                    }, i) => (
                        <li key={i} tag="li" style={{ "list-style-position": "inside" }}>
                            <span>
                                <b>{name}</b>{" — "}
                                {description}.
                            </span>
                            <VStack align="start">
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
                                    time={{ start: time[0], end: time[1] }}
                                />
                                <ul className={cls.achievements}>
                                    {achievements.map((v, i) => <li key={i}>{v}</li>)}
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
                                <ol>прошел <a href='https://ulbitv.ru/frontend'>курс</a> на котором писал <a href="https://github.com/10takla/ulbi">проект</a></ol>
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
            <T
                ru={"Весь \"копипаст\" кода перевожу в процедурные, декларативные макросы."}
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
                ru={<>Имею опыт работы с компилятором <L><G>rustc</G></L>. На данный момент <a href="https://github.com/10takla/rust">работаю</a> над модификацией <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">правила перекрытий</a>.</>}
                en={<>I have experience working with <L><G>rustc</G></L> compiler. At the moment I am  <a href="https://github.com/10takla/rust">working</a> on modification of the <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">overlap rule</a>.</>}
            />
            <br />
        </p>,
        <HStack tag="p" align="start">
            <span>
                <T
                    ru={<>
                        Знаю алгоритмы и структуры данных , как находить оптимальные решения для памяти и процессорного времени. Постоянно стремлюсь к <u>O(log n)</u> и <u>O(n)</u> сложности алгоритмов.
                    </>}
                    en={<>
                        I know algorithms and data structures, how to find optimal solutions for memory and CPU time. I constantly strive for <u>O(log n)</u> and <u>O(n)</u> complexity of algorithms.
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
        <p>
            <T
                ru="Умею:"
                en="Skilled in:"
            />
            <VStack tag="ul">
                <li>
                    <T
                        ru={<>Читать, понимать, и писать <L>rust</L>-овскую документацию;</>}
                        en={<>Read, understand, and write rust documentation;</>}
                    />
                </li>
                <li>
                    <T
                        ru={<>Создавать и управлять пакетами <L>cargo</L> в системе </>}
                        en={<>Create and manage cargo packages in </>}
                    />
                    <L><a href="https://crates.io/">crates.io</a></L>/<L><a href="https://github.com/10takla">github</a></L>.
                </li>
            </VStack>
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
        <Block head={<T ru="Pet-проекты" en="Pet projects" />} >
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