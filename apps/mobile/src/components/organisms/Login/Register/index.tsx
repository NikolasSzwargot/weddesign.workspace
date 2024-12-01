import React from 'react';
import {useState} from 'react';
import {ProgressBar} from '@weddesign/components';

import {Container, ProgressBarContainer} from './styles';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container>
            <ProgressBarContainer>
                <ProgressBar progress={1} />
            </ProgressBarContainer>
        </Container>
    );
};

export default Register;
