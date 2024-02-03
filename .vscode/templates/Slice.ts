import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface {fileNameUpper}State {

}

const initalState: {fileNameUpper}State = {

};

const {fileNameLower}Slice = createSlice({
    name: '{fileNameLower}',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<string>) {
            
        }
    },
});

export const { actions: {fileNameLower}Actions } = {fileNameLower}Slice;
export const { reducer: {fileNameLower}Reducer } = {fileNameLower}Slice;
