import {
    Link,
    Navigate, Route, Routes,
} from 'react-router-dom';
import { HStack } from 'src/shared/ui/Stack';
import SceneProvider from '../pages/ScenePage/SceneProvider/SceneProvider';
import GameOfLifePage from '../pages/ScenePage/ui/GameOfLifePage';
import PlanetPage from '../pages/ScenePage/ui/PlanetPage';
import cls from './App.module.scss';

export const App = () => {
    const routes = [
        {
            route: 'planet',
            linkText: 'Планета',
            to: <PlanetPage />,
        },
        {
            route: 'game_of_life',
            linkText: 'Игра в жизнь',
            to: <GameOfLifePage />,
        },
    ];

    return (
        <div className={cls.App}>
            <SceneProvider>
                <Routes>
                    {routes.map(({ route, to }) => (
                        <Route key={route} path={route} element={to} />
                    ))}
                    <Route index element={<Navigate to={routes[0].route} />} />
                </Routes>
            </SceneProvider>
            <HStack className={cls.pagesLinks} gap={16}>
                {routes.map(({ route, linkText }) => (
                    <Link key={route} to={route}>
                        {linkText}
                    </Link>
                ))}
            </HStack>
        </div>
    );
};
