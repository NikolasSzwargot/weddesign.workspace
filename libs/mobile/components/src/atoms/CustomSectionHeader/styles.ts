import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const UniversalSeparatorContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`;

export const StartSeparatorLine = styled.View`
    width: 40px;
    height: 1px;
    background-color: ${Colors.LightGray};
    margin-right: 10px;
`;

export const MiddleSeparatorLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${Colors.LightGray};
    margin-left: 10px;
    margin-right: 10px;
`;

export const EndSeparatorLine = styled.View`
    width: 26px;
    height: 1px;
    background-color: ${Colors.LightGray};
    margin-left: 10px;
`;

export const LongSeparatorLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${Colors.LightGray};
    margin-left: 10px;
`;
