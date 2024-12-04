import * as querystring from 'querystring';

import React, {createContext, ReactNode, useContext, useMemo} from 'react';
import {Location, useLocation, useNavigate} from 'react-router-native';
import {Route} from '@weddesign/enums';

type RouterFunctions = {
    navigate: (navigationRoute: string) => void;
    location: Location;
    query: Route;
};

type RoutingContextProps = {
    router: RouterFunctions;
};

const RoutingContext = createContext<RoutingContextProps | undefined>(undefined);

export const useRouting = (): RoutingContextProps => {
    const context = useContext(RoutingContext);
    if (!context) {
        throw new Error('Context not used within provider');
    }
    return context;
};

type RoutingProviderProps = {
    children: ReactNode;
};

export const RoutingProvider = ({children}: RoutingProviderProps) => {
    const navigateNative = useNavigate();
    const location = useLocation();

    const getQueryParams = (params: Record<string, string>) => {
        return Object.keys(params)
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
            )
            .join('&');
    };

    const parseQueryParams = (search: string): Record<string, string> => {
        return querystring.parse(search) as Record<string, string>;
    };

    const navigate = (navigationRoute: string) => {
        const fullPath: string = navigationRoute;

        //@TODO: Talk it out if we really need this
        // if (navigationRoute.queryParams) {
        //     const query = getQueryParams(navigationRoute.queryParams);
        //     fullPath = fullPath.concat(`?${query}`);
        // }

        navigateNative(fullPath);
    };

    const query = useMemo<Route>(() => {
        const currentPathname = location.pathname;
        const [route, screen] = currentPathname.split('/').filter(Boolean);
        const queryParams = parseQueryParams(location.search);

        return {
            route: `/${route || ''}`,
            screen: screen ? `/${screen}` : undefined,
            queryParams: Object.keys(queryParams).length ? queryParams : undefined,
        } as Route;
    }, [location]);

    const router: RouterFunctions = {
        navigate,
        location,
        query,
    };

    return (
        <RoutingContext.Provider value={{router}}>
            {children}
        </RoutingContext.Provider>
    );
};
