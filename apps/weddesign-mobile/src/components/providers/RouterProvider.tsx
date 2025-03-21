import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import {BackHandler} from 'react-native';
import {Location, useLocation, useNavigate} from 'react-router-native';
import {Route} from '@weddesign/enums';

type RouterFunctions = {
    navigate: (navigationRoute: string, state?: any) => void;
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

    const parseQueryParams = (search: string): Record<string, string> => {
        if (!search) {
            return {};
        }

        const params = new URLSearchParams(
            search.startsWith('?') ? search.substring(1) : search,
        );
        const queryParams: Record<string, string> = {};
        params.forEach((value, key) => {
            queryParams[key] = value;
        });
        return queryParams;
    };

    const navigate = (navigationRoute: string, state?: any) => {
        const fullPath: string = navigationRoute;

        navigateNative(fullPath, {state});
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

    useEffect(() => {
        const handleBackPress = () => {
            if (location.pathname === '/home') {
                BackHandler.exitApp();
                return true;
            } else {
                navigateNative(-1);
                return true;
            }
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [location, navigateNative]);

    return (
        <RoutingContext.Provider value={{router}}>
            {children}
        </RoutingContext.Provider>
    );
};
