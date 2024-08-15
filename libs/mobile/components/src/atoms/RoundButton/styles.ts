import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const OpacityContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const ButtonContainer = styled.TouchableOpacity<{color?: Colors}>`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    background-color: ${({color}) => color || Colors.Black};
`;
