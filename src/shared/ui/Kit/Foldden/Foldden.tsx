import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, ReactNode as ReactElement,
    useState,
    cloneElement,
    useContext,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import CrossSvg from "S/assets/icons/cross.svg";
import { themeContext } from "S/providers/theme/themeContext";
import cls from './Foldden.module.scss';

type El = ElementRef<typeof HStack> | null;

interface FolddenProps extends ComponentProps<typeof HStack> {
    children: ReactElement
    to: ReactElement
}

const Foldden = (props: FolddenProps, ref: ForwardedRef<El>) => {
    const {
        className,
        children,
        to,
        ...otherProps
    } = props;

    const folddenRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => folddenRef.current,
    );

    const [isShow, setIsShow] = useState(false);

    const theme = useContext(themeContext);

    return (
        <HStack
            className={classNames(cls.Foldden, [className, cls[theme]])}
            ref={folddenRef}
            {...otherProps}
        >
            {isShow ? (
                <VStack
                    className={cls.to}
                >
                    <CrossSvg
                        className={cls.crossSvg}
                        onClick={() => setIsShow(false)}
                    />
                    {to}
                </VStack>
            ) : cloneElement(children, {
                onClick: (e) => {
                    setIsShow(true);
                    children?.props.onClick(e);
                },
            }) }
        </HStack>
    );
};

export default memo(forwardRef(Foldden));
