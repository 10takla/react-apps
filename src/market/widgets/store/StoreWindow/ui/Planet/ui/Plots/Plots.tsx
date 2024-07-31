import { GroupProps } from '@react-three/fiber';
import { ForwardedRef, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as Three from 'three';
import { Point, useDrawPlots, ResponseData } from './api/plotsApi';
import { Point as P, Points } from '@react-three/drei';

type ElRef = Three.Group | null;

interface PlotsProps extends GroupProps {
    points: Point[]
}

const Plots = (props: PlotsProps, ref: ForwardedRef<ElRef>) => {
    const {
        points,
        ...otherProps
    } = props;

    const plotsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => plotsRef.current,
    );
    const [density, setDensity] = useState(100);

    const [cells, setCells] = useState<ResponseData>([]);
    const [cellPoints, setCellPoints] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [getCells] = useDrawPlots();
    // console.log(1);

    useEffect(() => {
        getCells({
            planetId: 1,
            points,
            density
        }).then(({ data }) => {
            setCells(data[2]);
            setTmp(data[1])
            setCellPoints(data[0])
        });
    }, [points]);

    if (!cells) {
        return null
    }
    return (
        <group
            ref={plotsRef}
            {...otherProps}
        >
            <mesh
                geometry={(() => {
                    const geometry = new Three.BufferGeometry();
                    const vertices = new Float32Array(tmp.flat(Infinity));
                    geometry.setAttribute('position', new Three.BufferAttribute(vertices, 3));
                    return geometry
                })()}
            >
                <meshStandardMaterial
                    wireframe={true}
                    // transparent={true}
                    opacity={0.4}
                    color={'orange'}
                    side={Three.DoubleSide}
                />
            </mesh>
            {/* <Points>
                <pointsMaterial color="green" size={0.25} />
                {cellPoints.map((point) => (
                    <P position={point} />
                ))}
            </Points> */}
            {cells.map(([cell, points], i) => (
                <>
                    {/* <Points>
                        <pointsMaterial color="blue" size={0.1} />
                        {points.map((point) => (
                            <P position={point} />
                        ))}
                    </Points> */}
                    <mesh
                        key={i}
                        geometry={(() => {
                            const geometry = new Three.BufferGeometry();
                            const vertices = new Float32Array(cell.flat(Infinity));
                            geometry.setAttribute('position', new Three.BufferAttribute(vertices, 3));
                            return geometry
                        })()}
                    >
                        <meshStandardMaterial
                            // wireframe={true}
                            // transparent={true}
                            opacity={0.4}
                            color={'orange'}
                            side={Three.DoubleSide}
                        />
                    </mesh>
                </>
            ))}
        </group>
    )
};

export default memo(forwardRef(Plots));