import {
    ElementRef, ForwardedRef, forwardRef, memo, useEffect, useMemo, useState,
} from 'react';
import { HStack } from '../../Stack';

import cls from './Currency.module.scss';

interface CurrencyProps {
    value: number
    currency: 'USD' | 'EUR' | 'RUB'
    startCurrency: CurrencyProps['currency']
}

// const sites = useMemo<Partial<Record<Site, { currency: Currency }>>>(() => ({
//     geizhals: {
//         currency: 'EUR',
//     },
//     rtings: {
//         currency: 'USD',
//     },
//     displays: {
//         currency: 'USD',
//     },
// }), []);

const Currency = (props: CurrencyProps, ref: ForwardedRef<ElementRef<typeof HStack>>) => {
    const {
        value,
        currency,
        startCurrency,
    } = props;

    const signs: Record<CurrencyProps['currency'], string> = {
        USD: '$',
        RUB: '₽',
        EUR: '€',
    };

    const [postValue, setPostValue] = useState(value);
    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((resp) => resp.json())
            .then((d) => {
                if (startCurrency !== 'RUB') {
                    if (currency !== 'RUB') {
                        setPostValue(value * d.Valute[startCurrency].Value / d.Valute[currency].Value);
                    } else {
                        setPostValue(value * d.Valute[startCurrency].Value);
                    }
                } else if (currency !== 'RUB') {
                    setPostValue(value / d.Valute[currency].Value);
                }
            });
    }, [currency, startCurrency, value]);

    const postPostValue = useMemo(() => (
        [
            [
                String(postValue.toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
                String(postValue.toFixed(2)).split('.')[1],
            ].join('.'),
            signs[currency],
        ].join(' ')
    ), [currency, postValue, signs]);

    return (
        <span className={cls.Currency}>
            {postPostValue}
        </span>
    );
};

export default memo(forwardRef(Currency));
