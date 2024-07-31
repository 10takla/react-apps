import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GameOfLifeState {
    trigger: number
    isStart: boolean
    speed: number
    size: number
    resolution: [number, number, number]
}

const initalState: GameOfLifeState = {
    trigger: 0,
    isStart: false,
    speed: 400,
    size: 0.4,
    resolution: [12, 12, 12],
};

const gameOfLifeSlice = createSlice({
    name: 'gameOfLife',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof GameOfLifeState]?: GameOfLifeState[K] }>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { actions: gameOfLifeActions } = gameOfLifeSlice;
export const { reducer: gameOfLifeReducer } = gameOfLifeSlice;
