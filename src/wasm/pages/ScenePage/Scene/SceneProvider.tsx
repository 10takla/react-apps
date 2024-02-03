import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from 'src/shared/stateManagers/store/storeProvider';
import { SceneReducer, SceneState } from './slices/sceneSlice';

export interface SceneScheme {
    Scene: SceneState
}

interface SceneProviderProps extends Pick<StoreProviderProps<SceneScheme>, 'initialState'>{
    children: ReactNode
}

const SceneProvider = (props: SceneProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const rootReducers = {
        Scene: SceneReducer,
    };

    return (
        <StoreProvider {...{ rootReducers, initialState }}>
            {children}
        </StoreProvider>
    );
};

export default memo(SceneProvider);
