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
        </Container>
    );
};

export default Login;
