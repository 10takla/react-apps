import $ from 'jquery';
import {
    useMemo, useRef, useEffect, cloneElement,
} from 'react';
import { TransitionProps } from 'react-transition-group/Transition';

interface FoldTransitionProps extends Omit<TransitionProps, 'timeout'> {
    timeout: `--${string}` | number;
}

export const FoldTransition = (props: FoldTransitionProps) => {
    const {
        children,
        timeout,
        in: inToggle,
        ...otherProps
    } = props;

    const postTimeout = useMemo(() => {
        if (typeof timeout === 'string') {
            const rootStyles = getComputedStyle(document.documentElement);
            return parseInt(rootStyles.getPropertyValue(timeout), 10);
        }
        return timeout;
    }, [timeout]);

    const animRef = useRef();
    useEffect(() => {
        if (animRef.current) {
            if (!otherProps.in) {
                $(animRef.current).slideUp(0);
            } else {
                $(animRef.current).slideDown(0);
            }
        }
    }, []);

    useEffect(() => {
        if (animRef.current) {
            if (!inToggle) {
                $(animRef.current).slideUp(postTimeout);
            } else {
                $(animRef.current).slideDown(postTimeout);
            }
        }
    }, [inToggle, postTimeout]);

    return (
        cloneElement(children, {
            ref: animRef,
            ...otherProps,
        })
    );
};
