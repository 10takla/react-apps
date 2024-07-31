import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from "S/providers/store/StoreProvider";
import { marketApi } from "src/market/shared/api/marketApi";
import { MarketState, marketReducer } from './slices/marketSlice';
import { ClientState, clientReducer } from './slices/clientSlice';
import { StoreState, storeReducer } from './slices/storeSlice';

export interface MarketScheme {
    market: MarketState
    client: ClientState,
    store: StoreState,
    [marketApi.reducerPath]: ReturnType<typeof marketApi.reducer>
}

interface MarketProviderProps extends Pick<StoreProviderProps<MarketScheme>, 'initialState'> {
    children: ReactNode
}

const MarketProvider = (props: MarketProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const rootReducers = {
        market: marketReducer,
        client: clientReducer,
        store: storeReducer,
        [marketApi.reducerPath]: marketApi.reducer,
    };

    return (
        <StoreProvider
            keyName="marketProvider"
            localStateConfig={[]}
            middlewars={[marketApi.middleware]}
            {...{ rootReducers, initialState }}
        >
            {children}
        </StoreProvider>
    );
};

export default memo(MarketProvider);
