import { StateScheme } from "S/providers/store/reducerManager";

export interface LocalStorageStateProps<SS extends StateScheme> {
    initialState?: SS;
    keyName: string;
    localStateConfig: LocalStateConfig<SS>;
}

export const getLocalStorageState = <SS extends StateScheme>({
    initialState, keyName, localStateConfig,
}: LocalStorageStateProps<SS>) => {
    const localState = localStorage.getItem(`${keyName}State`);
    if (localState) {
        try {
            const state = JSON.parse(localState) as SS;
            return state;
        } catch (e) {
            console.warn(e);
        }
    } else {
        return initialState;
    }
}; export type LocalStateConfig<K extends StateScheme> = Array<keyof K | [keyof K, LocalStateConfig<K[keyof K]>]>;
