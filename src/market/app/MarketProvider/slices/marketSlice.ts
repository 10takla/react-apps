import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MarketState {
    
}

const initalState: MarketState = {

};

const marketSlice = createSlice({
    name: 'market',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof MarketState]?: MarketState[K] }>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { actions: marketActions } = marketSlice;
export const { reducer: marketReducer } = marketSlice;
