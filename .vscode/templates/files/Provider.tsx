import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from 'src/shared/stateManagers/store/storeProvider';
import { {fileNameUpper}Reducer, {fileNameUpper}State } from './slices/{fileNameLower}Slice';

export interface {fileNameUpper}Scheme {
    {fileNameLower}: {fileNameUpper}State
}

interface {fileNameUpper}ProviderProps extends Pick<StoreProviderProps<{fileNameUpper}Scheme>, 'initialState'>{
    children: ReactNode
}

const {fileNameUpper}Provider = (props: {fileNameUpper}ProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const rootReducers = {
        {fileNameLower}: {fileNameLower}Reducer,
    };

    return (
        <StoreProvider {...{ rootReducers, initialState }}>
            {children}
        </StoreProvider>
    );
};

export default memo({fileNameUpper}Provider);