import { createContext } from 'react';

export interface RouteProps {
    path: string;
    linkText: string;
    to: JSX.Element;
}

interface RoutesContextProps {
    routes: Array<RouteProps>[];
    setRoute: (routes: Array<RouteProps>) => void;
}

export const routesContext = createContext<RoutesContextProps>({ routes: [], setRoute: () => { } });
