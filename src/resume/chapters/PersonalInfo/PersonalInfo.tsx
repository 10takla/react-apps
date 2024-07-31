import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './PersonalInfo.module.scss';
import Contacts from 'src/resume/ui/Contacts/Contacts';

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

    const blocks = [
        ["", <Contacts />],
        ["",
            <VStack>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <div style={{textAlign: "center"}}>
                    <h1 style={{marginBottom: 0}}>Абакар Летифов</h1>
                    <h2 style={{marginTop: "0.2em"}}><u>Rust Developer</u></h2>
                </div>
            </VStack>
        ]
    ]

    return (
        <VStack
            className={classNames(cls.PersonalInfo, [className])}
            ref={personalInfoRef}
            {...otherProps}
        >
            {blocks}
        </VStack>
    )
};

export default memo(forwardRef(PersonalInfo));