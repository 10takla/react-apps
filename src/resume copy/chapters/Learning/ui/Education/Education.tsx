import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, useState, useMemo } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Education.module.scss';
import Books from '../Books/Books';
import TimeLine from 'src/resume copy/shared/ui/TimeLine/TimeLine';
import { langContext } from 'src/resume copy/shared/ui/ToggleLanguage/ToggleLanguage';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface EducationProps extends ComponentProps<Component> {

}

export interface Ed<S = Univercity["specialities"]> {
    univercity: Univercity
    degree: "Бакалавр" | "Магистр"
    department: {
        name: string
        link: string
    }
    speciality: S[keyof S]
    time: {
        start: Date,
        end?: Date,
    }
}

interface Speciality {
    name: string,
    number: `${number}.${number}.${number}`
}

const specialities: Record<string, Speciality> = {
    PI: {
        name: "Программная инженерия",
        number: "09.03.04"
    }
}

interface Univercity {
    name: string,
    link: string
    specialities: Record<string, Speciality>
    departments: Record<string, Record<"name" | "link", string>>
}

const univercities: Record<string, Univercity> = {
    DGTU: {
        name: "Дагестанский государственный технический университет",
        link: "https://dstu.ru/",
        specialities: Object.entries(specialities)
            .filter(([key]) => ["PI"].includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        departments: {
            POVTIAS: {
                name: "программного обеспечения вычислительной техники и автоматизированных систем",
                link: "https://dstu.ru/sveden/kafedra-programmnogo-obespechenija-vychislitelnoi-tekhniki-i-avtomatizirovannykh-sistem1"
            }
        }
    }
}

const educs: Ed[] = [
    {
        univercity: univercities.DGTU,
        degree: "Магистр",
        department: univercities.DGTU.departments.POVTIAS,
        speciality: univercities.DGTU.specialities.PI,
        time: {
            start: new Date("01 September 2023 14:48 UTC"),
            end: new Date("01 June 2025 14:48 UTC"),
        }
    },
    {
        univercity: univercities.DGTU,
        degree: "Бакалавр",
        department: univercities.DGTU.departments.POVTIAS,
        speciality: univercities.DGTU.specialities.PI,
        time: {
            start: new Date("01 September 2019 14:48 UTC"),
            end: new Date("06 June 2023 14:48 UTC")
        }
    },
];

const Education = (props: EducationProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const educationRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => educationRef.current,
    );
    const [t] = useContext(langContext);

    return (
        <ul
            className={classNames(cls.Education, [className])}
            ref={educationRef}
            tag="ul"
            style={{ gap: "0.3em", "padding": 0, margin: 0 }}
            {...otherProps}
        >
            {educs.map((u, i) => (
                <div key={i}
                    style={{
                        "margin-bottom": "1em"
                    }}
                >
                    <span>
                        {t(u.degree)} {" "}
                        <span><b>{u.speciality.number}</b> "{t(u.speciality.name)}"</span>
                    </span>
                    <li
                        style={{
                            "margin-left": "1.5em",
                            // "list-style-position": "inside",
                            "padding-left": "0em",
                            "margin-bottom": "0.3em"
                        }}
                    >
                        {/* <h4> */}
                        <a href={u.univercity.link}>{t(u.univercity.name)}</a>
                        {/* </h4> */}
                        <br />
                        <small>
                            <i><a href={u.department.link}>{t(`Кафедра ${u.department.name}`)}</a></i>
                        </small>
                    </li>
                    <small>
                        <TimeLine
                            timeProps={{
                                style: {
                                    "white-space": "nowrap"
                                }
                            }}
                            time={u.time}
                        />
                    </small>
                </div>
            ))}
        </ul>
    )
};

export default memo(forwardRef(Education));