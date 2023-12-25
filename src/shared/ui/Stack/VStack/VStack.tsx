import {
    ElementRef, ForwardedRef, forwardRef, memo,
} from 'react';
import Flex, { FlexProps } from '../Flex/Flex';

type VStackProps<T extends React.ElementType> = Omit<FlexProps<T>, 'direction'>

const VStack = <T extends React.ElementType>(props: VStackProps<T>, ref: ForwardedRef<ElementRef<typeof Flex>>) => {
    const { align = 'center' } = props;
    return (
        <Flex {...props} direction="column" align={align} ref={ref} />
    );
};
export default memo(forwardRef(VStack));
