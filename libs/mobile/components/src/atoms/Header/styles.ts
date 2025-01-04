import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: 10px 20px;
    top: 10px;
    margin-top: 10px;
    background: transparent;
`;

export const ItemWrapper = styled.View`
    padding: 10px;
    flex: 1;
`;

export const TitleWrapper = styled.TouchableOpacity`
    flex: 2;
    justify-content: center;
    align-items: center;
`;
