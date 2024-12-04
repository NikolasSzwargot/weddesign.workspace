import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const StyledInput = styled.TextInput<{multiline?: boolean}>`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid ${Colors.Gray};
    border-radius: 8px;
    font-size: 16px;
    color: ${Colors.Black};
    background-color: ${Colors.White};
    text-align: left;
    min-height: ${({multiline}) => (multiline ? '100px' : 'auto')};
`;
