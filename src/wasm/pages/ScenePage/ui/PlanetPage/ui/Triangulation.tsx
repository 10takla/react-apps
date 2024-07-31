import {
    memo, useMemo, useState,
    useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { PointDistribution } from 'rust_wasm/rust_wasm';
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import PlanetScene from "src/wasm/widgets/Planet/PlanetScene/PlanetScene";

interface TriangulationProps {
    dist: PointDistribution
}

const Triangulation = (props: TriangulationProps) => {
    const {
        dist,
    } = props;
    const {
        trigger,
    } = useSelector((state: SceneScheme) => state.planet);

    const [edges, setEdges] = useState<number[]>([]);
    useEffect(() => {
        setEdges([]);
    }, [dist]);

    useEffect(() => {
        if (trigger) {
            const edges = dist.get_triangles();
            if (edges !== undefined) {
                setEdges(edges.map((x) => [...x, x[0]]));
            }
        }
    }, [dist, trigger]);

    const points = useMemo(() => {
        return dist.points;
    }, [dist.points]);

    return (
        <PlanetScene {...{ points, edges }} />
    );
};

export default memo(Triangulation);
