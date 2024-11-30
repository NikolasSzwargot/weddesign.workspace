import React from 'react';
import {Login} from '@mobile/components';
import {LoginScreens} from '@weddesign/enums';

import LanguageSetup from '../../organisms/Login/LanguageSetup';

type loginPageProps = {
    screen: LoginScreens;
};
const LoginPage = ({screen}: loginPageProps) => {
    switch (screen) {
        case LoginScreens.LANGUAGE:
            return <LanguageSetup />;
        case LoginScreens.REGISTER:
        case LoginScreens.SETUP:
            return <Login />;
    }
};

export default LoginPage;
