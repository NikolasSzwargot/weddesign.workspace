import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const MainView = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.White};
    min-height: 128px;
    width: 260px;
    text-wrap: normal;
    padding: 10px;
    border: 4px solid ${Colors.BananaGold};
    border-radius: 20px;
    margin-top: 20px;
`;
