import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from 'src/shared/stateManagers/store/StoreProvider';
import { GameOfLifeState, gameOfLifeReducer } from './slices/gameOfLifeSlice';
import { PlanetState, planetReducer } from './slices/planetSlice';

export interface SceneScheme {
    gameOfLife: GameOfLifeState
    planet: PlanetState
}

interface SceneProviderProps extends Pick<StoreProviderProps<SceneScheme>, 'initialState'> {
    children: ReactNode
}

const SceneProvider = (props: SceneProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const rootReducers = {
        gameOfLife: gameOfLifeReducer,
        planet: planetReducer,
    };

    return (
        <StoreProvider
            {...{ rootReducers, initialState }}
            localStateConfig={[
                ['gameOfLife',
                    [
                        'speed',
                        'size',
                        'resolution',
                    ],
                ],
            ]}
            keyName="scene"
        >
            {children}
        </StoreProvider>
    );
};

export default memo(SceneProvider);
