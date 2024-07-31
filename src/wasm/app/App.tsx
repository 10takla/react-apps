import {
    Navigate, Route, Routes,
    Link,
} from 'react-router-dom';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './App.module.scss';
import GameOfLifePage from '../pages/ScenePage/ui/GameOfLifePage';
import PlanetPage from '../pages/ScenePage/ui/PlanetPage/PlanetPage';

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
        <div className={classNames(cls.App)}>
            <Routes>
                <Route index element={<Navigate to={routes[0].route} />} />
                {routes.map(({ route, to }) => (
                    <Route key={route} path={`${route}/*`} element={to} />
                ))}
            </Routes>
            <VStack data-portal-links className={cls.pageLinks}>
                <HStack>
                    {routes.map(({ route, linkText }) => (
                        <Link key={route} to={route}>
                            {linkText}
                        </Link>
                    ))}
                </HStack>
            </VStack>
        </div>
    );
};
