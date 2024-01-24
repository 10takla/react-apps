import { MutableRefObject, useEffect } from 'react';

class Vector {
    x;

    y;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
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

    toArray() {

    }
}

interface DragProps {
    dragElement: HTMLElement,
    dragInitiator: HTMLElement,
    direction: 'x' | 'y' | undefined,
    step?: number,
    onStart?: () => void
    onMove?: () => void
    onEnd?: () => void
}

const drag = (props: DragProps) => {
    const {
        dragElement,
        dragInitiator,
        direction,
        step = 1,
        onStart,
        onMove,
        onEnd,
    } = props;

    dragInitiator.addEventListener('mousedown', toStart);
    let start: Vector = new Vector(0, 0);

    function toStart(e: MouseEvent) {
        start = getPostionFromEvent(e);

        document.body.addEventListener('mousemove', toMove);
        document.body.addEventListener('mouseup', toEnd);

        onStart?.();
    }

    function toMove(e) {
        const trans = getPostionFromEvent(e).sub(start)
            .map((c) => {
                return Math.floor(c / step) * step;
            });
        setTransform(trans);

        onMove?.();
    }

    function toEnd(e) {
        document.body.removeEventListener('mousemove', toMove);
        document.body.removeEventListener('mouseup', toEnd);

        start = new Vector(0, 0);
        setTransform(start);

        onEnd?.();
    }

    function getPostionFromEvent(e: MouseEvent) {
        return new Vector(e.clientX, e.clientY);
    }

    function setTransform(trans: Vector) {
        const prefix = direction ? direction.toUpperCase() : '';
        const translateValue = ['x', 'y'].filter((k) => {
            if (direction) {
                return k === direction;
            }
            return true;
        }).map((k) => `${trans[k]}px`).join(', ');
        dragElement.style.transform = `translate${prefix}(${translateValue})`;
    }

    return toStart;
};

export interface UseDragProps extends Omit<DragProps, 'dragElement' | 'dragInitiator'> {
    elemenetRef: MutableRefObject<HTMLElement | undefined>
}

export default (props: UseDragProps) => {
    const {
        elemenetRef,
        ...otherProps
    } = props;

    useEffect(() => {
        const dragElement = elemenetRef.current;
        const dragInitiator = dragElement?.querySelector('[data-drag]');

        if (dragElement && dragInitiator) {
            const toStart = drag({
                dragElement,
                dragInitiator,
                ...otherProps,
            });

            return () => {
                dragInitiator.removeEventListener('mousedown', toStart);
            };
        }
    }, [elemenetRef, otherProps]);
};
