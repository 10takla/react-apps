import {
    forwardRef, memo, ForwardedRef, ReactElement, cloneElement, RefAttributes,
} from 'react';
import { FoldTransition } from '../../Animations/FoldTransition';

type El<T extends React.ElementType> = React.ElementRef<T> | null;

interface HiddenProps<T extends React.ElementType> {
    isHidden?: boolean
    children: ReactElement & RefAttributes<T>
}

const Hidden = <T extends React.ElementType,>(props: HiddenProps<T>, ref: ForwardedRef<El<T>>) => {
    const {
        isHidden = false,
        children,
    } = props;

    return (
        // <FoldTransition timeout={100} in={!isHidden}>
        !isHidden && cloneElement(children, {
            ref: (el: El<T> | null) => {
                if (typeof children.ref === 'function') {
                    children.ref(el as T);
                } else if (children.ref) {
                    (children.ref as React.MutableRefObject<El<T>>).current = el;
                }
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref) {
                    (ref as React.MutableRefObject<El<T>>).current = el;
                }
            },
        })
        // </FoldTransition>
    );
};

export default memo(forwardRef(Hidden));
