import { Canvas } from '@react-three/fiber';
import {
    memo,
    useState,
    useEffect,
    useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { SceneScheme } from 'src/wasm/pages/ScenePage/SceneProvider/SceneProvider';
import { ConvexHull } from 'rust_wasm/rust_wasm';
import {
    Box, Line, OrthographicCamera,
} from '@react-three/drei';
import cls from './PlanetScene.module.scss';

export type Point = [number, number, number]

interface PlanetSceneProps {
    sizes: Point
}

const PlanetScene = (props: PlanetSceneProps) => {
    const {
    } = props;
    const { trigger, sizes, pointCount } = useSelector((state: SceneScheme) => state.planet);
    const [edges, setEdges] = useState<number[]>([]);

    const hull = useMemo(() => {
        setEdges([]);
        return ConvexHull.set_random_ponts(pointCount, [1, 1, 0]);
        // return ConvexHull.set_points([
        //     [0, 0, 0], [1, -0.2, 0], [2, 1, 0],
        //     [1.8, 2, 0], [0.7, 2.1, 0], [0.2, 1.6, 0],
        // ]);
    }, [pointCount]);
    const points = hull.get_points()
        .map((p) => p.map((m, j) => m * sizes[j] - sizes[j] / 2)) as Array<Point>;

    useEffect(() => {
        if (trigger) {
            const edge = hull.get_tick();
            if (edge) {
                setEdges((edges) => [...edges, edge]);
            }
        }
    }, [trigger, hull]);

    const lines = useMemo(() => {
        return edges.map((i) => points[i]);
    }, [edges, points]);

    const max = useMemo(() => {
        const [x, y] = sizes.slice(0, 2).map((x) => x / 2)
            .map((x, i) => [x, x - sizes[i]])
            .map(([x, y]) => [x, y]);
        return x.map((x) => y.reverse()
            .map((y) => [x, y, 0].map((x) => x * 1.2)).flat());
    }, [sizes]);

    return (
        <Canvas
            className={cls.PlanetScene}
        >
            <OrthographicCamera />
            {/* <OrbitControls /> */}
            {points.map((point, i) => (
                <Box
                    scale={0.08}
                    position={point}
                    key={i}
                >
                    <meshBasicMaterial
                        color={
                            edges[edges.length - 1] === i ? 'blue'
                                : edges.includes(i) ? 'yellow'
                                    : 'white'
                        }
                    />
                    {/* <Html center>
                        <HStack className={cls.coordinate} gap={8}>
                            {point.map((p, i) => (
                                <span key={i}>{p}</span>
                            ))}
                        </HStack>
                    </Html> */}
                </Box>
            ))}
            {lines.length && (
                <Line
                    points={lines}
                    color="red"
                    lineWidth={5}
                />
            )}
            <Line
                points={[...max, max[0]]}
                color="red"
                lineWidth={4}
            />
        </Canvas>
    );
};

export default memo(PlanetScene);
