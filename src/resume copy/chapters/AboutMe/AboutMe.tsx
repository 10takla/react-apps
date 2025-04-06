import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useImperativeHandle, useRef } from 'react';
import { langContext, T } from 'src/resume copy/shared/ui/ToggleLanguage/ToggleLanguage';
import Contacts from 'src/resume copy/chapters/AboutMe/ui/Contacts/Contacts';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './AboutMe.module.scss';
import cls2 from 'src/resume copy/index.module.scss';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import FerrisSvg from "src/resume copy/shared/assets/imgs/Ferris.svg"

type Component = typeof VStack;
type ElRef = ElementRef<Component> | null;

interface AboutMeProps extends ComponentProps<Component> {
    demo: boolean
}

const AboutMe = (props: AboutMeProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const AboutMeRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => AboutMeRef.current,
    );

    const [t] = useContext(langContext);

    return (
        <VStack
            className={classNames(cls.AboutMe, [className])}
        >
            <p>
                <HStack
                    tag="span" align="center"
                    style={{
                        display: "inline-flex",
                        "font-size": "1.2em"
                    }}
                >
                    <FerrisSvg style={{
                        // fill: "white",
                        width: "1.4em",
                    }} />
                    <u>
                        Rust <T ru="Разработчик" en="Developer" />
                    </u>
                </HStack>
                23 <T ru="года" en="years old" />
                {", "}
                GMT+3, полная занятость, частичная занятость, полный день, удалённая работа.
            </p>
            <p className={cls.quote}>
                <T
                    ru="Мне важно создавать производительное и надёжное ПО, которое легко поддерживать и развивать. Люблю писать код, который не только летает, но и не разваливается через месяц. Rust — мой помощник в этом: строгий, но справедливый."
                    en="I care about building high-performance and reliable software that’s easy to maintain and evolve. I love writing code that not only flies but also doesn’t fall apart a month later. Rust is my tool of choice for that — strict, but fair."
                />
            </p>
        </VStack>
    )
};

export default memo(forwardRef(AboutMe));