import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import selectiveАieldСhanges from 'src/shared/lib/fieldHandlers/selectiveFieldСhanges';

export interface {fileNameUpper}State {

}

const initalState: {fileNameUpper}State = {

};

const {fileNameLower}Slice = createSlice({
    name: '{fileNameLower}',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof StoreState]?: StoreState[K] }>) {
            return selectiveАieldСhanges({ ...state }, action.payload);
        },
    },
});

export const { actions: {fileNameLower}Actions } = {fileNameLower}Slice;
export const { reducer: {fileNameLower}Reducer } = {fileNameLower}Slice;
