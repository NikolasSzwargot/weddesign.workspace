import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity<{backgroundColor?: string}>`
    justify-content: center;
    align-items: center;
    height: 44px;
    min-width: 44px;
    background-color: ${({backgroundColor}) =>
        backgroundColor ? backgroundColor : 'transparent'};
    padding-left: 7px;
    padding-right: 7px;
    margin-right: 6px;
    margin-left: 6px;
    border-radius: 8px;
`;
