import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Point } from 'src/wasm/widgets/Planet/PlanetScene/PlanetScene';

export interface PlanetState {
    trigger: number,
    pointCount: number,
    sizes: Point
}

const initalState: PlanetState = {
    trigger: 0,
    pointCount: 0,
    sizes: [8, 3, 0],
};

const planetSlice = createSlice({
    name: 'planet',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof PlanetState]?: PlanetState[K] }>) {
            return { ...state, ...action.payload };
        },
        setTrigger(state) {
            state.trigger += 1;
        },
    },
});

export const { actions: planetActions } = planetSlice;
export const { reducer: planetReducer } = planetSlice;
