import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useMemo } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Contacts.module.scss';
import CallStar from "S/assets/icons/contacts/call.svg";
import GitHubStar from "S/assets/icons/contacts/git-hub.svg";
import MailStar from "S/assets/icons/contacts/mail.svg";
import TelegramStar from "S/assets/icons/contacts/telegram.svg";


type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ContactsProps extends ComponentProps<Component> {

}

const contacts = [
    {
        link: "tel:+7 (932) 409-91-67",
        svg: <CallStar />,
        text: "+7 (932) 409-91-67",
    },
    {
        link: "https://github.com/10takla",
        svg: <GitHubStar />,
        text: "10takla",
    },
    {
        link: "https://crates.io/users/10takla",
        img: "https://crates.io/assets/cargo.png",
        text: "crates.io",
    },
    {
        link: "mailto:letifovabakar98@gmail.com",
        svg: <MailStar />,
        text: "letifovabakar98@gmail.com",
    },
    {
        link: "https://t.me/Corvo116",
        svg: <TelegramStar />,
        text: "@Corvo116",
    },
];

const contactsDemo = [
    {
        link: "tel:+7 (777) 777-77-77",
        svg: <CallStar />,
        text: "+7 (777) 777-77-77",
    },
    {
        link: "mailto:mail@gmail.com",
        svg: <MailStar />,
        text: "mail@gmail.com",
    },
    {
        link: "https://github.com",
        svg: <GitHubStar />,
        text: "github",
    },
    {
        link: "https://crates.io",
        img: "https://crates.io/assets/cargo.png",
        text: "crates.io",
    },

    {
        link: "https://t.me",
        svg: <TelegramStar />,
        text: "telegram",
    },
    {
        link: "https://spb.hh.ru/?hhtmFrom=main",
        img: "https://i.hh.ru/images/logos/svg/hh.ru.svg?v=05022025",
        text: "hh.ru",
    },
    {
        link: "https://www.linkedin.com/",
        img: "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico",
        text: "LinkedIn",
    },
];

const Contacts = (props: ContactsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const contactsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => contactsRef.current,
    );

    const c = useMemo(() => {
        if (demo) {
            return contactsDemo
        } else {
            return contacts
        }
    }, [])

    return (
        <HStack
            className={classNames(cls.Contacts, [className])}
            ref={contactsRef}
            align="center"
            justify="between"
            {...otherProps}
        >
            {c.map(({ link, svg, text, img }) => {
                return (
                    <HStack className={cls.contact} align="center" key={link} tag={link && "a"} href={link}>
                        {svg && svg}
                        {img && <img src={img} />}
                        {text}
                    </HStack>
                );
            })}
        </HStack>
    )
};

export default memo(forwardRef(Contacts));