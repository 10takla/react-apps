import {
    MutableRefObject,
    useEffect,
    useImperativeHandle,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import Vector from 'src/shared/lib/geometry/vector';
import { Direction } from 'src/wordLearner/shared/lib/direction/direction';
import { DragProps, drag } from './lib/drag';

export interface UseDragProps extends Omit<DragProps, 'dragElement' | 'dragInitiator'> {
    elemenetRef: MutableRefObject<HTMLElement | null>
    rootRef?: MutableRefObject<HTMLElement | null>
    direction: 'x' | 'y' | undefined
    translate?: Vector
    isBoundOnlyDrag?: boolean
}

export default (props: UseDragProps) => {
    const {
        elemenetRef,
        translate,
        direction,
        onMove,
        onEnd,
        isBoundOnlyDrag = false,
        rootRef,
        ...otherProps
    } = props;

    const dragInitiatorRef = useRef<HTMLElement>(null);
    useImperativeHandle(
        dragInitiatorRef,
        () => {
            const element = elemenetRef.current;
            return element?.querySelector('[data-drag]') as HTMLElement || element;
        },
    );

    const filterCoorginates = ['x', 'y'].filter((key) => (
        direction ? key === direction : true
    )) as Array<'x' | 'y'>;

    const getDirectionTranslate = useCallback((trans: Vector) => {
        return trans.map(([key]) => {
            if (direction && key !== direction) return 0;
        });
    }, [direction]);

    const setTransform = useCallback((trans: Vector) => {
        const dragElement = elemenetRef.current;
        if (dragElement) {
            const prefix = direction ? direction.toUpperCase() : '';
            const translateValue = filterCoorginates.map((k) => `${trans[k]}px`).join(', ');
            dragElement.style.transform = `translate${prefix}(${translateValue})`;
        }
    }, [direction, elemenetRef, filterCoorginates]);

    const startPos = useMemo(() => {
        return translate || new Vector(0, 0);
    }, [translate]);

    const save = useRef(startPos);

    useEffect(() => {
        if (translate) {
            setTransform(translate);
            save.current = translate;
        }
    }, [translate]);

    const onPostMove = useCallback((translate: Vector, dragRect: DOMRect, rootRect?: DOMRect) => {
        if (rootRect) {
            filterCoorginates.forEach((coordinate) => {
                const offset = translate[coordinate];
                const dir = new Direction(coordinate);
                const [left, right] = [dir.get('left'), dir.get('right')];

                const [dragElLeft, rootElLeft] = [dragRect[left], rootRect[left]];
                if (dragElLeft + offset < rootElLeft) {
                    translate[coordinate] = rootElLeft - dragElLeft;
                }

                const [dragElRight, rootElRight] = [dragRect[right], rootRect[right]];
                if (dragElRight + offset > rootElRight) {
                    translate[coordinate] = rootElRight - dragElRight;
                }
            });
        }
        translate = translate.add(save.current);
        onMove?.(getDirectionTranslate(translate));
        setTransform(translate);
    }, [filterCoorginates, getDirectionTranslate, onMove, setTransform]);

    const onPostEnd = useCallback((translate: Vector) => {
        const newTranslate = translate.add(save.current);
        save.current = newTranslate;
        if (otherProps.isReset) {
            setTransform(startPos);
            save.current = startPos;
        }
        onEnd?.(getDirectionTranslate(newTranslate));
    }, [getDirectionTranslate, onEnd, otherProps.isReset, setTransform, startPos]);

    useEffect(() => {
        const rootRect = rootRef?.current?.getBoundingClientRect();
        let dragRect = elemenetRef.current?.getBoundingClientRect();

        if (isBoundOnlyDrag) {
            dragRect = elemenetRef.current?.querySelector('[data-drag]')?.getBoundingClientRect();
        }

        if (dragRect && dragInitiatorRef.current) {
            const toStart = drag({
                ...otherProps,
                dragInitiator: dragInitiatorRef.current,
                onMove: (v) => onPostMove(v, dragRect, rootRect),
                onEnd: onPostEnd,
            });

            return () => {
                dragInitiatorRef.current?.removeEventListener('mousedown', toStart);
            };
        }
    }, [elemenetRef, rootRef, onPostMove, otherProps, onPostEnd]);
};
