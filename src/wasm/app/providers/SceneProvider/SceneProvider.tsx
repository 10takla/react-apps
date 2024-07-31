import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from "S/providers/store/StoreProvider";
import { GameOfLifeState, gameOfLifeReducer } from './slices/gameOfLifeSlice';
import { PlanetState, planetReducer } from './slices/planetSlice';
import { LinksState, linksReducer } from './slices/linksSlice';

export interface SceneScheme {
    gameOfLife: GameOfLifeState
    planet: PlanetState
    links: LinksState
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
        links: linksReducer,
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
