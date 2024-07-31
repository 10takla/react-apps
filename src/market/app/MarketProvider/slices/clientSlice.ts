import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ClientState {
    isAuth: boolean
}

const initalState: ClientState = {
    isAuth: false,
};

const clientSlice = createSlice({
    name: 'client',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof ClientState]?: ClientState[K] }>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { actions: clientActions } = clientSlice;
export const { reducer: clientReducer } = clientSlice;
