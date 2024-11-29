import React from 'react';
import {useWeddesignRoutes} from '@mobile/hooks';

const Routes = () => {
    const routes = useWeddesignRoutes();

    //@NOTE: This is not a single JSX. without <></> it will crash the app
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{routes}</>;
};

export default Routes;
