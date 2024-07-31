import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Experience.module.scss';
import Contacts from 'src/resume/ui/Contacts/Contacts';
import Skills from 'src/resume/ui/Skills/Skills';
import { glossary } from 'src/resume/info';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ExperienceProps extends ComponentProps<Component> {

}

const G = ({ children }: { children: keyof typeof glossary }) => {
    let el = glossary[children];
    return (
        <a href={el.link}>{children}</a>
    )
}

const L = ({ children }: { children: any }) => {
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

    const blocks = [
        ["Навыки", <Skills />],
    ]

    return (
        <VStack
            className={classNames(cls.Experience, [className])}
            ref={experienceRef}
            {...otherProps}
        >

            <p>Веду разработку на языке <L>Rust</L> больше года.</p>
            Предыдущий опыт:
            <p>
                Языки, которые я изучал: <L>Rust</L>, <L>Python</L>, <L>TypeScript</L>, <L>PHP</L>.
                <br />
                Раньше в основном осваивал <L>Python</L> и <L>TypeScript</L>:
                <VStack tag="ul">
                    <li><L>Python</L> на уровне Junior.<br />
                        <ol>осваилвал <L>Django</L>, писал <a href="https://github.com/10takla/planet-backend">сервер</a></ol>
                    </li>
                    <li><L>React</L>/<L>TypeScript</L>/<L>Redux</L> на уровне Junior-Middle.
                        <ol>прошел <a href='https://ulbitv.ru/frontend'>курс</a> на котором писал <a href="https://github.com/10takla/ulbi">проект</a></ol>
                    </li>
                </VStack>
            </p >
            <p>
                Использовал на практике:
                <ul>
                    {[
                        <><L><G>axum</G></L>/<L><G>actix</G></L>/<L><G>diesel</G></L>/<L><G>sqlx</G></L></>,
                        <><L>wasm</L>/<L><G>wasm-bindgen</G></L>;</>,
                        "ffi к c/c++/python;",
                        <>Concurrency на уровне <u>atomics</u>, <u>memory ordering</u>, системные вызовы <u>futex</u>;</>,
                        <>Асинхронное программирование, в частности <L><G>tokio</G></L>;</>,
                        "CLI-приложения;",
                        "Весь копипаст кода перевожу в процедурные, декларативные макросы;",
                        <>Весь логически важный код всегда сопровождаю <u>unit</u> и интеграционными тестами.</>,
                    ].map(c => (
                        <li>{c}</li>
                    ))}
                </ul>
            </p>
            <HStack tag="span" gap={4}>
                <span>Знаю алгоритмы и структуры данных , как находить оптимальные решения для памяти и процессорного времени. Постоянно стремлюсь к <u>O(log n)</u> и <u>O(n)</u> сложности алгоритмов.</span>
                <VStack className={cls.algoLinks} align="center">
                    <a href="https://leetcode.com/u/10takla/">
                        <img src="https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo.c36eaf5e6.svg" alt="leetcode" />
                    </a>
                    <a href="https://www.codewars.com/users/10takla">
                        <img src="https://www.codewars.com/packs/assets/logo.f607a0fb.svg" alt="codewars" />
                    </a>
                </VStack>
            </HStack>
            <span>
                Имею опыт работы с компилятором <G>rustc</G>. На данный момент <a href="https://github.com/10takla/rust">работаю</a> над модификацией правила перекрытий компиялтора.
                <br />
                В настоящее время разрабатываю 3 pet-проекта:
                <ol>
                    {[
                        <><u>low-level concurrency</u>, <u>atomics</u>, <u>memory ordering</u></>,
                        <><u>asynchrony</u>, <G>tokio</G></>,
                        <><G>axum</G>, <u>wasm</u>, графические вычисления и алгоритмы, блокчейн.</>,
                    ].map(c => <li>Охватывает: {c}</li>)}
                </ol>
            </span>
            {
                blocks.map(([name, block]) => (
                    <div>
                        <h3>{name}</h3>
                        {block}
                    </div>
                ))
            }
        </VStack >
    )
};

export default memo(forwardRef(Experience));