import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

interface CatDotProps {
    color: Colors;
}
export const Dot = styled.View<CatDotProps>`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${({color}) => color};
    border-radius: 20px;
`;
