import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './{fileNameUpper}.module.scss';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface {fileNameUpper}Props extends ComponentProps<Component> {
    
}

const {fileNameUpper} = (props: {fileNameUpper}Props, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;
    
    const {fileNameLower}Ref = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => {fileNameLower}Ref.current,
    );
    
    return (
        <HStack
            className={classNames(cls.{fileNameUpper}, [className])}
            ref={{fileNameLower}Ref}
            {...otherProps}
        >
            
        </HStack>
    )
};

export default memo(forwardRef({fileNameUpper}));