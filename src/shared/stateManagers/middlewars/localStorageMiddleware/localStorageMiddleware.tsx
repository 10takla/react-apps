import { Middleware } from '@reduxjs/toolkit';
import { StateScheme } from '../../store/reducerManager';
import saveLocalState, { SaveLocalStateProps } from './lib/saveLocalState/saveLocalState';

export interface LocalStorageMiddlewareProps extends
    Omit<SaveLocalStateProps, 'state'> {
}

export const localStorageMiddleware = (props: LocalStorageMiddlewareProps):
    Middleware<StateScheme, StateScheme> => {
    const {
        ...localStateProps
    } = props;
    return (store) => (next) => (action) => {
        const result = next(action);
        saveLocalState({ ...localStateProps, baseState: store.getState() });
        return result;
    };
};
