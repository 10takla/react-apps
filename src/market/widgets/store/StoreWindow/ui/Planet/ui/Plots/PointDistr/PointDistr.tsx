import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { HStack } from "S/ui/Stack";
import { Vector3 } from 'three';
import Plots from '../Plots';
import { Point, Points, Sphere } from '@react-three/drei';
import { PointDistribution } from 'rust_wasm';
import { useSelector } from 'react-redux';
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface PointDistrProps extends ComponentProps<Component> {

}

const PointDistr = (props: PointDistrProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const pointDistrRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => pointDistrRef.current,
    );

    const { pointsCount, reset, set } = useSelector((state: MarketScheme) => state.store.actionPanel);
    const [points, setPoints] = useState<Vector3[]>([]);

    useEffect(() => {
        if (reset) {
            setPoints([])
        }
    }, [reset]);

    const moveId = useRef(-1)
    const y = useRef()

    const [backgroundPoint, setBackgroundPoint] = useState<Vector3>();
    const [selected, setSelected] = useState<number>();

    useEffect(() => {
        if (selected) {
            const handle = (e) => {
                if (e.key == "Delete") {
                    setPoints(points.toSpliced(selected, 1))
                    setSelected(undefined)
                }

            }
            window.addEventListener("keydown", handle)

            return () => {
                window.removeEventListener("keydown", handle)
            }
        }
    }, [selected]);

    useEffect(() => {
        if (pointsCount) {
            const ps: Vector3[] = PointDistribution.set_spherical_random_points(pointsCount, 1).points.map((point: [number, number, number]) => new Vector3(...point))
            setPoints([...points, ...ps])
        }
    }, [pointsCount, set]);

    useEffect(() => {
        const ps: Vector3[] = PointDistribution.set_spherical_random_points(20, 1).points.map((point: [number, number, number]) => new Vector3(...point))
        setPoints([...points, ...ps])
    }, []);

    return (
        <>
            <Sphere
                scale={1}
                args={[1, 128, 128]}
                onPointerDown={(e) => {
                    moveId.current = points.findIndex((point) => {
                        const r = new Vector3(...Object.values(e.point));
                        const v = r.sub(point);

                        return v.length() < 0.05
                    });
                    setSelected(moveId.current)
                }}
                onPointerMove={(e) => {
                    if (moveId.current != -1) {
                        y.current = e.point
                        setPoints(
                            points.toSpliced(moveId.current, 1, e.point)
                        )
                    } else {
                        const tmp = points.find((point) => {
                            const r = new Vector3(...Object.values(e.point));
                            const v = r.sub(point);
                            return v.length() < 0.05
                        });
                        if (tmp) {
                            setBackgroundPoint(undefined)
                        } else {
                            setBackgroundPoint(e.point)
                        }
                    }
                }}
                onPointerLeave={(e) => {
                    if (moveId.current != -1) {
                        const handleMouseUp = () => {
                            setPoints(
                                points.toSpliced(moveId.current, 1, y.current)
                            )
                            moveId.current = -1
                            window.removeEventListener('pointerup', handleMouseUp);
                        }
                        window.addEventListener('pointerup', handleMouseUp);
                    }
                    setBackgroundPoint(undefined)
                }}
                onPointerUp={(e) => {
                    if (moveId.current != -1) {
                        moveId.current = -1
                    }
                }}
                onContextMenu={(e) => {
                    const tmp = points.find((point) => {
                        const r = new Vector3(...Object.values(e.point));
                        const v = r.sub(point);
                        return v.length() < 0.07
                    });

                    if (tmp) {
                        // console.log(tmp);
                    } else {
                        setPoints([...points, e.point])
                        setSelected(points.length)
                    }
                }}
                {...otherProps}
            >
                <meshStandardMaterial transparent={true} opacity={0} />
            </Sphere>
            <Points>
                <pointsMaterial size={0.1} vertexColors />
                {points.map((point, i) => (
                    <Point key={i} position={Object.values(point).map(o => o * 1.05)} color={selected == i ? "green" : "red"} />
                ))}
                {backgroundPoint && <Point position={Object.values(backgroundPoint)} color="yellow" />}
            </Points>
            <Plots points={useMemo(() => points.map(p => Object.values(p)), [points])} />
        </>
    )
};

export default memo(forwardRef(PointDistr));