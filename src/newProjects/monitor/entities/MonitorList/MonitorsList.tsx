import { memo } from 'react';
import { MonitorItem, MonitorItemProps } from 'M/entities/Monitor/MonitorItem';
import { Monitor } from 'M/entities/Monitor/types/monitor';
import cls from './MonitorsList.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface MonitorsListProps extends MonitorItemProps {
    className?: string;
    list: Monitor[];
}

export const MonitorsList = memo((props: MonitorsListProps) => {
    const {
        className,
        list,
        ...otherProps
    } = props;

    return (
        <VStack gap="16" className={classNames(cls.MonitorsList, {}, [className])}>
            {list.map((monitor) => (
                <MonitorItem key={monitor.name} {...otherProps} />
            ))}
        </VStack>
    );
});
