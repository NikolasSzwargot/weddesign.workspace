import styled from 'styled-components/native';
import {Input} from '@weddesign/components';

export const Container = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const LoginPageInput = styled(Input)`
    margin: 5px 10px 5px 10px;
    color: black;
`;

export const ProgressBarContainer = styled.View`
    top: 5%;
    width: 90%;
`;

export const Description = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 8px;
`;

export const InputGroup = styled.View`
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
