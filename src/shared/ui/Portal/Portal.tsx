import { ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode
    to?: HTMLElement | string | null | Element
}

const Portal = (props: PortalProps) => {
    const {
        children,
    } = props;
    let {
        to,
    } = props;

    if (typeof to === 'string') {
        to = document.querySelector(to);
    }
    
    return (
        createPortal(children, to || document.body)
    );
};

export default memo(Portal);