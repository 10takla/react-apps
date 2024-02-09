class Vector {
    x;

    y;

    constructor(arg1: number | MouseEvent | DOMRect | Vector, arg2?: number) {
        if (typeof arg1 === 'number' && arg2 !== undefined) {
            this.x = arg1;
            this.y = arg2;
        } else if (arg1 instanceof MouseEvent) {
            this.x = arg1.clientX;
            this.y = arg1.clientY;
        } else if (arg1 instanceof DOMRect) {
            this.x = arg1.x;
            this.y = arg1.y;
        } else if (arg1 instanceof Vector) {
            this.x = arg1.x;
            this.y = arg1.y;
        } else {
            throw new Error('not valid input data');
        }
    }

    set(arg1: number | MouseEvent | DOMRect | Vector, arg2?: number): Vector {
        let vector: Vector;

        if (arg1 instanceof Vector) {
            vector = arg1;
        } else {
            vector = new Vector(arg1, arg2);
        }

        this.x = vector.x;
        this.y = vector.y;
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    map(fn: (a: [string, number], index: number) => number | undefined): this {
        Object.entries({
            x: this.x,
            y: this.y,
        }).forEach(([key, c], i) => {
            this[key] = fn([key, c], i) ?? c;
        });
        return this;
    }
}
export default Vector;
