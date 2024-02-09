interface Dirs {
    'row': 'column',
    'offsetWidth': 'offsetHeight',
    'x': 'y',
    0: 1,
    X: 'Y',
    left: 'top',
    right: 'bottom',
    width: 'height'
}
type Direc = keyof Dirs | Dirs[keyof Dirs]
const relations = {
    row: 'column',
    offsetWidth: 'offsetHeight',
    x: 'y',
    0: 1,
    X: 'Y',
    left: 'top',
    right: 'bottom',
    width: 'height',
};

export class Direction {
    id: number;

    dir: Direc;

    constructor(value: Direc) {
        this.dir = value;
        const index = Object.entries(relations).reduce((all, x) => {
            if (all !== undefined) {
                return all;
            }
            const index = x.findIndex((a) => a === value);
            if (index !== -1) {
                return index;
            }
        }, undefined as number | undefined);

        if (index === undefined) {
            throw new Error('конструктор');
        }

        this.id = index;
    }

    get<K extends keyof Dirs>(dir: K): Dirs[K] | K {
        if (this.id === 0) {
            return dir;
        } if (this.id === 1) {
            return relations[dir];
        }
        throw new Error('get_dir');
    }

    get rev(): Direction {
        return new Direction(
            Object.entries(relations).reduce((all, [a, b]) => (
                { ...all, [a]: b, [b]: a }
            ), {} as any)[this.dir],
        );
    }

    reverse(dir: keyof Dirs): Direc {
        return Object.entries(relations).reduce((all, [a, b]) => (
            { ...all, [a]: b, [b]: a }
        ), {} as any)[dir];
    }

    toString() {
        return this.dir;
    }
}

export const revDir = Object.entries(relations).reduce((all, [a, b]) => (
    { ...all, [a]: b, [b]: a }
), {} as any);
