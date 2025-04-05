import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, ReactNode } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Block.module.scss';
import { T } from '../ToggleLanguage/ToggleLanguage';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface BlockProps extends ComponentProps<Component> {
    head: ReactNode
}

const Block = (props: BlockProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        children,
        head,
        ...otherProps
    } = props;

    const blockRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => blockRef.current,
    );

    return (
        <VStack
            className={classNames(cls.Block, [className])}
            ref={blockRef}
            {...otherProps}
        >
            <h4>{head}</h4>
            {children}
        </VStack>
    )
};

export default memo(forwardRef(Block));