import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
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
        link: "tel:+7 (777) 777-77-77",
        svg: <CallStar />,
        text: "+7 (777) 777-77-77",
    },
    {
        link: "https://github.com/",
        svg: <GitHubStar />,
        text: "github",
    },
    {
        link: "https://crates.io/users/10takla",
        img: "https://crates.io/assets/cargo.png",
        text: "crates.io",
    },
    {
        link: "mailto:mail@gmail.com",
        svg: <MailStar />,
        text: "mail@gmail.com",
    },
    {
        link: "https://t.me/tg",
        svg: <TelegramStar />,
        text: "telegram",
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
            justify="center"
            gap={8}
            {...otherProps}
        >
            {contacts.map(({ link, svg, text, img }) => {
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