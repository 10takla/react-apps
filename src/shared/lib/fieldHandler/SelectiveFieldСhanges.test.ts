import { expect } from "@storybook/test";
import selectiveFieldСhanges from "./selectiveFieldСhanges";

const state = {
    field1: 'value',
    field2: 22,
    field3: {
        f1: 'sdfsf',
        f2: [23, 34, 'ddsf'],
    },
};

describe('selectiveFieldСhanges', () => {
    test('тест 1', () => {
        const update = {
            field1: 'value2',
            field2: 23,
        }
        expect(
            selectiveFieldСhanges(
                state,
                update
            )
        ).toEqual(
            {
                field1: 'value2',
                field2: 23,
                field3: {
                    f1: 'sdfsf',
                    f2: [23, 34, 'ddsf'],
                },
            }
        );
    });
    test('тест 2', () => {
        const update = {
            field3: {
                f1: '23213',
            },
        }
        expect(
            selectiveFieldСhanges(
                state,
                update
            )
        ).toEqual(
            {
                field1: 'value',
                field2: 22,
                field3: {
                    f1: '23213',
                    f2: [23, 34, 'ddsf'],
                },
            }
        );
    });
    test('тест 3', () => {
        expect(
            selectiveFieldСhanges(
                {
                    resolution: 4
                },
                {
                    resolution: 2
                }
            )
        ).toEqual(
            {
                resolution: 2
            }
        );
    });
    test('когда поле undefined', () => {
        expect(
            selectiveFieldСhanges(
                {
                    actionPanel: {
                        pointsCount: undefined
                    }
                },
                {
                    actionPanel: {
                        pointsCount: 21
                    }
                }
            )
        ).toEqual(
            {
                actionPanel: {
                    pointsCount: 21
                },
            },
        );
    });
});