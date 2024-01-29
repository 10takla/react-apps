import React, {
    ElementRef,
    ForwardedRef,
    ReactNode, forwardRef, memo, useRef,
    useState,
    useEffect,
} from 'react';
import Flex, { FlexProps } from '../Flex/Flex/Flex';
import Wrapper from '../Wrapper/Wrapper';

enum ListTag {
    numeric = 'ol',
    marker = 'ul',
    undefined = 'ul',
}

enum ListStyle {
    numeric = 'decimal',
    marker = 'disc',
}

interface ListProps extends Omit<FlexProps, 'direction'> {
    children: ReactNode;
    type?: 'numeric' | 'marker'
}

const ListItemWrapper = ({ children, type }: ListProps) => {
    const [isHideNotManual, setIsHideNotManual] = useState(true);

    const childRef = useRef<HTMLElement>(null);
    const style = type && {
        listStyle: `${ListStyle[type]} inside`,
    };

    useEffect(() => {
        if (childRef.current) {
            const manualItems = childRef.current.querySelectorAll('li[data-list-item]');
            if (manualItems?.length) {
                manualItems.forEach((el) => {
                    Object.assign(el.style, style);
                });
            } else {
                setIsHideNotManual(false);
            }
        }
    }, [style]);

    return (
        <Wrapper
            tag="li"
            style={style}
            isHide={isHideNotManual}
        >
            {React.cloneElement(children, {
                ref: (el) => {
                    childRef.current = el;
                    if (typeof children.ref === 'function') {
                        children.ref(el);
                    } else if (children.ref !== null) {
                        children.ref.current = el;
                    }
                },
            })}
        </Wrapper>
    );
};

const List = (props: ListProps, ref: ForwardedRef<ElementRef<typeof Flex>>) => {
    const {
        children, type, ...otherProps
    } = props;

    return (
        <Flex
            gap={8}
            tag={ListTag[type]}
            direction="column"
            ref={ref}
            {...otherProps}
        >
            {React.Children.map(children, (child) => (
                <ListItemWrapper type={type}>
                    {child}
                </ListItemWrapper>
            ))}
        </Flex>
    );
};

export default memo(forwardRef(List));

export const ListItem = ({ children }) => {
    return <li data-list-item>{children}</li>;
};
