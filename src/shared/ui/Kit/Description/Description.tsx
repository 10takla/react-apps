import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, ReactNode, useState, useContext,
    useEffect,
    cloneElement,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import { themeContext } from "S/providers/theme/themeContext";
import cls from './Description.module.scss';

type El = ElementRef<typeof HStack> | null;

interface DescriptionProps extends ComponentProps<typeof HStack> {
    children: ReactNode
    describtion: ReactNode
}

const Description = (props: DescriptionProps, ref: ForwardedRef<El>) => {
    const {
        className,
        children,
        onMouseEnter,
        onMouseLeave,
        describtion,
        ...otherProps
    } = props;

    const descriptionRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => descriptionRef.current,
    );

    const childrenRef = useRef<HTMLElement>(null);

    const [isShow, setIsShow] = useState(false);
    const theme = useContext(themeContext);
    const [direction, setDirection] = useState<Array<'top' | 'bottom' | 'left' | 'right'>>([]);

    useEffect(() => {
        const description = descriptionRef.current;
        const children = childrenRef.current;
        if (!description || !children) return;
        const handle = () => {
            const descriptionRect = description.getBoundingClientRect();
            const childrenRect = children.getBoundingClientRect();

            const leftBound = childrenRect.left - descriptionRect.width;
            const rightBound = childrenRect.right + descriptionRect.width;
            const dirs = [] as typeof direction;
            if (leftBound < 0) {
                dirs.push('right');
            } else if (rightBound > window.innerWidth) {
                dirs.push('left');
            }

            const topBound = childrenRect.top - descriptionRect.height;
            const bottomBound = childrenRect.bottom + descriptionRect.height;
            if (topBound < 0) {
                dirs.push('bottom');
            } else if (bottomBound > window.innerHeight) {
                dirs.push('top');
            }
            setDirection(dirs);
        };
        window.addEventListener('resize', handle);
        handle();

        return () => {
            window.removeEventListener('resize', handle);
        };
    }, []);

    let timer: NodeJS.Timeout | null = null;

    return (
        <VStack
            className={classNames(cls.Description, [className, cls[theme]])}
            ref={descriptionRef}
            onMouseLeave={(e: MouseEvent) => {
                if (timer) {
                    clearTimeout(timer);
                }
                setIsShow(false);
                onMouseLeave?.(e);
            }}
            onMouseEnter={(e: MouseEvent) => {
                timer = setTimeout(() => {
                    setIsShow(true);
                }, 250);
                onMouseEnter?.(e);
            }}
            align="center"
            {...otherProps}
        >
            {cloneElement(children, {
                // ref: (el) => {
                //     if (el) {
                //         if (children?.ref) {
                //             if (typeof children.ref === 'function') {
                //                 children.ref(el);
                //             } else if (children.ref !== null) {
                //                 children.ref.current = el;
                //             }
                //         }
                //         childrenRef.current = el;
                //     }
                // },
                ref: childrenRef,
            })}
            {isShow && (
                <div
                    className={classNames(cls.describtion, [...direction.map((d) => cls[d])])}
                >
                    {describtion}
                </div>
            )}
        </VStack>
    );
};

export default memo(forwardRef(Description));
