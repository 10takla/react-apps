import { StateScheme } from 'src/shared/stateManagers/store/reducerManager';
import { isObject } from '../isObject';
import { LocalStateConfig, LocalStorageStateProps } from '../getLocalStorageState/getLocalStorageState';

export const getConfigState = (state: StateScheme, p: LocalStateConfig<StateScheme>): StateScheme => {
    return p.reduce((all, field) => {
        if (typeof field === 'string') {
            return { ...all, [field]: state[field] };
        }
        if (Array.isArray(field)) {
            return { ...all, [field[0]]: getConfigState(state[field[0]], field[1]) };
        }
    }, {} as StateScheme);
};

export const isLocalStateUpdate = (newState: StateScheme, localState: StateScheme): boolean => {
    return Object.entries(newState).some(([key, value]) => {
        // console.log(value, localState[key]);
        if (isObject(value) && isObject(localState[key])) {
            return isLocalStateUpdate(value, localState[key]);
        }
        if (!isObject(value) && !isObject(localState[key])
            && value === localState[key]) {
            return false;
        }
        if (Array.isArray(value) && Array.isArray(localState[key])) {
            return false;
        }
        return true;
    });
};

export interface SaveLocalStateProps extends
    Pick<LocalStorageStateProps<StateScheme>, 'localStateConfig' | 'keyName'> {
    baseState: StateScheme
}

export default (props: SaveLocalStateProps) => {
    const {
        baseState,
        localStateConfig,
        keyName,
    } = props;

    const newState = getConfigState(baseState, localStateConfig);

    let isUpdate = true;

    try {
        const localStateString = localStorage.getItem(`${keyName}State`);
        if (localStateString) {
            const localState = JSON.parse(localStateString) as StateScheme;
            isUpdate = isLocalStateUpdate(newState, localState);
        }
    } catch (e) { console.warn(e); }

    if (isUpdate) {
        try {
            const serializedState = JSON.stringify(newState);
            localStorage.setItem(`${keyName}State`, serializedState);
        } catch (e) { console.warn(e); }
    }
};
