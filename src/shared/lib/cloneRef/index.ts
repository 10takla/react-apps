import { ForwardedRef, MutableRefObject } from "react";

export default <T>(children: any, ref: ForwardedRef<T | undefined>, tmp: (el: T) => void) => {
    (el: T) => {
        if (typeof children.ref === 'function') {
            children.ref(el);
        } else if (children.ref !== null) {
            (children.ref as MutableRefObject<T>).current = el;
        }
        if (typeof ref === 'function') {
            ref(el);
        } else if (ref !== null) {
            ref.current = el;
        }
        tmp(el)
    }
}