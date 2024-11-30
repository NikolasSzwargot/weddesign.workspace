import React from 'react';
import {useState} from 'react';
import {ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {Text} from '@weddesign/themes';

import {ProgressLogoContainer} from '../styles';

import {Container, Description} from './styles';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container>
            <ProgressLogoContainer>
                <ProgressBar progress={30} />
                <Images.Label />
            </ProgressLogoContainer>
            <Description>
                <Text.Bold size={18} style={{textAlign: 'center'}}>
                    {'Stwórz konto, aby podzielić się\nplanowaniem z innymi!'}
                </Text.Bold>
                <Text.Light size={14}>
                    {'Wpisz swój email, żeby zarejestrować się'}
                </Text.Light>
            </Description>
        </Container>
    );
};

export default Register;
