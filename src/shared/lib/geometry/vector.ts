class Vector {
    x;

    y;

    constructor(arg1: number | MouseEvent | DOMRect, arg2?: number) {
        if (typeof arg1 === 'number' && arg2 !== undefined) {
            this.x = arg1;
            this.y = arg2;
        } else if (arg1 instanceof MouseEvent) {
            this.x = arg1.clientX;
            this.y = arg1.clientY;
        } else if (arg1 instanceof DOMRect) {
            this.x = arg1.x;
            this.y = arg1.y;
        } else {
            throw new Error('not valid input data');
        }
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    map(fn: (c: number) => void): this {
        Object.entries({
            x: this.x,
            y: this.y,
        }).forEach(([key, c]) => {
            this[key] = fn(c);
        });
        return this;
    }
}
export default Vector;
