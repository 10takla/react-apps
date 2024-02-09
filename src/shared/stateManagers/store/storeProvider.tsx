import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { CreateReduxStoreProps, createReduxStore } from './store';
import { StateScheme } from './reducerManager';

export interface StoreProviderProps<SS extends StateScheme> extends CreateReduxStoreProps<SS> {
    children?: ReactNode;
}

const StoreProvider = <SS extends StateScheme>(props: StoreProviderProps<SS>) => {
    const {
        children,
        ...otherProps
    } = props;

    const store = createReduxStore<SS>(otherProps);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;
