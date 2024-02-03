import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SceneState {
    trigger: number
    isStart: boolean
    speed: number
    size: number
    resolution: [number, number, number]
}

const initalState: SceneState = {
    trigger: 0,
    isStart: false,
    speed: 400,
    size: 0.4,
    resolution: [12, 12, 12],
};

const SceneSlice = createSlice({
    name: 'Scene',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<[keyof SceneState, SceneState[keyof SceneState]]>) {
            state[action.payload[0]] = action.payload[1];
        },
    },
});

export const { actions: SceneActions } = SceneSlice;
export const { reducer: SceneReducer } = SceneSlice;
