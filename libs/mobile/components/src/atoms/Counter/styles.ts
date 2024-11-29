import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const CounterContainer = styled.View`
    align-items: center;
    justify-content: center;
    border: 1px solid ${Colors.LightBlue};
    border-radius: 50px;
    width: 100px;
    height: 70px;
    margin: 5px;
`;

export const CountText = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: black;
`;

export const LabelText = styled.Text`
    font-size: 18px;
    color: black;
    text-transform: lowercase;
`;
