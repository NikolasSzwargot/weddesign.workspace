import React from 'react';
import {useWeddesignRoutes} from '@mobile/hooks';

const Routes = () => {
    const routes = useWeddesignRoutes();

    return <>{routes}</>;
};

export default Routes;
