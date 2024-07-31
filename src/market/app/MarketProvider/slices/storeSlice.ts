import { OrbitControls } from '@react-three/drei';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ComponentProps } from 'react';
import selectiveАieldСhanges from "S/lib/fieldHandler/selectiveFieldСhanges";
import { AmbientLight, PointLight } from 'three';

export interface StoreState {
    currentPlanetId?: number,
    events: {
        isMove: boolean
    }
    controlPanel: {
        resolution: 2 | 4,
        lights: {
            pointLight: PointLight
            ambientLight: Partial<AmbientLight>
        },
        orbitControls: ComponentProps<typeof OrbitControls>
    }
    actionPanel: {
        pointsCount?: number
        reset: number,
        set: number
    },
}

const initalState: StoreState = {
    currentPlanetId: 8,
    actionPanel: {
        pointsCount: undefined,
        reset: 0,
        set: 0
    },
    controlPanel: {
        resolution: 4,
        lights: {
            pointLight: {
                intensity: 10,
                position: [2, 2, 2],
            },
            ambientLight: {
                intensity: 3,
            },
        },
        orbitControls: {
            enablePan: false,
            autoRotate: false,
            rotateSpeed: 1,
            // enableDamping: true,
            // dampingFactor: 0.5,
        },
    },
    events: {
        isMove: false
    }
};

const storeSlice = createSlice({
    name: 'store',
    initialState: initalState,
    reducers: {
        setState(state, action: PayloadAction<{ [K in keyof StoreState]?: StoreState[K] }>) {
            return selectiveАieldСhanges({ ...state }, action.payload);
        },
    },
});

export const { actions: storeActions } = storeSlice;
export const { reducer: storeReducer } = storeSlice;
