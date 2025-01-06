import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-native';
import {LoginRoutes} from '@weddesign/enums';
import {WeddesignRoutingRoutes} from '@weddesign-mobile/components';

const DEFAULT_ROUTE = LoginRoutes.LANGUAGE as const;

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
