import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
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

export const StatusBarWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100vw;
    margin-top: 20px;
`;

export const CounterWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
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
    background-color: ${Colors.LightGray};
    margin-right: 10px;
`;

export const LongSeparatorLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${Colors.LightGray};
    margin-left: 10px;
`;

export const SeparatorText = styled.Text`
    font-size: 16px;
    color: ${Colors.LightGray};
`;

export const SearchBarWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    justify-content: space-between;
`;
