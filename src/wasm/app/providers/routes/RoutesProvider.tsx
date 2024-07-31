import {
    memo, ReactNode, useState, useMemo,
} from 'react';
import { RouteProps, routesContext } from './routesContext';

interface RoutesProviderProps {
    children: ReactNode
}

const RoutesProvider = (props: RoutesProviderProps) => {
    const {
        children,
    } = props;

    const [routes, setRoutes] = useState<Array<RouteProps>>([]);

    return (
        <routesContext.Provider value={useMemo(() => ({
            routes,
            setRoute: (route: RouteProps) => {
                setRoutes([...routes, route]);
            },
        }), [routes])}
        >
            {children}
        </routesContext.Provider>
    );
};

export default memo(RoutesProvider);
