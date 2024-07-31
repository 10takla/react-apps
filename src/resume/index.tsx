import { HStack, VStack } from "S/ui/Stack";
import Experience from "./chapters/Experience/Experience";
import Learning from "./chapters/Learning/Learning";
import PersonalInfo from "./chapters/PersonalInfo/PersonalInfo";
import cls from "./index.module.scss";
import { classNames } from "src/shared/lib/classNames/classNames";

const Format = ({ className, children, text }) => {
    return (
        <VStack className={classNames(cls.format, [className])}>
            <div className={cls.formatText}><h2>{text}</h2></div>
            {children}
        </VStack>
    )
}

export default () => {

    return (
        <HStack className={cls.App}>
            <VStack className={cls.left}>
                <Format className={cls.topLeft} text="Инфо">
                    <PersonalInfo />
                </Format>
                <Format className={cls.left} text="Обучение">
                    <Learning />
                </Format>
            </VStack>
            <VStack className={cls.right}>
                <Format className={cls.topRight} text="Опыт">
                    <Experience />
                </Format>
            </VStack>
        </HStack>
    );
};
