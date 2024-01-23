import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager, StateScheme } from './reducerManager';
import { loadStateFromLocalStorage, localStorageMiddleware } from '../middlewars/localStorageMiddleware';



export function createReduxStore<SS extends StateScheme = StateScheme>(
    rootReducers: ReducersMapObject<SS>,
    initialState: SS,
) {
    const reducerManager = createReducerManager<SS>(rootReducers);

    const extraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<SS>>,
        devTools: __IS_DEV__,
        preloadedState: loadStateFromLocalStorage() || initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware).concat(localStorageMiddleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
