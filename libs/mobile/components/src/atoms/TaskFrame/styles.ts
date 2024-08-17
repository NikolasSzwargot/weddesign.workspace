import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const MainView = styled.View`
    display: flex;
    flex-direction: column;
    background-color: ${Colors.PinkLight};
    min-height: 124px;
    width: 318px;
    text-wrap: normal;
    padding: 10px;
    border: 2px solid transparent;
    border-radius: 20px;
    margin-top: 20px;
`;
