import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isObject } from "S/providers/store/middlewars/localStorageMiddleware/lib/isObject";

export interface PlanetState {
    trigger: number,
    trigger2: number,
    pointCount: number,
    scales: {
        pointsField: number
        points: number
    },
    sizes: [number, number]
}

const initalState: PlanetState = {
    trigger: 0,
    trigger2: 0,
    pointCount: 100,
    sizes: [0.8, 0.5],
    scales: {
        pointsField: 0.9,
        points: 1,
    },
};

const planetSlice = createSlice({
    name: 'planet',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof PlanetState]?: PlanetState[K] }>) {
            const t = (st: object, s: object) => (
                Object.entries(st).reduce((all, [key, value]) => {
                    if (isObject(value)) {
                        const k = s[key];
                        return { ...all, [key]: { ...k, ...t(value, k) } };
                    }
                    return { ...all, [key]: value };
                }, {} as any)
            );

            return { ...state, ...t(action.payload, state) };
        },
        incrementTrigger(state, action: PayloadAction<keyof PlanetState>) {
            // @ts-ignore
            state[action.payload] += 1;
        },
    },
});

export const { actions: planetActions } = planetSlice;
export const { reducer: planetReducer } = planetSlice;
