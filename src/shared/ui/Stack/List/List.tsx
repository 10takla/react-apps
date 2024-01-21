import React, { ReactNode } from 'react';
import Flex, { FlexProps } from '../Flex/Flex/Flex';

enum ListTag {
    numeric = 'ol',
    marker = 'ul'
}

enum ListStyle {
    numeric = 'decimal',
    marker = 'disc'
}

interface ListProps extends FlexProps {
    children: ReactNode
    type?: 'numeric' | 'marker'
}

const List = (props: ListProps) => {
    const {
        children,
        type = 'numeric',
        ...otherProps
    } = props;

    return (
        <Flex
            gap={8}
            tag={ListTag[type]}
            direction="column"
            {...otherProps}
        >
            {React.Children.map(
                children,
                (child) => (
                    <li style={{ listStyleType: ListStyle[type] }}>
                        {child}
                    </li>
                ),
            )}
        </Flex>
    );
};

export default List;
