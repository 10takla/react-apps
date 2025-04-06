import { Children, cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Flex, HStack, VStack } from "S/ui/Stack";
import { classNames } from "src/shared/lib/classNames/classNames";
import "src/wordLearner/shared/config/i18n/i18n";
import Experience from "./chapters/Experience/Experience";
import Learning from "./chapters/Learning/Learning";
import AboutMe from "./chapters/AboutMe/AboutMe";
import cls from "./index.module.scss";
import ToggleLanguage, { langContext, LanguageProvider, T } from "./shared/ui/ToggleLanguage/ToggleLanguage";
import Pdf from "./shared/ui/Pdf/Pdf";
import Block from "./shared/ui/Block/Block";
import SkillLine from "./chapters/Skills/ui/SkillLine/SkillLine";
import { HtmlProps } from "@react-three/drei/web/Html";
import { TimeLineWithLength } from "./shared/ui/TimeLine/TimeLine";
import RustLogo from "./shared/assets/imgs/rust-logo.svg";
import Contacts from "./chapters/AboutMe/ui/Contacts/Contacts";
import Education from "./chapters/Learning/ui/Education/Education";
import PersonalInfo from "src/resume/chapters/PersonalInfo/PersonalInfo";
import Skills from "./chapters/Skills/Skills";

export const Chapter = forwardRef(({ className, children, head, ...otherProps }: { children: ReactNode } & HtmlProps, ref: ForwardedRef<ElementRef<typeof VStack>>) => {
    return (
        <VStack tag="section" className={classNames(cls.chapter, [className, "background"])} {...otherProps} ref={ref}>
            {head && <div className={classNames(cls.head)}><h2>{head}</h2></div>}
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
            <HStack className={classNames(cls.page)} tag="main" align="stratch" justify="between">
                {/* <RustLogo className={cls.rustBackground} /> */}
                <HStack className={cls.lang}>
                    <ToggleLanguage />
                    <Pdf demo={demo} />
                </HStack>
                <VStack className={cls.left} justify="between">
                    <VStack style={{ gap: "1em" }}>
                        <Chapter className={classNames(cls.topLeft)} head={<T ru="О себе" en="About me" />}>
                            <AboutMe demo={demo} />
                        </Chapter>
                        <Chapter head={<T ru="Образование" en="Education" />}>
                            <Education />
                        </Chapter>
                    </VStack>
                    <Chapter head={<T ru="Навыки" en="Skills" />}>
                        <Skills />
                    </Chapter>
                </VStack>
                <VStack className={cls.right} ref={rightRef} style={{ gap: "1.5em" }}>
                    <VStack>
                        <h1 style={{
                            "margin-bottom": 0,
                            "margin-top": "0.2em",
                        }}>{demo ? <T ru="Имя Фамилия" en="First Last Name" /> : <T ru="Абакар Летифов" en="Abakar Letifov" />}</h1>
                        <Contacts demo={demo} />
                    </VStack>
                    {/* <Chapter
                            className={cls.experience}
                            head={<T children="Опыт" en="Experience" />}
                        > */}
                    <Experience ref={itemsRef} demo={demo} />
                    {/* </Chapter> */}
                </VStack>
            </HStack >
            {/* <Block tag="foot" head={<T children="Навыки" en="Skills" />} className="background">
                    <Skills />
                </Block> */}
            {/* {overflow && <VStack className={classNames(cls.page)}>
                <Chapter className={cls.experience} text={<T children="Опыт" en="Experience" />} ref={destinationRef} />
            </VStack>} */}
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