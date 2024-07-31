import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Contacts.module.scss';
import Svg from 'S/ui/Kit/Svg/Svg';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ContactsProps extends ComponentProps<Component> {

}

const contacts = [
    {
        link: "tel:+7 (932) 409-91-67",
        svg: "call",
        text: "+7 (932) 409-91-67",
    },
    {
        link: "https://github.com/10takla",
        svg: "git-hub",
        text: "10takla",
    },
    {
        link: "https://crates.io/users/10takla",
        img: "https://crates.io/assets/cargo.png",
        text: "crates.io",
    },
    {
        link: "mailto:letifovabakar50@gmail.com",
        svg: "mail",
        text: "letifovabakar50@gmail.com",
    },
    {
        link: "https://t.me/gorog1",
        svg: "telegram",
        text: "gordon",
    },
];

const Contacts = (props: ContactsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const contactsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => contactsRef.current,
    );

    return (
        <HStack
            className={classNames(cls.Contacts, [className])}
            ref={contactsRef}
            align="center"
            gap={8}
            {...otherProps}
        >
            {contacts.map(({ link, svg, text, img }) => {
                return (
                    <HStack className={cls.contact} align="center" key={link} tag={link && "a"} href={link}>
                        {svg && <Svg path={`/icons/contacts/${svg}`} />}
                        {img && <img src={img} />}
                        {text}
                    </HStack>
                );
            })}
        </HStack>
    )
};

export default memo(forwardRef(Contacts));