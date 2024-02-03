import { forwardRef, memo, ForwardedRef, ComponentProps } from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './{fileNameUpper}.module.scss';

type El = HTMLElement | undefined;

interface {fileNameUpper}Props extends ComponentProps<typeof HStack> {
    
}

const {fileNameUpper} = (props: {fileNameUpper}Props, ref: ForwardedRef<El>) => {
    const {
        className,
    } = props



    return (
        <HStack className={classNames(cls.{fileNameUpper}, [className])}>

        </HStack>
    )
};

export default memo(forwardRef({fileNameUpper}));