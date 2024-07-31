import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from 'src/shared/providers/store/StoreProvider';
import { {fileNameUpper}State, {fileNameLower}Reducer } from './slices/{fileNameLower}Slice';

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
        <StoreProvider keyName="{fileNameLower}" localStateConfig={[]} {...{ rootReducers, initialState }}>
            {children}
        </StoreProvider>
    );
};

export default memo({fileNameUpper}Provider);
