import { Children, cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Flex, HStack, VStack } from "S/ui/Stack";
import { classNames } from "src/shared/lib/classNames/classNames";
import "src/wordLearner/shared/config/i18n/i18n";
import Experience from "./chapters/Experience/Experience";
import Learning from "./chapters/Learning/Learning";
import PersonalInfo from "./chapters/PersonalInfo/PersonalInfo";
import cls from "./index.module.scss";
import ToggleLanguage, { langContext, LanguageProvider, T } from "./shared/ui/ToggleLanguage/ToggleLanguage";
import Pdf from "./shared/ui/Pdf/Pdf";
import Skills from "./chapters/Skills/Skills";
import Block from "./shared/ui/Block/Block";
import SkillLine from "./chapters/Skills/ui/SkillLine/SkillLine";
import { HtmlProps } from "@react-three/drei/web/Html";
import { TimeLineWithLength } from "./shared/ui/TimeLine/TimeLine";
import RustLogo from "./shared/assets/imgs/rust-logo.svg";

const Chapter = forwardRef(({ className, children, text, ...otherProps }: { children: ReactNode } & HtmlProps, ref: ForwardedRef<ElementRef<typeof VStack>>) => {
    return (
        <VStack tag="section" className={classNames(cls.chapter, [className, "background"])} {...otherProps} ref={ref}>
            <div className={classNames(cls.head)}><h2>{text}</h2></div>
            {children}
        </VStack>
    )
})

const Tmp = ({ demo }: ComponentProps<typeof PersonalInfo>) => {
    const rightRef = useRef<HTMLElement>();
    const itemsRef = useRef<HTMLElement>();
    const destinationRef = useRef<HTMLElement>();

    type R = ChildNode | R[];
    const [overflow, setOverFlow] = useState<[R, ...ChildNode[]]>();

    useEffect(() => {
        const items1 = itemsRef.current;
        const right = rightRef.current;
        if (!items1 || !right) return
        if (right.scrollHeight && right.scrollHeight > right.clientHeight) {
            console.log("\n\n")

            const tmp = (items: ChildNode): ChildNode | R => {
                const arr2 = Array.from(items.childNodes)
                const index = arr2.findIndex((node) => {
                    const range = document.createRange();
                    range.selectNodeContents(node);
                    return range.getBoundingClientRect().bottom > right.getBoundingClientRect().bottom
                });
                if (index <= 0) {
                    return items
                } else {
                    const v = arr2.splice(index).map((el) => {
                        return tmp(el)
                    });
                    // const newItemsContainer = items.cloneNode(false) as HTMLElement;
                    // v.flat().map((el) => {
                    //     newItemsContainer.appendChild(el)
                    // })
                    // return newItemsContainer
                    return v
                }
            };

            const v = tmp(items1);
            if (Array.isArray(v)) {
                setOverFlow(v)
            } else {
                setOverFlow([v])
            }
        } else {
            setOverFlow(undefined)
        }
    }, []);

    useEffect(() => {
        const items = itemsRef.current;
        const destination = destinationRef.current;
        if (!items || !overflow || !destination) return

        const newItemsContainer = items.cloneNode(false) as HTMLElement;
        destination.appendChild(newItemsContainer);
        if (overflow != undefined) {
            const newItemsContainer = items.cloneNode(false) as HTMLElement;

            const [first, ...other] = overflow;
            if (Array.isArray(first)) {
                first.flat().forEach((el) => {
                    if (el instanceof HTMLElement) {
                        newItemsContainer.appendChild(el);
                    }
                });
            } else {
                newItemsContainer.appendChild(first);
            }
            other.forEach((el) => {
                newItemsContainer.appendChild(el);
            });

            destination.appendChild(newItemsContainer);
        }
    }, [overflow]);

    return (
        <VStack className={classNames(cls.App)} id="pdf-content">
            <VStack className={classNames(cls.page)} justify="between">
                <RustLogo  className={cls.rustBackground}/>
                <HStack tag="main" align="stratch" justify="between">
                    <HStack className={cls.lang}>
                        <ToggleLanguage />
                        <Pdf demo={demo} />
                    </HStack>
                    <VStack className={cls.left}>
                        <PersonalInfo className={classNames(cls.topLeft)} demo={demo} />
                        <Chapter className={cls.left} text={<T children="Обучение" en="Learning" />}>
                            <Learning />
                        </Chapter>
                    </VStack>
                    <VStack className={cls.right} ref={rightRef}>
                        <Chapter
                            className={cls.experience}
                            text={<T children="Опыт" en="Experience" />}
                        >
                            <Experience ref={itemsRef} demo={demo}
                                style={{
                                    fontSize: demo && "0.94em",
                                }}
                            />
                        </Chapter>
                    </VStack>
                </HStack >
                <Block tag="foot" head={<T children="Навыки" en="Skills" />} className="background">
                    <Skills />
                </Block>
            </VStack>
            {overflow && <VStack className={classNames(cls.page, ["html2pdf__page-break"])}>
                <Chapter className={cls.experience} text={<T children="Опыт" en="Experience" />} ref={destinationRef} />
            </VStack>}
        </VStack>
    );
}
const App = ({ demo }: ComponentProps<typeof Tmp>) => {
    const [_, [lang]] = useContext(langContext);
    const [key, setKey] = useState(Date.now());

    useEffect(() => {
        setKey(Date.now());
    }, [lang]);

    return (
        <Tmp key={key} demo={demo} />
    );
};


export default ({ demo }: ComponentProps<typeof App>) => (
    <LanguageProvider lang="ru">
        <App demo={demo} />
    </LanguageProvider>
)