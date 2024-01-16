import {
    ComponentProps, memo, useMemo,
} from 'react';
import { Monitor } from 'M/entities/Monitor/types/monitor';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Hide } from 'src/shared/ui/Kit/Hide/Hide';
import { } from 'src/shared/ui/Kit/Button/Button';
import { Select } from 'src/shared/ui/Kit/Select';
import InputRange from 'src/shared/ui/Kit/Input/ui/KeepFocus/InputRange/InputRange';
import MultiSelect from 'src/shared/ui/Kit/Select/MultiSelect/MultiSelect';
import { Flex, HStack, VStack } from 'src/shared/ui/Stack';
import Currency from 'src/shared/ui/BusinessLogic/Currency/Currency';
import cls from './ControlPanel.module.scss';

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
    const options = {
        name: 'имя',
        rating: 'рейтинг',
        price: 'цена',
        resolution: 'разрешение экрана',
        response_timme: 'время отклика',
        pixel_type: 'тип матрицы',
        aspect_ratio: 'соотношение сторон эркана',
        ppi: 'плотность пикселя',
        diagonal: 'размер экрана',
        contrast: 'контраст',
    };

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
            <HStack gap={16}>
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
                                options={Object.entries(options)}
                                values={sort[0][0]}
                                onChange={(newArr) => {
                                    sort[1]((prev) => [newArr, prev[1]]);
                                }}
                                direction="column"
                            />
                        </VStack>
                    )}
                </VStack>
                {
                    ranges && (
                        <Flex className={cls.ranges} direction="column" gap={8}>
                            {ranges[0].map(([key, values], i) => (
                                <HStack key={i} align="center" gap={8} justify="between">
                                    <span>
                                        {(() => {
                                            console.log(key, options[key]);

                                            return options[key];
                                        })()}

                                    </span>
                                    <InputRange
                                        className={cls.inputRange}
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
                    )
                }
            </HStack>
        </HStack>
    );
});
