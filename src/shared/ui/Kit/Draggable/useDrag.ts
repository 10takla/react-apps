import { MutableRefObject, useCallback, useEffect } from 'react';
import { Direction } from 'src/wordLearner/shared/lib/direction/direction';

export class Vector {
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

interface DragProps {
    dragInitiator: HTMLElement,
    step?: number,
    onStart?: () => void
    onMove?: (trans: Vector) => void
    onEnd?: (trans: Vector) => void
}

const drag = (props: DragProps) => {
    const {
        dragInitiator,
        step = 1,
        onStart,
        onMove,
        onEnd,
    } = props;
    dragInitiator.addEventListener('mousedown', toStart);
    let start: Vector = new Vector(0, 0);

    function toStart(e: MouseEvent) {
        start = new Vector(e);

        document.addEventListener('mousemove', toMove);
        document.addEventListener('mouseup', toEnd);

        onStart?.();
    }

    function toMove(e) {
        const trans = new Vector(e).sub(start)
            .map((c) => Math.floor(c / step) * step);
        onMove?.(trans);
    }

    function toEnd(e) {
        document.removeEventListener('mousemove', toMove);
        document.removeEventListener('mouseup', toEnd);

        start = new Vector(0, 0);
        onEnd?.(start);
    }

    return [toStart];
};

export interface UseDragProps extends Omit<DragProps, 'dragElement' | 'dragInitiator'> {
    elemenetRef: MutableRefObject<HTMLElement | null>
    rootRef?: MutableRefObject<HTMLElement | null>
    dragElement: HTMLElement
    direction: 'x' | 'y' | undefined
    translate: Vector
}

export default (props: UseDragProps) => {
    const {
        elemenetRef,
        translate,
        direction,
        onMove,
        onEnd,
        rootRef,
        ...otherProps
    } = props;
    const filterTransCoords = ['x', 'y'].filter((k) => {
        if (direction) {
            return k === direction;
        }
        return true;
    }) as Array<'x' | 'y'>;

    const setTransform = useCallback((trans: Vector) => {
        const dragElement = elemenetRef.current;
        if (dragElement) {
            const prefix = direction ? direction.toUpperCase() : '';

            const translateValue = filterTransCoords.map((k) => `${trans[k]}px`).join(', ');
            dragElement.style.transform = `translate${prefix}(${translateValue})`;
        }
    }, [direction, elemenetRef, filterTransCoords]);

    useEffect(() => {
        const rootRect = rootRef?.current?.getBoundingClientRect();

        const dragElement = elemenetRef.current;
        const dragInitiator = dragElement?.querySelector('[data-drag]');

        if (dragElement && dragInitiator) {
            const dragRect = dragElement?.getBoundingClientRect();
            const [toStart] = drag({
                ...otherProps,
                dragInitiator,
                onMove: (translate) => {
                    if (rootRect) {
                        filterTransCoords.forEach((coordinate) => {
                            const dir = new Direction(coordinate);

                            const dragElLeft = dragRect[dir.get('left')];
                            const dragElRight = dragRect[dir.get('right')];
                            const offset = translate[coordinate];

                            const rootElLeft = rootRect[dir.get('left')];
                            const rootElRight = rootRect[dir.get('right')];
                            if (dragElLeft + offset < rootElLeft) {
                                translate[coordinate] = rootElLeft - dragElLeft;
                            }

                            if (dragElRight + offset > rootElRight) {
                                translate[coordinate] = rootElRight - dragElRight;
                            }
                        });
                    }

                    setTransform(translate);
                    onMove?.(translate);
                },
                onEnd: (v) => {
                    setTransform(v);
                    onEnd?.(v);
                },
            });

            return () => {
                dragInitiator.removeEventListener('mousedown', toStart);
            };
        }
    }, [elemenetRef, filterTransCoords, onEnd, onMove, otherProps, rootRef, setTransform]);

    useEffect(() => {
        if (translate) {
            setTransform(translate);
        }
    }, [setTransform, translate]);
};
