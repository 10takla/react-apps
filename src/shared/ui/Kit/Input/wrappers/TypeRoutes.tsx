import {
    forwardRef, memo, ForwardedRef, cloneElement, ReactElement, ComponentProps, RefAttributes, MutableRefObject,
} from 'react';
import NumberInput from './ui/NumberInput';

type El = HTMLElement | undefined;

interface TypeRoutesProps extends ComponentProps<typeof NumberInput> {
    children: ReactElement & RefAttributes<El>
}

const TypeRoutes = (props: TypeRoutesProps, ref: ForwardedRef<El>) => {
    const {
        children,
        type,
        ...otherProps
    } = props;

    if (type === 'number') {
        return (
            <NumberInput
                {...{
                    ...otherProps, type,
                }}
            >
                {children}
            </NumberInput>
        );
    }

    return (
        cloneElement(children, {
            ...otherProps,
            type,
            ref: (el: El) => {
                if (typeof children.ref === 'function') {
                    children.ref(el);
                } else if (children.ref !== null) {
                    (children.ref as MutableRefObject<El>).current = el;
                }
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref !== null) {
                    ref.current = el;
                }
            },
        })
    );
};

export default memo(forwardRef(TypeRoutes));
