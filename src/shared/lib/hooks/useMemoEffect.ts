import { useState, useEffect } from 'react';

export default (...args: Parameters<typeof useEffect>) => {
    const [state, setState] = useState(args[0]);

    useEffect(() => {
        setState(args[0]);
    }, args[1]);

    return state;
};
