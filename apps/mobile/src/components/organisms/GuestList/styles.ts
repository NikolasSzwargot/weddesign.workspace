import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    //background-color: #fff;
`;

export const GuestListWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100%;
    margin-top: 20px;
`;

export const SeparatorContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`;

export const ShortSeparatorLine = styled.View`
    width: 40px;
    height: 1px;
    background-color: #e0e0e0;
    margin-right: 10px;
`;

export const LongSeparatorLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: #e0e0e0;
    margin-left: 10px;
`;

export const SeparatorText = styled.Text`
    //margin-left: 50px;
    font-size: 16px;
    color: #e0e0e0;
`;
