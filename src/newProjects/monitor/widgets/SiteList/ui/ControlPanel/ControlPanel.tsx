import {
    ComponentProps, memo, useMemo,
} from 'react';
import { Monitor } from '@/newProjects/monitor/entities/Monitor/types/monitor';
import { classNames } from '@/shared/lib/classNames/classNames';
import Currency from '@/shared/ui/BusinessLogic/Currency/Currency';
import { Hide } from '@/shared/ui/Kit/Hide/Hide';
import { Select } from '@/shared/ui/Kit/Select';
import MultiSelect from '@/shared/ui/Kit/Select/MultiSelect/MultiSelect';
import { Flex, HStack, VStack } from '@/shared/ui/Stack';
import cls from './ControlPanel.module.scss';
import InputRange from '@/shared/ui/Kit/Input/ui/KeepFocus/InputRange/InputRange';

export type ControlEls = {
    currency: ComponentProps<typeof Currency>['currency']
    isHide: boolean
    sort: [keyof Monitor[], boolean]
    ranges: Array<[keyof Monitor, [number, number]]>
}
type ControlPanelProps = {
    className?: string
} & { [K in keyof ControlEls]?: [ControlEls[K], (value: ControlEls[K]) => void] }

export const ControlPanel = memo((props: ControlPanelProps) => {
    const {
        className,
        isHide,
        currency,
        sort,
        ranges,
    } = props;

    const options = [['name', 'имя'], ['rating', 'рейтинг'], ['price', 'цена'], ['screenSize', 'размер экрана'],
        ['resolution', 'разрешение экрана'], ['refreshRate', 'частота обновления'],
        ['responseTimme', 'время отклика'], ['pixelType', 'тип матрицы'],
        ['aspectRatio', 'соотношение сторон эркана'], ['ppi', 'плотность пикселя'],
        ['releaseYear', 'дата выхода'], ['contrast', 'контраст']];

    return (
        <HStack className={classNames(cls.ControlPanel, {}, [className])}>
            {isHide && <Hide isHide={isHide[0]} onClick={() => isHide[1](!isHide[0])} />}
            {currency && (
                <Select
                    defaultValue={useMemo(() => currency[0], [])}
                    onChange={(v) => currency[1](v as ControlEls['currency'])}
                    options={useMemo(() => [['RUB', 'рубли'], ['USD', 'доллары'], ['EUR', 'евро']], [])}
                />
            )}
            <VStack>
                {sort && (
                    <VStack className={cls.sortOrder}>
                        <input
                            checked={sort[0][1]}
                            className={cls.order}
                            type="checkbox"
                            onChange={() => {
                                sort[1]((prev) => [prev[0], !prev[1]]);
                            }}
                        />
                        <MultiSelect
                            className={cls.sort}
                            options={options}
                            values={sort[0][0]}
                            onChange={(newArr) => {
                                sort[1]((prev) => [newArr, prev[1]]);
                            }}
                            direction="column"
                        />
                    </VStack>
                )}
                <Flex className={cls.ranges} direction="column" gap={8}>
                    {ranges && ranges[0].map(([key, values], i) => (
                        <HStack align="center" gap={8}>
                            {key}
                            <InputRange
                                direction="row"
                                inputDirection="right"
                                values={values}
                                min={values[0]}
                                max={values[1]}
                                onChange={(values: any) => {
                                    ranges[1](ranges[0].toSpliced(i, 1, [key, values]));
                                }}
                            />
                        </HStack>
                    ))}

                </Flex>
            </VStack>
        </HStack>
    );
});
