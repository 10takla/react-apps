import {
    ChangeEvent, SelectHTMLAttributes, useCallback, useMemo,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectProps<
    T extends string
>
    extends Omit<SelectHTMLAttributes<HTMLElement>, 'onChange'> {
    className?: string;
    label?: string;
    options?: Array<[T, string] | string>;
    onChange?: (value: string | undefined) => void;
    readonly?: boolean;
    first?: string;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        onChange,
        readonly,
        first,
        ...otherProps
    } = props;
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            if (first) {
                if (!e.target.value.length) {
                    onChange(undefined);
                } else {
                    onChange(e.target.value as T);
                }
            } else {
                onChange(e.target.value as T);
            }
        }
    }, [first, onChange]);

    const optionsList = useMemo(() => options?.map((opt) => {
        const value = typeof opt === 'string' ? opt : opt[0];
        const content = typeof opt === 'string' ? opt : opt[1];
        return (
            <option
                className={cls.option}
                value={value}
                key={value}
            >
                {content}
            </option>
        );
    }), [options]);

    const mods: Mods = {};
    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                {...otherProps}
                disabled={readonly}
                className={cls.select}
                onChange={onChangeHandler}
            >
                {first
                    && <option value={undefined}>{first}</option>}
                {optionsList}
            </select>
        </div>
    );
};
