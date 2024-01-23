import {
    ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef, memo,
} from 'react';

interface TagProps extends ComponentPropsWithoutRef<ElementType> {
    tag: ElementType
}

const Tag = (props: TagProps, ref: ForwardedRef<HTMLElement | undefined>) => {
    const {
        tag: Tag,
        ...otherProps
    } = props;
    return (
        <Tag ref={ref} {...otherProps} />
    );
};

export default memo(forwardRef(Tag));
