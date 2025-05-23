import {
    ComponentProps,
    ElementRef,
    memo, useMemo, useRef, useState,
} from 'react';
import SiteList from 'M/widgets/SiteList/SiteList';
import { ControlPanel } from 'M/widgets/SiteList/ui/ControlPanel/ControlPanel';
import { MonitorsListProps } from 'M/entities/MonitorList/MonitorsList';
import monitors from 'M/shared/const/monitors.json';
import { classNames } from "S/lib/classNames/classNames";
import { VStack } from "S/ui/Stack";
import cls from './App.module.scss';

interface AppProps {
    className?: string;
}

const App = memo((props: AppProps) => {
    const {
        className,
    } = props;
    const [isHide, setIsHide] = useState(true);
    const [currency, setCurrency] = useState<MonitorsListProps['currency']>('RUB');
    const relations: Array<number | undefined>[] = useMemo(() => {
        const lists = Object.values(monitors);
        const relss = [];
        lists.slice(0, lists.length - 1).forEach((list, listI) => {
            list.forEach((item, itemI) => {
                const rels = [];
                lists.slice(listI + 1).forEach((list2, list2I) => {
                    const t = list2.findIndex((item2, item2I) => {
                        return item.name === item2.name;
                    });
                    rels.push(t !== -1 ? t : undefined);
                });
                if (rels.some((e) => e !== undefined)) {
                    relss.push([...Array(listI).fill(undefined), itemI, ...rels]);
                }
            });
        });

        return relss;
    }, []);

    const sitesMonitorsRefs = useRef<ElementRef<typeof SiteList>[]>([]);
    // const [elements, setElements] = useState<DrawRelationsProps['elements']>([]);

    // useEffect(() => {
    //     setElements(sitesMonitorsRefs.current as any);
    // }, []);
    const [counter, setCounter] = useState(false);
    // eslint-disable-next-line max-len
    const [sort, setSort] = useState<Required<ComponentProps<typeof ControlPanel>>['sort'][0]>([['name', 'rating', 'resolution'], false]);

    const tmp = Object.entries(
        Object.values(monitors).reduce((all, site) => {
            site.forEach((monitor) => {
                Object.entries(monitor).forEach(([key, value]) => {
                    if (typeof value === 'number') {
                        all = { ...all, [key]: all[key] ? [...all[key], value] : [value] };
                    }
                });
            });
            return all;
        }, {}),
    ).reduce((all, [key, values]) => {
        const [min, max] = [Math.min(...values), Math.max(...values)];
        if (max - min) {
            return [...all, [key, [min, max]]];
        }
        return all;
    }, []);

    const [ranges, setRanges] = useState<Required<ComponentProps<typeof ControlPanel>>['ranges'][0]>(tmp);

    return (
        <VStack
            className={classNames(cls.App, {}, [className])}
        >
            <ControlPanel
                isHide={[isHide, setIsHide]}
                currency={[currency, setCurrency]}
                sort={[sort, setSort]}
                ranges={[ranges, setRanges]}
            />
            {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
            {/* <RelationContext.Provider value={{ counter, setCounter }}> */}
            {/* {!!elements.length && (
                    <DrawRelations
                        elements={elements}
                        relations={relations}
                    />
                )} */}
            {/* <HStack className={cls.sites} justify="between">
                {Object.entries(monitors)
                    .map(([siteName, list], i) => (
                        <SiteList
                            siteName={siteName}
                            key={`${i}`}
                            relations={relations.map((x) => x[i])}
                            isHide={isHide}
                            currency={currency}
                            sort={sort}
                            list={list}
                            ref={(els) => {
                                if (els) {
                                    sitesMonitorsRefs.current.push(els);
                                }
                            }}
                        />
                    ))}
            </HStack> */}
            {/* </RelationContext.Provider> */}
        </VStack>
    );
});
export default App;
