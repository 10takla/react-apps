import {
    ForwardedRef,
    ReactElement,
    cloneElement, forwardRef, memo,
    useState,
    useRef,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { StringLiteralLike } from 'typescript';
import cls from './Draggable.module.scss';
import useDrag, { UseDragProps } from '../../../hooks/useDrag/useDrag';

type El = HTMLElement | null;

interface DraggableProps extends Omit<UseDragProps, 'elemenetRef'> {
    children: ReactElement
    className?: StringLiteralLike
}

const Draggable = (props: DraggableProps, ref: ForwardedRef<El>) => {
    const {
        className,
        children,
        onStart,
        onEnd,
        ...otherProps
    } = props;

    const childrenRef = useRef<El>(null);

    const [isDragged, setIsDragged] = useState(false);
    const userSelectStyleSave = document.body.style.userSelect;

    const tmp = useRef();
    useDrag({
        elemenetRef: childrenRef,
        onStart: () => {
            document.body.style.userSelect = 'none';
            setIsDragged(true);
            onStart?.();
        },
        onEnd: (trans) => {
            document.body.style.userSelect = userSelectStyleSave;
            setIsDragged(false);
            onEnd?.(trans);
        },
        ...otherProps,
    });

    return (
        cloneElement(children, {
            ref: (el) => {
                if (el) {
                    childrenRef.current = el;
                    ref?.(el);
                }
            },
            className: classNames(
                cls.Draggable,
                { [cls.isDragged]: isDragged },
                [children.props.className, className],
            ),
        })
    );
};

export default memo(forwardRef(Draggable));
