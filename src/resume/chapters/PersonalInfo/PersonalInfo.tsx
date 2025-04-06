import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useImperativeHandle, useRef } from 'react';
import { langContext, T } from 'resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Contacts from 'resume/chapters/PersonalInfo/ui/Contacts/Contacts';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './PersonalInfo.module.scss';
import cls2 from 'resume/index.module.scss';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

type Component = typeof VStack;
type ElRef = ElementRef<Component> | null;

interface PersonalInfoProps extends ComponentProps<Component> {
    demo: boolean
}

const PersonalInfo = (props: PersonalInfoProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const personalInfoRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => personalInfoRef.current,
    );

    const [t] = useContext(langContext);

    return (
        <VStack className={classNames(cls2.chapter, [className, "background"])} tag="head" {...otherProps} ref={personalInfoRef} >
            <div
                className={classNames(cls2.head)}
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <h2>
                    <T ru="О себе" en="About me" />
                </h2>
                {/* <HStack className={classNames(cls.resumes)} align="center">
                    <a href='https://spb.hh.ru/?hhtmFrom=main'>
                        <img src="https://i.hh.ru/images/logos/svg/hh.ru.svg?v=05022025" alt="hh.ru" />
                    </a>
                    <a href='https://www.linkedin.com/'>
                        <img src="https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico" alt="LinkedIn" />
                    </a>
                </HStack> */}
            </div>
            <VStack
                className={classNames(cls.PersonalInfo, [className])}
            >
                <Contacts demo={demo} />
                <VStack className={classNames(cls.person, ["background"])}>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                    <VStack align="center">
                        <h1>{demo ? <T ru="Имя Фамилия" en="First Last Name" /> : t("Абакар Летифов")}</h1>
                        <h2><u>
                            <HStack align="center" justify="center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Original_Ferris.svg/1024px-Original_Ferris.svg.png?20190503092623"
                                    style={{
                                        width: "2em",
                                    }}
                                />
                                Rust <T en="Developer" children="Разработчик" />
                            </HStack>
                        </u></h2>
                        <h3>23 <T ru="года" en="years old" /></h3>
                        <span style={{ fontSize: "0.56em", padding: 0, listStyleType: "none", color: "#6e6e6e", fontWeight: "bolt" }}>
                            GMT+3, полная занятость, частичная занятость, полный день, удалённая работа
                        </span>
                        <VStack className={cls.quote} align="center" tag="p">
                            <T
                                ru="Мне важно создавать производительное и надёжное ПО, которое легко поддерживать и развивать. Люблю писать код, который не только летает, но и не разваливается через месяц. Rust — мой помощник в этом: строгий, но справедливый."
                                en="I care about building high-performance and reliable software that’s easy to maintain and evolve. I love writing code that not only flies but also doesn’t fall apart a month later. Rust is my tool of choice for that — strict, but fair."
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
};

export default memo(forwardRef(PersonalInfo));