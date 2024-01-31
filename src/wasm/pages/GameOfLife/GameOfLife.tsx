import { memo, useState } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Scene } from 'src/wasm/app/ui/Scene/Scene';
import PlaySvg from 'src/shared/assets/icons/reproduction/play.svg';
import PauseSvg from 'src/shared/assets/icons/reproduction/pause.svg';
import cls from './GameOfLife.module.scss';

const Range = ({
    setState, min, max, value,
}) => {
    return (
        <div className={cls.range}>
            {value}
            <input
                value={value}
                type="range"
                {...{ min, max }}
                step={(max - min) / 100}
                onChange={(e) => setState(Number(e.target.value))}
            />
        </div>
    );
};

interface GameOfLifeProps{

}

const GameOfLife = (props: GameOfLifeProps) => {
    const {

    } = props;

    const [trigger, setTrigger] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [speed, setSpeed] = useState(400);
    const [size, setSize] = useState(0.4);
    const [resol, setResol] = useState<[number, number, number]>([12, 12, 12]);

    return (
        <HStack className={classNames(cls.GameOfLife)}>
            <Scene
                speed={speed}
                trigger={trigger}
                isStart={isStart}
                resolution={resol}
                size={size}
            />
            <div className={cls.sidebar}>
                <div className={cls.playRange}>
                    <div className={cls.resol}>
                        <input
                            type="number"
                            value={resol[0]}
                            onChange={(e) => { setResol((prev) => [Number(e.target.value), prev[1], prev[2]]); }}
                        />
                        <input
                            type="number"
                            value={resol[1]}
                            onChange={(e) => { setResol((prev) => [prev[0], Number(e.target.value), prev[2]]); }}
                        />
                        <input
                            type="number"
                            value={resol[2]}
                            onChange={(e) => { setResol((prev) => [prev[0], prev[1], Number(e.target.value)]); }}
                        />
                    </div>
                    <Range setState={setSize} min={0.1} max={2} value={size} />
                    <Range setState={setSpeed} min={200} max={2000} value={speed} />
                    <button
                        className={`${cls.play} ${isStart ? cls.is_play : ''}`}
                        onClick={() => {
                            setIsStart(!isStart);
                        }}
                    >
                        {isStart ? <PlaySvg /> : <PauseSvg />}
                    </button>
                </div>
                <button
                    className={cls.tick}
                    onClick={() => {
                        setTrigger((prev) => prev + 1);
                    }}
                >
                    tick
                </button>
            </div>
        </HStack>
    );
};

export default memo(GameOfLife);
