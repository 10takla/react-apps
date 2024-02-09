import { getConfigState, isLocalStateUpdate } from './saveLocalState';

const state = {
    field1: 'value',
    field2: 22,
    field3: {
        f1: 'sdfsf',
        f2: [23, 34, 'ddsf'],
    },
};

describe('getConfigState', () => {
    test('простое соответсвие всех полей', () => {
        const result = getConfigState(
            state,
            [
                'field1',
                'field2',
                'field3',
            ],
        );
        expect(result).toEqual(state);
    });

    test('глубокое соответствие всех полей', () => {
        const result = getConfigState(
            state,
            [
                'field1',
                'field2',
                ['field3', [
                    'f1',
                    'f2',
                ]],
            ],
        );
        expect(result).toEqual(state);
    });

    test('все кроме поля field3', () => {
        const result = getConfigState(
            state,
            [
                'field1',
                'field2',
            ],
        );
        const { field3, ...postState } = state;
        expect(result).toEqual(postState);
    });

    test('отсутсвие всех полей', () => {
        const result = getConfigState(
            state,
            [],
        );
        const { field3, ...postState } = state;
        expect(result).toEqual({});
    });
});

describe('isLocalStateUpdate', () => {
    const localState = {
        field1: 'value',
        field2: 22,
        field3: {
            f1: 'sdfsf',
            f2: [23, 34, 'ddsf'],
        },
    };

    test('ничего не изменилось', () => {
        const newState = localState;
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(false);
    });

    test('изменилось одно поле', () => {
        const newState = { ...localState, field1: 'value2' };
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(true);
    });

    test('глубокое изменеие', () => {
        const newState = {
            ...localState,
            field3: { ...localState.field3, f1: 'newF1Value' },
        };
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(true);
    });

    test('отсутвие одного поля, без изменений', () => {
        const { field3, ...newState } = { ...localState };
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(false);
    });

    test('отсутвие одного глубокого поля, без изменений', () => {
        const { f1, ...field3 } = localState.field3;
        const newState = {
            ...localState, field3,
        };
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(false);
    });

    test('отсутвие одного глубокого поля, c изменением', () => {
        const { f1, ...field3 } = localState.field3;
        const newState = {
            ...localState, field3: { ...field3, f2: 'newF2Value' },
        };
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(true);
    });

    test('новое поле', () => {
        const newState = {
            ...localState, newField: [22],
        };
        const result = isLocalStateUpdate(
            newState,
            localState,
        );
        expect(result).toEqual(true);
    });
});