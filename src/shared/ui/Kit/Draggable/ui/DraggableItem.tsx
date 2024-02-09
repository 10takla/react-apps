import {
    ComponentProps,
    ElementRef,
    ForwardedRef, ReactNode, forwardRef, memo,
} from 'react';
import DragSvg from 'src/shared/assets/icons/drag.svg';
import { HStack } from 'src/shared/ui/Stack';

interface DraggableItemProps extends ComponentProps<typeof HStack> {
    children: ReactNode;
}

const DraggableItem = (props: DraggableItemProps, ref: ForwardedRef<ElementRef<typeof HStack>>) => {
    const {
        children, ...otherProps
    } = props;

    return (
        <HStack
            ref={ref}
            {...otherProps}
        >
            <DragSvg
                data-drag
                onClick={(e) => {
                    e.stopPropagation();
                }}
            />
            {children}
        </HStack>
    );
};

export default memo(forwardRef(DraggableItem));
