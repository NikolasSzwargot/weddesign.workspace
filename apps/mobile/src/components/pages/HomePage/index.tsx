import React, {useEffect} from 'react';
import {Home} from '@mobile/components';

import {useLogin} from '../../../api/Login/useLogin';

const HomePage = () => {
    const {data, isLoading} = useLogin({email: 'test', password: 'test'});

    useEffect(() => {
        if (!isLoading) {
            console.log(data);
        }
    }, [isLoading]);
    return <Home />;
};

export default HomePage;
