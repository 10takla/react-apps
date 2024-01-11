import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    ReactElement,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import cls from './DraggableSwapList.module.scss';
import { VStack } from '@/shared/ui/Stack';
import Flex from '@/shared/ui/Stack/Flex/Flex';
import Draggable, { DraggableProps } from '../Draggable/Draggable';

export interface DraggableSwapListProps<T> extends
    Pick<DraggableProps, 'rootRef'>,
    ComponentProps<typeof Flex> {
    list: T[]
    children: (T: any, index: number) => ReactElement
    onChange: (list: T[]) => void
    typeSwap?: 'swap' | 'shift'
}

const DraggableSwapList = <T extends any>(
    props: DraggableSwapListProps<T>,
    ref: ForwardedRef<ElementRef<typeof VStack>>,
) => {
    const {
        list,
        children,
        onChange,
        typeSwap = 'shift',
        rootRef,
        ...otherProps
    } = props;
    const dir = (otherProps.direction === 'column' ? {
        top: 'top',
        bottom: 'bottom',
        height: 'height',
    } : {
        top: 'left',
        bottom: 'right',
        height: 'width',
    }) as Required<Record<keyof DOMRect, keyof DOMRect>>;
    const childrenRef = useRef<DOMRect[]>([]);
    const initialRef = useRef<DOMRect[]>([]);
    const [fromI, setFromI] = useState<number>();
    const [toI, setToI] = useState<number>();
    const fromIRef = useRef<number>();
    const toIRef = useRef<number>();
    const onSelect = useCallback(() => {
        const fromI = fromIRef.current;
        const toI = toIRef.current;
        if (fromI !== undefined && toI !== undefined) {
            const tmp = [...list];
            if (typeSwap === 'shift') {
                const l = tmp.splice(fromI, 1);
                tmp.splice(toI, 0, l[0]);
            }
            if (typeSwap === 'swap') {
                [tmp[toI], tmp[fromI]] = [tmp[fromI], tmp[toI]];
            }
            onChange(tmp);
        }
        setFromI(undefined);
        setToI(undefined);
    }, [list, onChange, typeSwap]);

    const vstackRef = useRef<ElementRef<typeof Flex>>();
    useImperativeHandle<ElementRef<typeof Flex>,
        ElementRef<typeof Flex>>(ref, () => vstackRef.current);

    useEffect(() => {
        fromIRef.current = fromI;
        toIRef.current = toI;
    }, [fromI, toI]);

    return (
        <Flex
            className={cls.DraggableSwapList}
            gap={8}
            {...otherProps}
            ref={vstackRef}
        >
            {list.map((item, i) => (
                <Draggable
                    key={i}
                    onEnd={onSelect}
                    dragProps={{
                        rootRef: rootRef ?? vstackRef,
                        direction: otherProps.direction,
                        isReset: true,
                        onInitialization: (target: DOMRect) => {
                            initialRef.current.push(target);
                        },
                        translate: (() => {
                            if (childrenRef.current
                                && fromI !== undefined && toI !== undefined) {
                                if (typeSwap === 'shift') {
                                    const sign = Math.sign(fromI - toI);
                                    const [sT, sF] = [toI, fromI - sign].sort();
                                    if (sT <= i && i <= sF) {
                                        return [
                                            0,
                                            initialRef.current[sT + sign][dir.top]
                                            - initialRef.current[sT][dir.top],
                                        ];
                                    }
                                } else if (typeSwap === 'swap') {
                                    if (i === toI) {
                                        return [0, initialRef.current[fromI][dir.top] - initialRef.current[toI][dir.top]];
                                    }
                                }
                            }
                            return [0, 0];
                        })(),
                        onCheck: (target, trans, root) => {
                            const result = initialRef.current?.reduce((res, near, j) => {
                                if (i === j || res) return res;
                                const preNear = childrenRef.current[j - 1];
                                const offsetTop = target[dir.top] + trans[1];
                                const offsetBottom = target[dir.bottom] + trans[1];
                                const topBound = preNear
                                    ? preNear[dir.top] + preNear[dir.height] / 2
                                    : root[dir.top];

                                const bottomBound = near[dir.top] + near[dir.height] / 2;

                                if (
                                    (topBound <= offsetTop && offsetTop <= bottomBound)
                                    || (near[dir.top] + near[dir.height] / 2 <= offsetBottom
                                        && offsetBottom <= near[dir.bottom])
                                ) {
                                    res = [i, j];
                                }
                                return res;
                            }, undefined as [number, number] | undefined);

                            if (result) {
                                setFromI(result[0]);
                                setToI(result[1]);
                            } else {
                                setFromI(undefined);
                                setToI(undefined);
                            }
                        },
                    }}
                    ref={(el) => {
                        if (el && childrenRef.current) {
                            childrenRef.current[i] = el.getBoundingClientRect();
                        }
                    }}
                >
                    {children(item, i)}
                </Draggable>
            ))}
        </Flex>
    );
};

export default memo(forwardRef(DraggableSwapList));
