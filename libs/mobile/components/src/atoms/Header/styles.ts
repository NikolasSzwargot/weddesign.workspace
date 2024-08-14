import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const HeaderWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: 10px 20px;
    position: absolute;
    top: 10px;
    background: transparent;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${Colors.Black};
`;

export const MoreIconWrapper = styled.View`
    padding: 10px;
`;
