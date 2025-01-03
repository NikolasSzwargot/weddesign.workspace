import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #ddd;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    flex: 1;
`;

export const ContentWrapper = styled.View`
    padding: 10px;
    background-color: #f9f9f9;
`;

export const ArrowWrapper = styled(Animated.View)`
    margin-left: 10px;
`;
