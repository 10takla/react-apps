import { memo } from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './GameOfLife.module.scss';

interface GameOfLifeProps {

}

const GameOfLife = (props: GameOfLifeProps) => {
    const {

    } = props;

    return (
        <HStack className={classNames(cls.GameOfLife)}>
        </HStack>
    );
};

export default memo(GameOfLife);
