import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

export type StateScheme = Record<string, any>
type StateSchemaKey<SS = StateScheme> = keyof SS;
type MountedReducers<SS = StateScheme> = OptionalRecord<StateSchemaKey<SS>, boolean>;

export interface ReducerManager<SS = StateScheme> {
    getReducerMap: () => ReducersMapObject<SS>;
    reduce: (state: SS, action: AnyAction) => CombinedState<SS>;
    add: (key: StateSchemaKey<SS>, reducer: Reducer) => void;
    remove: (key: StateSchemaKey<SS>) => void;
    getMountedReducers: () => MountedReducers<SS>;
}

export function createReducerManager<SS extends StateScheme>(
    initialReducers: ReducersMapObject<SS>,
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: Array<StateSchemaKey<SS>> = [];
    const mountedReducers: MountedReducers<SS> = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        reduce: (state: SS, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey<SS>, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;

            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey<SS>) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;

            combinedReducer = combineReducers(reducers);
        },
    };
}
