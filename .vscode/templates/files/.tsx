import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './{fileNameUpper}.module.scss';

type El = HTMLElement | null;

interface {fileNameUpper}Props extends ComponentProps<typeof HStack> {
    
}

const {fileNameUpper} = (props: {fileNameUpper}Props, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;
    
    const elementRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => elementRef.current,
    );
    
    return (
        <HStack
            className={classNames(cls.{fileNameUpper}, [className])}
            ref={elementRef}
            {...otherProps}
        >
            
        </HStack>
    )
};

export default memo(forwardRef({fileNameUpper}));