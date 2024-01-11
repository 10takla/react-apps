import {
    MutableRefObject, useCallback, useEffect, useMemo, useState,
    useRef,
} from 'react';
import useMouseMove, { UseMouseMovePros } from './useMouseMove';
import { FlexProps } from '@/shared/ui/Stack/Flex/Flex';

type Translate = [number, number]

export interface UseDragProps extends Partial<Omit<UseMouseMovePros, 'onMove'>> {
    direction: FlexProps['direction']
    step?: number
    rootRef?: MutableRefObject<HTMLElement | undefined>
    childRef: MutableRefObject<HTMLElement | undefined>
    onCheck?: (
        target: DOMRect, translate: Translate,
        root: UseDragProps['rootRef'] extends undefined ?
            (undefined | DOMRect) : DOMRect
    ) => void | Translate
    translate?: Translate
    isReset?: boolean
    onInitialization?: (target: DOMRect) => void
    onTranslate?: (translate: Translate) => void
}

export default ({
    onEnd,
    step = 1,
    rootRef,
    onCheck,
    onTranslate,
    childRef,
    onStart,
    onInitialization,
    isReset,
    translate = useMemo(() => [0, 0], []),
    direction,
}: UseDragProps): ReturnType<typeof useMouseMove> => {
    type DirType = {
        [K in | 'width' | 'x' | 'left' | 'right' | 'X']:
        K extends 'width' ? 'width' | 'height'
        : K extends 'x' ? 'x' | 'y'
        : K extends 'left' ? 'left' | 'top'
        : K extends 'right' ? 'right' | 'bottom'
        : K extends 'X' ? 'X' | 'Y'
        : K extends '0' ? '0' | '1'
        : never
    };

    const dir = [
        ['x', 'y'],
        ['0', '1'],
        ['X', 'Y'],
        ['left', 'top'],
        ['right', 'bottom'],
        ['width', 'height'],
    ].reduce((all, [key, value]) => {
        return direction === 'row' ? { ...all, [key]: key } : { ...all, [key]: value };
    }, {} as DirType);

    const [child, setChild] = useState<DOMRect>();
    useEffect(() => {
        if (childRef.current) {
            if (onInitialization) {
                onInitialization(childRef.current.getBoundingClientRect());
            }
            setChild(childRef.current.getBoundingClientRect());
        }
    }, []);

    const start = useRef([0, 0]);

    const [postTranslate, setPostTranslate] = useState(translate);

    useEffect(() => {
        setPostTranslate(translate);
    }, [translate]);

    useEffect(() => {
        if (childRef.current) {
            childRef.current.style.transform = `translate(${postTranslate.map((x) => `${x}px`).join(', ')})`;
        }
    }, [childRef, postTranslate]);
    const countRef = useRef([0, 0]);

    
    return useMouseMove({
        onStart: (e) => {
            start.current = [e.clientX - translate[0], e.clientY - translate[1]];
            onStart?.(e);
        },
        onMove: useCallback((e: React.MouseEvent) => {
            let trans: Translate = [e.clientX - start.current[0], e.clientY - start.current[1]];
            trans = trans.map((x) => x - (x % step)) as Translate;
            if (countRef.current[0] === trans[0] && countRef.current[1] === trans[1]) {
                return;
            }
            countRef.current = trans;

            // eslint-disable-next-line no-nested-ternary
            trans = direction === 'row' ? [trans[0], 0]
                : direction === 'column' ? [0, trans[1]]
                    : trans;
            if (child) {
                const root = rootRef?.current?.getBoundingClientRect();
                if (root) {
                    if (direction !== 'column') {
                        if (child.left + trans[0] < root.left) {
                            trans = [root.left - child.left, trans[1]];
                        } else if (child.right + trans[0] > root.right) {
                            trans = [root.right - child.right, trans[1]];
                        }
                    }
                    if (direction !== 'row') {
                        if (child.top + trans[1] < root.top) {
                            trans = [trans[0], root.top - child.top];
                        } else if (child.bottom + trans[1] > root.bottom) {
                            trans = [trans[0], root.bottom - child.bottom];
                        }
                    }
                }
                // @ts-ignore
                const t = onCheck?.(child, trans, root);
                if (t) {
                    trans = t;
                }
            }
            setPostTranslate(trans);
            onTranslate?.(trans);
        }, [child, direction, onCheck, onTranslate, rootRef, step]),
        onEnd: useCallback(() => {
            if (isReset) {
                setPostTranslate([0, 0]);
            }
            onEnd?.();
        }, [isReset, onEnd]),
    });
};
