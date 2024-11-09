import styled from 'styled-components/native';
import {Input} from '@weddesign/components';

export const Container = styled.View`
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
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
