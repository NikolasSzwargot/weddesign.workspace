import React from 'react';
import {useWeddesignRoutes} from '@weddesign-mobile/hooks';

const Routes = () => {
    const routes = useWeddesignRoutes();

    return <>{routes}</>;
};

export default Routes;
