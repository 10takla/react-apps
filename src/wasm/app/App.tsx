import {
    Navigate, Route, Routes, Link,
} from 'react-router-dom';
import { HStack } from 'src/shared/ui/Stack';
import cls from './App.module.scss';
import GameOfLife from '../pages/GameOfLife/GameOfLife';

export const App = () => {
    const routes = [
        { route: 'game_of_life', linkText: 'Игра в жизнь', to: <GameOfLife /> },
    ];

    return (
        <div className={cls.App}>
            <Routes>
                {routes.map(({ route, to }) => (
                    <Route path={route} element={to} />
                ))}
                <Route index element={<Navigate to={routes[0].route} />} />
            </Routes>
            <HStack className={cls.pagesLinks}>
                {routes.map(({ route, linkText }) => (
                    <Link to={route}>
                        {linkText}
                    </Link>
                ))}
            </HStack>
        </div>
    );
};
