import { StateScheme } from '../store/reducerManager';

export const loadStateFromLocalStorage = () => {
    const localState = localStorage.getItem('reduxState');
    try {
        if (localState) {
            const state = JSON.parse(localState);
            return state as StateScheme;
        }
    } catch (e) {
        console.warn(e);
    }
};

const saveStateToLocalStorage = (state: object) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (e) {
        console.warn(e);
    }
};

export const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    saveStateToLocalStorage(store.getState());
    return result;
};
