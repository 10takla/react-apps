import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useState, createContext, useContext, Dispatch, SetStateAction, Context, ReactNode, useCallback, useEffect, useMemo, cloneElement } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './ToggleLanguage.module.scss';
import Select from 'src/shared/ui/Kit/Select';
import { Navigate, Route, Routes, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { HtmlProps } from '@react-three/drei/web/Html';
import React from 'react';

type Component = typeof Select;
type ElRef = ElementRef<Component> | null;

interface ToggleLanguageProps extends Omit<ComponentProps<Component>, "onChange" | "values"> {
}

const ToggleLanguage = (props: ToggleLanguageProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const toggleLanguageRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => toggleLanguageRef.current,
    );

    const [_, [lang, setLang]] = useContext(langContext)

    const location = useLocation();
    const currentLang = useMemo(() => {
        const lang = location.pathname.split('/').pop();
        if (lang == "ru" || lang == "en") {
            return lang
        }
    }, [location]);

    useEffect(() => {
        currentLang && setLang(currentLang);
    }, [currentLang]);

    const navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route index element={<Navigate to={lang} />} />
            </Routes>
            <Select
                className={classNames(cls.ToggleLanguage, [className])}
                ref={toggleLanguageRef}
                {...otherProps}
                values={[["ru", "Рус"], ["en", "Eng"],]}
                defaultValue={currentLang}
                onChange={(value) => navigate(value)}
            />
        </>
    )
};

export default memo(forwardRef(ToggleLanguage));

type LangProps = {
    [key in Lang | "children"]?: ReactNode | string;
};
interface TProps extends HtmlProps, LangProps {
}

export const T = ({ children, ...otherProps }: TProps) => {
    const [_, [lang]] = useContext(langContext);
    let translatedChild = otherProps[lang] || children;
    console.log(translatedChild)
    if (typeof translatedChild === "string") {
        translatedChild = <>{translatedChild}</>;
    }
    return cloneElement(translatedChild, otherProps)
}

const experience = {

}

const educs = {
    "Дагестанский государственный технический университет": "Dagestan State Technical University",
    "Кафедра программного обеспечения вычислительной техники и автоматизированных систем": "Department of Computer Science Software and Automated Systems",
    "Бакалавр": "Bachelor",
    "Магистр": "Master",
    "Программная инженерия": "Software engineering"
}

const keys: Record<string, string> = {
    "Абакар Летифов": "Abakar Letifov",
    "Резюме": "СV",
    "Образование": "Education",
    "Книги": "Books",
    ...educs,
    ...experience
}

export type Lang = "en" | "ru"
export const langContext = createContext<[(key: string) => string, [Lang, Dispatch<SetStateAction<Lang>>]]>([(key) => key, ["en", () => { }]])

export const LanguageProvider = ({ children, lang: l }: { children: ReactNode, lang: Lang }) => {
    const [lang, setLang] = useState<Lang>(l)

    const t = useCallback((key: string) => {
        switch (lang) {
            case "en": {
                return keys[key] ?? key
            }
            default: {
                return key
            }
        }
    }, [lang])

    return (
        <langContext.Provider value={[t, [lang, setLang]]}>
            {children}
        </langContext.Provider>
    )
}