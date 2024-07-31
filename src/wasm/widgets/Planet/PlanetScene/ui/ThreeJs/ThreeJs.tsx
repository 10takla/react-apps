import { Canvas } from '@react-three/fiber';
import {
    memo,
    useRef,
    ElementRef,
    useState,
    ForwardedRef,
    forwardRef,
    useLayoutEffect,
    useMemo,
    CSSProperties,
} from 'react';
import { Line, Plane } from '@react-three/drei';
import cls from './ThreeJs.module.scss';

export type Point = [number, number]

export interface ThreeJsProps {
    sizes: Point
    points: Array<Point>
    pointsC: Array<Point>
    edges: number[]
    lines: Array<Point>
    bounds: Array<Point>
    colors: Record<'points' | 'hullPoints' | 'hullPath' | 'findedPoint', CSSProperties['color']>
}

const ThreeJs = (props: ThreeJsProps, ref: ForwardedRef<HTMLCanvasElement>) => {
    const {
        points,
        sizes: preSizes,
        edges,
        lines,
        colors,
        pointsC,
    } = props;

    const canvasRef = useRef<ElementRef<typeof Canvas>>(null);

    const [sizes, setSizes] = useState<[...Point, number]>([0, 0, 0]);
    useLayoutEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const canvasRect = canvas.getBoundingClientRect();
                setSizes([
                    canvasRect.width * preSizes[0] / 100,
                    canvasRect.height * preSizes[1] / 100,
                    0,
                ]);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [preSizes]);

    const bounds = useMemo(() => {
        const [x, y] = sizes.map((x) => x / 2)
            .map((x, i) => [x, x - sizes[i]]);
        return x.map((x) => (
            y.reverse()
                .map((y) => (
                    [x, y, 0].map((x) => x * 1.05)
                )).flat()
        ));
    }, [sizes]);

    // const points = prePoints.map((point) => point.map((x, i) => x * sizes[i]));

    // const lines = useMemo(() => {
    //     return edges.map((i) => points[i]);
    // }, [edges, points]);

    return (
        <Canvas
            className={cls.ThreeJs}
            ref={canvasRef}
        >
            {points.map((point, i) => (
                <Plane
                    scale={0.08}
                    position={[...point, 0]}
                    key={i}
                >
                    <meshBasicMaterial
                        color={
                            edges[edges.length - 1] === i ? 'blue'
                                : edges.includes(i) ? 'yellow'
                                    : 'white'
                        }
                    />
                </Plane>
            ))}
            {lines.length && (
                <Line
                    points={lines}
                    color="red"
                    lineWidth={5}
                />
            )}
            <Line
                points={[...bounds, bounds[0]]}
                color="red"
                lineWidth={4}
            />
        </Canvas>
    );
};

export default memo(forwardRef(ThreeJs));
