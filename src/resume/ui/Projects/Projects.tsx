import { L, G } from "src/resume/chapters/Experience/Experience";
import { T } from "src/resume/shared/ui/ToggleLanguage/ToggleLanguage";
import { HStack, VStack } from "src/shared/ui/Stack";
import cls from "./Projects.module.scss"

const PetProjects = () => {
    const projects = [
        {
            name: "abstract",
            descr: <T
                en='My own lexer, parser, and ast.'
                children='Лексический анализатор, парсер и ast.'
            />,
            githubLink: "abstract"
        },
        {
            name: "std-reset", descr:
                <T en="Many reworked implementations from the standard library, as well as new solutions for easy coding."
                    children="Множество переработанных реализаций стандартной библиотеки, а также новые решения для простого кодинга." />

        },
        {
            name: "lf-structs", descr:
                <T en="Various implementations of free locking and atomicity of data structures."
                    children="Различные реализации свободных блокировок и атомарных структур." />
        },
        {
            name: "fork rust", descr:
                <T en={<>Changing <L><G>#[marker]</G></L> attribute and <a href="https://doc.rust-lang.org/reference/items/implementations.html#trait-implementation-coherence">overlap rules</a></>}
                    children={<>Изменение атрибута <L><G>#[marker]</G></L> и <a href="https://doc.rust-lang.org/reference/items/implementations.html#trait-implementation-coherence">правила перкрытий</a></>} />
        },
        {
            name: "production-project",
            descr: <T
                en='Web application: Platforms for publishing content'
                children='Web-приложение: Платформа для публикации контента.'
            />,
            githubLink: "ulbi"
        }
    ];

    return (
        <VStack className={cls.Projects} tag="ol" gap={0}>
            {projects.map(p => (
                <li key={p.name}>
                    <a href={`https://github.com/10takla/${p.githubLink || p.name}`}>
                        <L>{p.name}</L>
                    </a>
                    <br />
                    <i>{p.descr}</i>
                </li>
            ))}
        </VStack>
    )
}

export default PetProjects;