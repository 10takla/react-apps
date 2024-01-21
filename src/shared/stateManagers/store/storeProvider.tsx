import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from './store';
import { StateScheme } from './reducerManager';

export interface StoreProviderProps<SS extends StateScheme> {
    children?: ReactNode;
    initialState?: SS;
    rootReducers: Parameters<typeof createReduxStore>[0]
}

const StoreProvider = <SS extends StateScheme>(props: StoreProviderProps<SS>) => {
    const {
        children,
        initialState,
        rootReducers,
    } = props;

    const store = createReduxStore(
        rootReducers,
        initialState || {},
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;
