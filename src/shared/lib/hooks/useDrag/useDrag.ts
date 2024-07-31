import {
    MutableRefObject,
    useEffect,
    useImperativeHandle,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import Vector from "S/lib/geometry/vector";
import { Direction } from "src/wordLearner/shared/lib/direction/direction";
import { DragProps, drag } from './lib/drag';
import { logDOM } from '@storybook/test';

export interface UseDragProps extends Omit<DragProps, 'dragElement' | 'dragInitiator'> {
    elemenetRef: MutableRefObject<HTMLElement | null>
    boundsRectRef?: MutableRefObject<HTMLElement | null | undefined>
    direction?: 'x' | 'y'
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
        boundsRectRef,
        ...otherProps
    } = props;

    const dragInitiatorRef = useRef<HTMLElement>(null);
    useImperativeHandle(
        dragInitiatorRef,
        () => {
            const element = elemenetRef.current;
            if (element) {
                element.style.visibility = 'hidden'
            }
            return element?.querySelector('[data-drag]') as HTMLElement || element;
        },
        []
    );

    const filterCoorginates = ['x', 'y'].filter((key) => (
        direction ? key === direction : true
    )) as Array<'x' | 'y'>;

    const getDirectionTranslate = useCallback((trans: Vector) => {
        return trans.map(([key]) => {
            if (direction && key !== direction) return startTrans[key];
        });
    }, [direction]);

    const setTransform = useCallback((trans: Vector) => {
        const dragElement = elemenetRef.current;
        if (!dragElement) return

        const translateValue = [trans.x, trans.y].map((v) => `${v}px`).join(', ');
        dragElement.style.transform = `translate(${translateValue})`;
        dragElement.style.visibility = 'visible'
    }, [direction, elemenetRef, filterCoorginates]);

    const onCheck = useCallback((translate: Vector, dragRect: DOMRect, boundsRect?: DOMRect) => {
        if (boundsRect === undefined) return

        // console.log(translate, filterCoorginates);
        filterCoorginates.forEach((coordinate) => {
            // console.log(coordinate);
            const offset = translate[coordinate];
            const dir = new Direction(coordinate);
            const [left, right] = [dir.get('left'), dir.get('right')];

            const [dragLeft, leftBound] = [dragRect[left], boundsRect[left]];

            if (dragLeft + offset < leftBound) {
                translate[coordinate] = leftBound - dragLeft;
            }

            const [dragRight, rightBound] = [dragRect[right], boundsRect[right]];

            // console.log(dragRight, dragRight + offset, rightBound);
            if (dragRight + offset > rightBound) {
                // console.log(rootElRight - dragElRight);
                translate[coordinate] = rightBound - dragRight;
            }
        });
        // console.log(translate);
    }, [])

    const startTrans = useMemo(() => {
        if (translate) {
            return translate
        }
        return new Vector(0, 0)
    }, [translate]);

    const saveTrans = useRef(startTrans);

    useEffect(() => {
        if (translate) {
            if (boundsRectRef?.current && dragInitiatorRef.current && translate) {
                // console.log(translate);
                const drag = dragInitiatorRef.current.getBoundingClientRect()
                const bounds = boundsRectRef.current.getBoundingClientRect()
                // onCheck(translate, drag, bounds)
                // console.log(translate); 
            }

            setTransform(translate);
            saveTrans.current = translate;
        }
    }, [translate]);

    const onPostMove = useCallback((translate: Vector, ...args) => {
        onCheck(translate, ...args)

        translate = translate.add(saveTrans.current);
        translate = getDirectionTranslate(translate);
        onMove?.(translate);
        setTransform(translate);
    }, [filterCoorginates, getDirectionTranslate, onMove, setTransform]);

    const onPostEnd = useCallback((translate: Vector) => {
        const newTranslate = translate.add(saveTrans.current);
        saveTrans.current = newTranslate;
        if (otherProps.isResetPosition) {
            setTransform(startTrans);
            saveTrans.current = startTrans;
        }
        onEnd?.(getDirectionTranslate(newTranslate));
    }, [getDirectionTranslate, onEnd, otherProps.isResetPosition, setTransform, startTrans]);

    useEffect(() => {
        const rootRect = boundsRectRef?.current?.getBoundingClientRect();
        let dragRect = elemenetRef.current?.getBoundingClientRect();

        if (isBoundOnlyDrag) {
            dragRect = elemenetRef.current?.querySelector('[data-drag]')?.getBoundingClientRect();
        }

        if (!(dragRect && dragInitiatorRef.current)) return

        const toStart = drag({
            ...otherProps,
            dragInitiator: dragInitiatorRef.current,
            onMove: (value) => onPostMove(value, dragRect!, rootRect),
            onEnd: onPostEnd,
        });

        return () => {
            dragInitiatorRef.current?.removeEventListener('mousedown', toStart);
        };
    }, [elemenetRef, boundsRectRef, onPostMove, otherProps, onPostEnd]);
};
