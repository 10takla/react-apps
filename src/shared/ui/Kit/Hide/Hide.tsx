import {
    useState, useEffect, ReactNode,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import ArrowUpSvg from "S/assets/icons/arrows/arrow_up.svg";
import { HStack, VStack } from '../../Stack';
import cls from './Hide.module.scss';

interface HideProps extends React.ComponentProps<typeof VStack> {
    className?: string
    children: ReactNode
    title?: ReactNode
    isHide?: boolean
    onChange?: (isHide: Required<HideProps>['isHide']) => void
    isNotHidable?: boolean
}

export const Hide = (props: HideProps) => {
    const {
        className,
        children,
        isHide = false,
        title,
        onChange,
        isNotHidable = true,
        ...otherProps
    } = props;
    const [isPostHide, setIsPostHide] = useState(isHide);

    useEffect(() => {
        setIsPostHide(isHide);
    }, [isHide]);

    return (
        <VStack
            className={classNames(cls.Hide, {}, [className])}
            align="start"
            {...otherProps}
        >
            <HStack align="center">
                <ArrowUpSvg
                    className={classNames(
                        cls.arrow,
                        { [cls.hide]: isPostHide },
                    )}
                    onClick={() => {
                        setIsPostHide(!isPostHide);
                        onChange?.(!isPostHide);
                    }}
                />
                {title}
            </HStack>
            {(isNotHidable || !isPostHide) && children}
        </VStack>
    );
};
