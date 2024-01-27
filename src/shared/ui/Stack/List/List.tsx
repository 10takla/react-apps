import React, {
    ReactNode, cloneElement, useImperativeHandle, useRef,
} from 'react';
import Flex, { FlexProps } from '../Flex/Flex/Flex';
import Wrapper from '../Wrapper/Wrapper';

enum ListTag {
    numeric = 'ol',
    marker = 'ul',
}

enum ListStyle {
    numeric = 'decimal',
    marker = 'disc',
}

interface ListProps extends Omit<FlexProps, 'direction'> {
    children: ReactNode;
    type?: 'numeric' | 'marker';
}

const ListItemWrapper = ({ children, type = 'numeric' }: ListProps) => {
    const style = { listStyleType: ListStyle[type], listStyle: `${ListStyle[type]} inside` };

    const childRef = useRef<HTMLElement>(null);
    const isHideRef = useRef(true);
    useImperativeHandle(isHideRef, () => {
        if (childRef.current) {
            const els = childRef.current.querySelectorAll('li[data-list-item]');

            if (els) {
                els.forEach((el) => {
                    Object.assign(el.style, style);
                });
            }

            return els.length;
        }
        return true;
    });

    return (
        <Wrapper tag="li" style={style} isHide={isHideRef.current}>
            {cloneElement(children, { ref: childRef })}
        </Wrapper>
    );
};

const List = (props: ListProps) => {
    const { children, type = 'numeric', ...otherProps } = props;

    return (
        <Flex gap={8} tag={ListTag[type]} direction="column" {...otherProps}>
            {React.Children.map(children, (child) => (
                <ListItemWrapper type={type}>
                    {child}
                </ListItemWrapper>
            ))}
        </Flex>
    );
};

export default List;

export const ListItem = ({ children }) => {
    return <li data-list-item>{children}</li>;
};
