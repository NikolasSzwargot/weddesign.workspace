import React from 'react';
import {useState} from 'react';
import {ProgressBar} from '@weddesign/components';

import {Container, ProgressLogoContainer} from './styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <ProgressLogoContainer>
                <ProgressBar progress={50} />
            </ProgressLogoContainer>
            {/*<LoginPageInput*/}
            {/*    value={email}*/}
            {/*    onChange={(text: string) => {*/}
            {/*        setEmail(text);*/}
            {/*    }}*/}
            {/*    placeholder={'Podaj email'}*/}
            {/*    inputMode={'email'}*/}
            {/*/>*/}
            {/*<LoginPageInput*/}
            {/*    value={password}*/}
            {/*    onChange={(text: string) => {*/}
            {/*        setPassword(text);*/}
            {/*    }}*/}
            {/*    placeholder={'Podaj hasło'}*/}
            {/*/>*/}
        </Container>
    );
};

export default Login;
