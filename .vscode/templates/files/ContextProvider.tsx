import {
    memo, ReactNode, useState, useMemo,
} from 'react';
import { {fileNameUpper}, {fileNameLower}Context } from './{fileNameLower}Context';

interface {fileNameUpper}ProviderProps {
    children: ReactNode
}

const {fileNameUpper}Provider = (props: {fileNameUpper}ProviderProps) => {
    const {
        children,
    } = props;

    const [{fileNameLower}, set{fileNameUpper}] = useState<{fileNameUpper}>();

    return (
        <{fileNameLower}Context.Provider value={useMemo(() => ({ {fileNameLower}, set{fileNameUpper} }), [{fileNameLower}])}>
            {children}
        </{fileNameLower}Context.Provider>
    );
};

export default memo({fileNameUpper}Provider);
