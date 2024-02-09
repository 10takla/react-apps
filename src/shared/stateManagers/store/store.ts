import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import {
    localStorageMiddleware,
} from '../middlewars/localStorageMiddleware/localStorageMiddleware';
import { LocalStorageStateProps } from '../middlewars/localStorageMiddleware/lib/getLocalStorageState/getLocalStorageState';
import { getLocalStorageState } from '../middlewars/localStorageMiddleware/lib/getLocalStorageState/getLocalStorageState';
import { createReducerManager, StateScheme } from './reducerManager';

export interface CreateReduxStoreProps<SS extends StateScheme> extends LocalStorageStateProps<SS> {
    rootReducers: ReducersMapObject<SS>,
}

export function createReduxStore<SS extends StateScheme>(
    { rootReducers, initialState, ...localStorageProps }: CreateReduxStoreProps<SS>,
) {
    const reducerManager = createReducerManager<SS>(rootReducers);

    const extraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<SS>>,
        devTools: __IS_DEV__,
        // preloadedState: getLocalStorageState({
        //     initialState, ...localStorageProps,
        // }),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware)
            .concat(localStorageMiddleware<SS>(localStorageProps)),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
