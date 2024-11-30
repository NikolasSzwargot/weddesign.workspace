import styled from 'styled-components/native';
import {Input} from '@weddesign/components';

export const Container = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 150px;
`;

export const ProgressLogoContainer = styled.View`
    top: 5%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
`;

export const LoginPageInput = styled(Input)`
    margin: 5px 10px 5px 10px;
    color: black;
`;

export const NextButtonContainer = styled.View`
    width: 95%;
    position: absolute;
    bottom: 15px;
`;
