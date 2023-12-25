import {
    ComponentProps,
    ForwardedRef, forwardRef, memo, useMemo, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MultiSelect.module.scss';
import { Select, SelectProps } from '../Select/Select';
import DraggableSwapList, { DraggableSwapListProps } from '../../Draggable/DraggableSwapList/DraggableSwapList';
import Flex from '@/shared/ui/Stack/Flex/Flex';
import { VStack } from '@/shared/ui/Stack';

export interface MultiSelectProps<T extends string>
    extends ComponentProps<typeof Flex> {
    className?: string;
    options: Required<SelectProps<T>>['options'];
    onChange: (newArr: T[]) => void;
    values: Array<SelectProps<T>['defaultValue']>;
}

const MultiSelect = <T extends string>(props: MultiSelectProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        className,
        options,
        values,
        onChange,
        ...otherProps
    } = props;
    const [typeSwap, setTypeSwap] = useState<Required<DraggableSwapListProps>['typeSwap']>('shift');

    return (
        <Flex
            {...otherProps}
            className={classNames(cls.MultiSelect, {}, [className])}
            gap={8}
        >
            <VStack className={cls.body} gap={8} align="end">
                <Select
                    className={cls.typeSwap}
                    onChange={(value) => setTypeSwap(value)}
                    defaultValue={useMemo(() => typeSwap, [])}
                    options={['swap', 'shift']}
                />
                <DraggableSwapList
                    {...otherProps}
                    onChange={onChange}
                    list={values}
                    typeSwap={typeSwap}
                >
                    {(value, i) => (
                        <Select
                            value={value}
                            first={' '}
                            options={options.filter((x) => {
                                if (Array.isArray(x)) {
                                    return x[0] === value || !values.includes(x[0]);
                                }
                                return x === value || !values.includes(x);
                            })}
                            onChange={(value) => {
                                const newArr = values.map((v1, j) => {
                                    return i === j ? value : v1;
                                }).filter((x) => x);
                                onChange(newArr as T[]);
                            }}
                        />
                    )}
                </DraggableSwapList>
            </VStack>
            {
                options.length !== values.length && (
                    <Select
                        first=" "
                        options={options.filter((x) => {
                            if (Array.isArray(x)) {
                                return !values.includes(x[0]);
                            }
                            return !values.includes(x);
                        })}
                        onChange={(value) => {
                            onChange([...values, value]);
                        }}
                    />
                )
            }
        </Flex>
    );
};
export default memo(forwardRef(MultiSelect));
