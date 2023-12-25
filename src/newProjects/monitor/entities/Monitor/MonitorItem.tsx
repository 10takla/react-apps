import {
    ComponentProps,
    ForwardedRef,
    forwardRef,
    memo, useContext, useEffect, useMemo, useState,
} from 'react';
import { ControlEls, ControlPanel } from 'M/widgets/SiteList/ui/ControlPanel/ControlPanel';
import { Monitor } from 'M/entities/Monitor/types/monitor';
import { RelationContext } from 'M/entities/Relation/ui/DrawRelations/DrawRelations';
import cls from './MonitorItem.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Relation } from '../Relation/types/Relation';
import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';
import Currency from '@/shared/ui/BusinessLogic/Currency/Currency';

export interface MonitorItemProps extends ComponentProps<typeof VStack> {
    className?: string;
    currency: ControlEls['currency'];
    isHide: ControlEls['isHide'];
    monitor: Monitor;
    relation?: Relation
}

const MonitorItem = (props: MonitorItemProps, ref: ForwardedRef<typeof VStack>) => {
    const {
        monitor: {
            name,
            link,
            image,
            price,
            rating,
            ...otherMonitorParams
        },
        isHide,
        currency,
        relation,
        className,
        ...otherProps
    } = props;
    const [postIsHide, setPostIsHide] = useState(isHide);
    useEffect(() => {
        setPostIsHide(isHide);
    }, [isHide]);
    const { setCounter } = useContext(RelationContext);
    useEffect(() => {
        if (setCounter && postIsHide) {
            setCounter(true);
        }
    }, [postIsHide, setCounter]);

    const joins = useMemo<Partial<Record<keyof Monitor, string>>>(() => (
        [
            [':', ['aspectRatio', 'contrast']],
            ['x', ['resolution']],
        ]
            .reduce((all, [value, keys]) => (
                {
                    ...all,
                    ...keys.reduce((all, key) => (
                        { ...all, [key]: value }
                    ), {}),
                }
            ), {})
    ), []);

    const info = useMemo(() => {
        return Object.entries(otherMonitorParams)
            .map(([key, value]: [keyof Monitor, any]) => {
                let v = value;
                if (Array.isArray(value) && joins[key]) {
                    v = value.join(joins[key]);
                }
                if (typeof value === 'object') {

                }
                return [key, v];
            });
    }, [otherMonitorParams, joins]);

    return (
        <VStack
            className={classNames(cls.MonitorItem, {}, [className])}
            ref={ref}

            // eslint-disable-next-line react/jsx-props-no-multi-spaces
            style={{
                outlineColor: relation ? getRgbGradient(relation, {}) : 'transparent',
            }}
            gap={16}
            {...otherProps}
        >
            <HStack
                align="center"
            >
                <ControlPanel
                    className={cls.hideSvg}
                    isHide={[postIsHide, setPostIsHide]}
                />
                <HStack
                    className={cls.title}
                    gap={8}
                    align="center"
                    justify="between"
                >
                    <HStack
                        tag="a"
                        target="_blank"
                        href={link}
                        direction="row"
                        gap={4}
                        align="center"
                    >
                        <img src={image} />
                        {name}
                    </HStack>
                    {price && (
                        <Currency
                            value={price}
                            currency={currency}
                            startCurrency="EUR"
                        />
                    )}
                </HStack>
            </HStack>
            {!postIsHide && (
                <span className={cls.info}>
                    {info
                        .map((t) => t.join(': '))
                        .join('; ')}
                </span>
            )}
        </VStack>
    );
};

export default memo(forwardRef(MonitorItem));
