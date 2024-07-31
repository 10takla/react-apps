import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls, Stats } from '@react-three/drei';
import {
    memo,
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { Pos, Cell, Universe } from 'rust_wasm';
import { memory } from 'rust_wasm/rust_wasm_bg.wasm';
import { useSelector } from 'react-redux';
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import cls from './GameOfLifeScene.module.scss';

interface GameOfLifeSceneProps {
}

const GameOfLifeScene = (props: GameOfLifeSceneProps) => {
    const {

    } = props;

    const {
        trigger,
        isStart,
        speed,
        resolution,
        size,
    } = useSelector((state: SceneScheme) => state.gameOfLife);

    const S = size + 0.05;
    const [universe, width, height, depth] = useMemo(() => {
        const universe = Universe.new(Pos.new(...resolution));
        universe.set_cell(Pos.new(1, 2, 2));
        universe.set_cell(Pos.new(2, 2, 2));
        universe.set_cell(Pos.new(3, 2, 2));
        return [
            universe,
            universe.width(),
            universe.height(),
            universe.depth(),
        ];
    }, [resolution]);
    const f = useCallback(() => (
        new Uint8Array(memory.buffer, universe.cells(), width * height * depth)
    ), [depth, height, universe, width]);
    const [cells, setCells] = useState<Uint8Array>(f());
    const [inter, setInter] = useState<NodeJS.Timeout>();
    const setInterFunc = useCallback(() => {
        setInter(
            setInterval(() => {
                universe.tick();
                setCells(f());
            }, speed),
        );
    }, [speed, universe, f]);
    useEffect(() => {
        if (inter) {
            clearInterval(inter);
            setInterFunc();
        }
    }, [inter, setInterFunc, speed]);
    useEffect(() => {
        clearInterval(inter);
        if (isStart) {
            setInterFunc();
        }
        return () => clearInterval(inter);
    }, [inter, isStart, setInterFunc]);

    useEffect(() => {
        if (trigger) {
            universe.tick();
            setCells(f());
        }
    }, [f, trigger, universe]);

    const getIndex = (x: number, y: number, z: number) => {
        return (x * width + y) * height + z;
    };

    return (
        <Canvas
            className={cls.GameOfLifeScene}
        >
            <Stats />
            <ambientLight intensity={1} />
            <pointLight position={[width * S + 0.5, height * S + 0.5, depth * S + 0.5]} intensity={100} />
            <OrbitControls enablePan={false} />
            {Array(width).fill(null).map((_, x) => (
                Array(height).fill(null).map((__, y) => (
                    Array(depth).fill(null).map((___, z) => (
                        cells[getIndex(x, y, z)] === Cell.Alive
                        && (
                            <Box
                                key={`${x} ${y} ${z}`}
                                args={[size, size, size]}
                                position={[(z - depth / 2) * S, (x - width / 2) * S, (y - height / 2) * S]}
                            >
                                <meshStandardMaterial color="white" wireframe={false} />
                            </Box>
                        )
                    ))))))}
        </Canvas>
    );
};

export default memo(GameOfLifeScene);
