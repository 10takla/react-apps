import { ElementRef, ForwardedRef, forwardRef, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Flex, HStack, VStack } from "S/ui/Stack";
import { classNames } from "src/shared/lib/classNames/classNames";
import "src/wordLearner/shared/config/i18n/i18n";
import Experience from "./chapters/Experience/Experience";
import Learning from "./chapters/Learning/Learning";
import PersonalInfo from "./chapters/PersonalInfo/PersonalInfo";
import cls from "./index.module.scss";
import ToggleLanguage, { langContext, LanguageProvider, T } from "./shared/ui/ToggleLanguage/ToggleLanguage";
import Pdf from "./shared/ui/Pdf/Pdf";
import Skills from "./ui/Skills/Skills";
import Block from "./shared/ui/Block/Block";
import SkillLine from "./ui/Skills/ui/SkillLine/SkillLine";
import { HtmlProps } from "@react-three/drei/web/Html";

const Chapter = forwardRef(({ className, children, text, ...otherProps }: { children: ReactNode } & HtmlProps, ref: ForwardedRef<ElementRef<typeof VStack>>) => {
    return (
        <VStack className={classNames(cls.chapter, [className, "background"])} {...otherProps} ref={ref}>
            <div className={classNames(cls.head)}><h2>{text}</h2></div>
            {children}
        </VStack>
    )
})

const Tmp = () => {
    const rightRef = useRef<HTMLElement>();
    const itemsRef = useRef<HTMLElement>();
    const destinationRef = useRef<HTMLElement>();
    // const innerRef = useRef<ChildNode[]>([]);
    const [_, [lang]] = useContext(langContext);
    const [overflow, setOverFlow] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const items = itemsRef.current;
        const right = rightRef.current;
        const destination = destinationRef.current;
        if (!items || !right || !destination) return
        if (right.scrollHeight && right.scrollHeight > right.clientHeight) {
            const toMove: HTMLElement[] = [];
            items.childNodes.forEach((el) => {
                if (el instanceof HTMLElement && el.getBoundingClientRect().bottom > right.getBoundingClientRect().bottom) {
                    toMove.push(el);
                }
            });
            setOverFlow([...overflow, ...toMove])
        } else {
            setOverFlow([])
        }
    }, []);

    useEffect(() => {
        const items = itemsRef.current;
        const destination = destinationRef.current;
        if (!items || !destination) return

        if (overflow.length > 0) {
            const newItemsContainer = items.cloneNode(false) as HTMLElement;
            overflow.forEach((el) => {
                newItemsContainer.appendChild(el);
            });
            destination.appendChild(newItemsContainer);
            // innerRef.current = Array.from(destination.children[1].childNodes);
        }
    }, [overflow])

    return (
        <VStack className={classNames(cls.App)} id="pdf-content">
            <VStack className={classNames(cls.page)} justify="end">
                <img src="https://www.rust-lang.org/static/images/rust-logo-blk.svg"
                    className={cls.rustBackground}
                />
                <HStack tag="main" align="stratch" justify="between">
                    <HStack className={cls.lang}>
                        <ToggleLanguage />
                        <Pdf />
                    </HStack>
                    <VStack className={cls.left}>
                        <Chapter className={classNames(cls.topLeft)} tag="head" text={<T children="О себе" en="About me" />} >
                            <PersonalInfo />
                        </Chapter>
                        <Chapter className={cls.left} text={<T children="Обучение" en="Learning" />}>
                            <Learning />
                        </Chapter>
                    </VStack>
                    <VStack className={cls.right} ref={rightRef}>
                        <Chapter className={cls.experience} text={<T children="Опыт" en="Experience" />}>
                            <Experience ref={itemsRef} />
                        </Chapter>
                    </VStack>
                </HStack >
                <Block tag="foot" head={<T children="Навыки" en="Skills" />} className="background">
                    <SkillLine className={classNames(cls.skillLine, ["noneStyle"])} />
                    <Skills />
                </Block>
            </VStack>
            {overflow && <VStack className={classNames(cls.page)}>
                <Chapter className={cls.experience} text={<T children="Опыт" en="Experience" />} ref={destinationRef} />
            </VStack>}
        </VStack>
    );
}

const App = () => {
    const [_, [lang]] = useContext(langContext);
    const [key, setKey] = useState(Date.now());

    useEffect(() => {
        setKey(Date.now());
    }, [lang]);

    return (
        <Tmp key={key} />
    );
};


export default () => (
    <LanguageProvider lang="ru">
        <App />
    </LanguageProvider>
)