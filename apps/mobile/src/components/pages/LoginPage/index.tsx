import React from 'react';
import {Login} from '@mobile/components';
import {LoginScreens} from '@weddesign/enums';

import {GuestList} from '../../organisms';

type loginPageProps = {
    screen: LoginScreens;
};
const LoginPage = ({screen}: loginPageProps) => {
    switch (screen) {
        case LoginScreens.LANGUAGE:
            return <GuestList />;
        case LoginScreens.REGISTER:
        case LoginScreens.SETUP:
            return <Login />;
    }
};

export default LoginPage;
