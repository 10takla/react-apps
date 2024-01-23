import {
    ElementType, ForwardedRef, ReactNode, forwardRef, memo, ComponentPropsWithoutRef,
} from 'react';

interface WrapperProps extends ComponentPropsWithoutRef<ElementType> {
    children: ReactNode
    tag?: ElementType
    isHide?: boolean
}

const Wrapper = (props: WrapperProps, ref: ForwardedRef<HTMLElement | undefined>) => {
    const {
        children,
        tag: Tag = 'div',
        isHide = false,
        ...otherProps
    } = props;
    if (!isHide) {
        return (
            <Tag
                ref={ref}
                {...otherProps}
            >
                {children}
            </Tag>
        );
    }
    return children;
};

export default memo(forwardRef(Wrapper));
