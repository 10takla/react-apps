import {
    forwardRef, memo, ForwardedRef, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PointDistribution } from 'rust_wasm/rust_wasm';
import ThemeProvider from "S/providers/theme/ThemeProvider";
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import ScenePage from "src/wasm/pages/ScenePage/ScenePage";
import SharedLinks from "src/wasm/shared/ui/SharedLinks/SharedLinks";
import PlanetPanel from "src/wasm/widgets/Planet/PlanetPanel/PlanetPanel";
import Convex from './ui/Convex';
import Triangulation from './ui/Triangulation';

type El = HTMLElement | undefined;

interface PlanetProps {

}

const PlanetPage = (props: PlanetProps, ref: ForwardedRef<El>) => {
    const {
        trigger2, pointCount,
    } = useSelector((state: SceneScheme) => state.planet);

    const dist = useMemo(() => {
        return PointDistribution.set_random_points(pointCount, [1, 1]);
    }, [pointCount, trigger2]);

    const routes = [
        {
            path: 'convex_hull',
            linkText: 'Выпуклая оболочка',
            to: <Convex dist={dist} />,
        },
        {
            path: 'triangulation',
            linkText: 'Триангуляция',
            to: <Triangulation dist={dist} />,
        },
    ];

    return (
        <ThemeProvider theme="dark">
            <ScenePage
                scene={(
                    <>
                        <SharedLinks routes={routes} />
                        <Routes>
                            <Route index element={<Navigate to={routes[0].path} />} />
                            {routes.map(({ path, to }) => (
                                <Route key={path} path={`${path}/*`} element={to} />
                            ))}
                        </Routes>
                    </>
                )}
                controlPanel={<PlanetPanel />}
            />
        </ThemeProvider>

    );
};

export default memo(forwardRef(PlanetPage));
