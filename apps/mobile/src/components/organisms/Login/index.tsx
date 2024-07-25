import {useState} from 'react';

import {Container, LoginPageInput} from './styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container>
            <LoginPageInput
                value={email}
                onChange={(text: string) => {
                    setEmail(text);
                }}
                placeholder={'Podaj email'}
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
