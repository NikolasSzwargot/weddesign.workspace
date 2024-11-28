import React from 'react';
import {useState} from 'react';
import {ProgressBar} from '@weddesign/components';
import {LoginScreens} from '@weddesign/enums';

import {Container, LoginPageInput, ProgressBarContainer} from './styles';

type LoginProps = {
    screen: LoginScreens;
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container>
            <ProgressBarContainer>
                <ProgressBar progress={50} />
            </ProgressBarContainer>
            <LoginPageInput
                value={email}
                onChange={(text: string) => {
                    setEmail(text);
                }}
                placeholder={'Podaj email'}
                inputMode={'email'}
            />
            <LoginPageInput
                value={password}
                onChange={(text: string) => {
                    setPassword(text);
                }}
                placeholder={'Podaj hasło'}
            />
        </Container>
    );
};

export default Login;
