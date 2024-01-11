import React, { useCallback, useEffect, useState } from 'react';

export interface UseMouseMovePros {
    onMove: (e: React.MouseEvent) => void;
    onEnd?: () => void;
    onStart?: (e: React.MouseEvent) => void
}

export default ({
    onMove,
    onEnd,
    onStart,
}: UseMouseMovePros) => {
    const [userSelect, setUserSelect] = useState<string>('none');

    const clearHandler = useCallback(() => {
        document.body.style.userSelect = userSelect;
        // @ts-ignore
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', clearHandler);
        onEnd?.();
    }, [userSelect, onMove, onEnd]);

    useEffect(() => {
        return () => {
            if (userSelect !== 'none') {
                clearHandler();
            }
        };
    }, [clearHandler, onMove, userSelect]);

    const toStart = useCallback((e: React.MouseEvent) => {
        document.body.style.userSelect = 'none';
        // @ts-ignore
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', clearHandler);
        setUserSelect(document.body.style.userSelect);
        onStart?.(e);
    }, [clearHandler, onMove, onStart]);

    const toEnd = useCallback(() => {
        clearHandler();
    }, [clearHandler]);

    return {
        toStart, toEnd,
    };
};
