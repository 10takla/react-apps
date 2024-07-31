import {
    memo, useMemo, useEffect, useState, ComponentProps,
} from 'react';
import { useSelector } from 'react-redux';
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import PlanetScene from "src/wasm/widgets/Planet/PlanetScene/PlanetScene";
import Triangulation from './Triangulation';

interface ConvexProps extends ComponentProps<typeof Triangulation> {

}

class ConvexHull {
    constructor(s: any) {

    }
    tick() {

    }
}

const Convex = (props: ConvexProps) => {
    const {
        dist,
    } = props;
    const {
        trigger,
    } = useSelector((state: SceneScheme) => state.planet);

    const [edges, setEdges] = useState<number[]>([]);

    const hull = useMemo(() => {
        setEdges([]);
        return new ConvexHull(dist.points);
    }, [dist]);

    useEffect(() => {
        if (trigger) {
            const edge = hull.tick();
            if (edge !== undefined) {
                setEdges((edges) => [...edges, edge]);
            }
        }
    }, [hull, trigger]);

    const points = useMemo(() => {
        return dist.points;
    }, [dist]);

    return (
        <PlanetScene {...{ points, edges }} />
    );
};

export default memo(Convex);
