import React from 'react';
import {WeddesignRoutingRoutes} from '@mobile/routes';
import {Navigate, Route, Routes, useLocation} from 'react-router-native';
import {ErrorRoutes} from '@weddesign/enums';

const DEFAULT_ROUTE = ErrorRoutes.GENERAL as const;

export const useWeddesignRoutes = () => {
    const location = useLocation();
    return (
        <Routes>
            {location.pathname === '/' && (
                <Route path="*" element={<Navigate to={DEFAULT_ROUTE} />} />
            )}
            {WeddesignRoutingRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={
                        route.screen ? `${route.route}${route.screen}` : route.route
                    }
                    element={route.element}
                />
            ))}
        </Routes>
    );
};
