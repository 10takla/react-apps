import { useEffect } from 'react';

export default (element: HTMLElement, handle: () => void) => useEffect(() => {
    element.addEventListener('resize', handle);
    return () => {
        element.removeEventListener('resize', handle);
    };
}, [element, handle]);
