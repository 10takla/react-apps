import {
    ComponentProps,
    ElementRef, ForwardedRef, forwardRef,
    memo, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { ControlPanel } from 'M/widgets/SiteList/ui/ControlPanel/ControlPanel';
import MonitorItem, { MonitorItemProps } from 'M/entities/Monitor/MonitorItem';
import { Monitor } from 'M/entities/Monitor/types/monitor';
import { Relation } from 'M/entities/Relation/types/Relation';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SiteList.module.scss';
import { VStack } from '@/shared/ui/Stack';

export interface SiteListProps extends Omit<MonitorItemProps, 'monitor'> {
    className?: string,
    relations: Array<Relation>,
    list: Monitor[],
    monitorItemsRef?: ForwardedRef<ElementRef<typeof MonitorItem>[]>
    sort: Required<ComponentProps<typeof ControlPanel>>['sort'][0]
    siteName: string
}

const SiteList = (props: SiteListProps, ref: ForwardedRef<ElementRef<typeof MonitorItem>[]>) => {
    const {
        className,
        list,
        isHide,
        siteName,
        sort,
        currency,
        relations,
        ...otherProps
    } = props;
    const [postIsHide, setPostIsHide] = useState(isHide);
    useEffect(() => {
        setPostIsHide(isHide);
    }, [isHide]);

    const monitorItemsRef = useRef<ElementRef<typeof MonitorItem>[]>([]);
    useImperativeHandle(ref, () => monitorItemsRef.current);

    const [postSort, setPostSort] = useState<[keyof Monitor[], boolean]>(sort);
    useEffect(() => {
        setPostSort(sort);
    }, [sort]);

    useMemo(() => (
        postSort[0].forEach((key) => (
            list.sort((a, b) => {
                [a, b] = [a[key], b[key]];
                if (Array.isArray(a)) {
                    if (a.every((x, i) => b[i] === x)) {
                        return 0;
                    }
                }
                if (a === b) {
                    return 0;
                }
                const t = typeof a === 'string' ? !postSort[1] : postSort[1];
                let compr = a > b;
                if (Array.isArray(a)) {
                    compr = false;
                    let res = false;
                    for (const i in a) {
                        const [a1, b1] = [a[a.length - i - 1], b[a.length - i - 1]];
                        if (a1 > b1) {
                            res = true;
                            break;
                        } else if (a1 < b1) {
                            res = false;
                            break;
                        }
                    }
                    compr = res;
                }

                if (compr) {
                    return t ? 1 : -1;
                }
                return t ? -1 : 1;
            })
        ), [] as any[])
    ), [list, postSort]);

    return (
        <VStack
            className={classNames(cls.SiteList, {}, [className])}
            gap={8}
        >
            <h2 className={cls.siteName}>{siteName}</h2>
            <ControlPanel
                isHide={[postIsHide, setPostIsHide]}
                sort={[postSort, setPostSort]}
            />
            <VStack gap="16" className={classNames(cls.list, {}, [className])}>
                {list.map((monitor, index) => (
                    <MonitorItem
                        key={`${index} ${monitor.name}`}
                        {...{
                            ...otherProps,
                            monitor,
                        }}
                        relation={relations[index]}
                        ref={(el) => {
                            if (el) {
                                monitorItemsRef.current.push(el);
                            }
                        }}
                        isHide={postIsHide}
                        currency={currency}
                    />
                ))}
            </VStack>
        </VStack>
    );
};
export default memo(forwardRef(SiteList));
