import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useImperativeHandle, useRef } from 'react';
import { langContext, T } from 'src/resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Contacts from 'src/resume/ui/Contacts/Contacts';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './PersonalInfo.module.scss';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface PersonalInfoProps extends ComponentProps<Component> {

}

const PersonalInfo = (props: PersonalInfoProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const personalInfoRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => personalInfoRef.current,
    );

    const [t] = useContext(langContext);

    return (
        <VStack
            className={classNames(cls.PersonalInfo, [className])}
            ref={personalInfoRef}
            {...otherProps}
        >
            <Contacts />
            <VStack className={classNames(cls.person, ["background"])}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ marginBottom: 0 }}>{t("Абакар Летифов")}</h1>
                    <h2 style={{ marginTop: "0.2em" }}><u>
                        <HStack align="center" justify="center"
                        style={{
                            left: "-0.8em",
                        }}
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Original_Ferris.svg/1024px-Original_Ferris.svg.png?20190503092623"
                                style={{
                                    width: "2em",
                                }}
                            />
                            Rust <T en="Developer" children="Разработчик" />
                        </HStack>
                    </u></h2>
                </div>
            </VStack>
        </VStack>
    )
};

export default memo(forwardRef(PersonalInfo));