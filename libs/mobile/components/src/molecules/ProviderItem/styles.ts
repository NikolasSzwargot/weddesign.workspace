import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View`
    padding: 10px 15px 10px 15px;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
`;

export const ArrowWrapper = styled(Animated.View)`
    margin-right: 10px;
    height: auto;
    width: auto;
`;

export const DetailsWrapper = styled.View`
    padding: 10px 10px 0;
    gap: 10px;
`;

export const DetailsRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px 0;
`;

export const IconRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

export const IconWrapper = styled.View`
    padding: 0 15px 0;
`;
