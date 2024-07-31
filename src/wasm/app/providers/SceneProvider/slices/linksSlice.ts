import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Link = {
    route: string
    linkText: string
    to: JSX.Element
}

export interface LinksState {
    links: Array<Link[]>
}

const initalState: LinksState = {
    links: [],
};

const linksSlice = createSlice({
    name: 'links',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof LinksState]?: LinksState[K] }>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { actions: linksActions } = linksSlice;
export const { reducer: linksReducer } = linksSlice;
