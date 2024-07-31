import {
    memo,
    useRef,
    useState,
    useMemo,
    useEffect,
    useContext,
    Fragment,
} from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import { themeContext } from "S/providers/theme/themeContext";
import { classNames } from "S/lib/classNames/classNames";
import { Point } from './ui/ThreeJs/ThreeJs';
import cls from './PlanetScene.module.scss';

interface PlanetSceneProps {
    points: Array<Point>
    edges: Array<number>[]
}

const PlanetScene = (props: PlanetSceneProps) => {
    const { points: prePoints, edges } = props;

    const {
        trigger, trigger2, scales: { pointsField: scale }, sizes: preSizes, pointCount,
    } = useSelector((state: SceneScheme) => state.planet);

    const [maxSizes, setMaxSizes] = useState<Point>([1, 1]);
    const location = useLocation();
    const svgRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
        const handleResize = () => {
            const canvas = svgRef.current;
            if (!canvas) return;

            const canvasRect = canvas.getBoundingClientRect();
            setMaxSizes([
                canvasRect.width,
                canvasRect.height,
            ]);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [preSizes, location]);

    const sizes = useMemo<Point>(() => {
        return maxSizes.map((o, i) => o * preSizes[i]);
    }, [maxSizes, preSizes]);

    const offsetSizes = useMemo<Point>(() => {
        return maxSizes.map((o, i) => (o - sizes[i]) / 2);
    }, [maxSizes, sizes]);

    const points = useMemo<Array<Point>>(() => {
        return prePoints.map((p) => (
            p.map((m, j) => {
                const start = m * sizes[j] * scale;
                return start + offsetSizes[j] + sizes[j] / 2 * (1 - scale);
            })
        ));
    }, [offsetSizes, prePoints, scale, sizes]);

    const lines = useMemo(() => {
        // console.log(edges);
        
        return edges.map((r) => {
            // console.log(r);
            return r.map((i) => points[i]);
        });
    }, [edges, points]);

    const bounds = useMemo(() => {
        return [
            [offsetSizes[0], offsetSizes[1]],
            [sizes[0] + offsetSizes[0], offsetSizes[1]],
            [sizes[0] + offsetSizes[0], sizes[1] + offsetSizes[1]],
            [offsetSizes[0], sizes[1] + offsetSizes[1]],
            [offsetSizes[0], offsetSizes[1]],
        ];
    }, [offsetSizes, sizes]);

    const { scales } = useSelector((state: SceneScheme) => state.planet);
    const theme = useContext(themeContext);

    return (
        <svg
            className={classNames(cls.PlanetScene, [cls[theme]])}
            ref={svgRef}
        >
            {lines.map((lines, i) => (
                <path
                    key={i}
                    stroke="red"
                    strokeWidth={scales.points}
                    fill="none"
                    d={lines.filter((p) => p).map((point, index) => {
                        const [x, y] = point;
                        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                    }).join(' ')}
                />
            ))}
            {points.map((point, i) => (
                <Fragment key={i}>
                    <circle
                        cx={point[0]}
                        cy={point[1]}
                        r={scales.points}
                        fill={edges[edges.length - 1] === i
                            ? 'blue' : edges.includes(i)
                                ? 'yellow' : 'white'}
                    />
                    {/* <text
                        x={point[0] + 10}
                        y={point[1] - 5}
                    >
                        {prePoints[i][0].toFixed(2)}
                    </text>
                    <text
                        x={point[0] + 42}
                        y={point[1]}
                    >
                        {i}
                    </text>
                    <text
                        x={point[0] + 10}
                        y={point[1] + 10}
                    >
                        {prePoints[i][1].toFixed(2)}
                    </text> */}
                </Fragment>
            ))}
            <path
                stroke="red"
                strokeWidth={scales.points}
                fill="none"
                d={bounds.map((point, index) => {
                    const [x, y] = point;
                    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                }).join(' ')}
            />
        </svg>
    );
};

export default memo(PlanetScene);
