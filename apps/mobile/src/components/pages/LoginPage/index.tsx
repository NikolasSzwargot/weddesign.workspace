import React from 'react';
import {Login} from '@mobile/components';
import {LoginScreens} from '@weddesign/enums';

import LanguageSetup from '../../organisms/Login/LanguageSetup';
import Register from '../../organisms/Login/Register';
import BrideGroomSetup from '../../organisms/Login/BrideGroomSetup';
import DateSetup from '../../organisms/Login/DateSetup';

type loginPageProps = {
    screen?: LoginScreens;
};
const LoginPage = ({screen}: loginPageProps) => {
    switch (screen) {
        case LoginScreens.LANGUAGE:
            return <LanguageSetup />;
        case LoginScreens.REGISTER:
            return <Register />;
        case LoginScreens.NAMES:
            return <BrideGroomSetup />;
        case LoginScreens.DATE:
            return <DateSetup />;
        default:
            return <Login />;
    }
};

export default LoginPage;
