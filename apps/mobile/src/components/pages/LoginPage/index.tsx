import React from 'react';
import {Login} from '@mobile/components';
import {LoginScreens} from '@weddesign/enums';

type loginPageProps = {
    screen: LoginScreens;
};
const LoginPage = ({screen}: loginPageProps) => {
    return <Login />;
};

export default LoginPage;
