import {
    ElementRef,
    ElementType, ForwardedRef, forwardRef, memo,
} from 'react';
import Flex, { FlexProps } from '../Flex/Flex';

type HStackProps<T extends ElementType> = Omit<FlexProps<T>, 'direction'>

const HStack = <T extends ElementType = 'div'>(props: HStackProps<T>, ref: ForwardedRef<ElementRef<typeof Flex>>) => {
    const { align = 'start' } = props;
    return (
        <Flex direction="row" {...props} align={align} ref={ref} />
    );
};

export default memo(forwardRef(HStack));
