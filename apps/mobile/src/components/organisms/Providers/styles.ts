import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const ProvidersCategoriesWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 10px;
`;

export const CategoriesWrapper = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    top: 8%;
    gap: 10px;
    margin: 10px;
`;

export const FloatingButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: ${Colors.LightPurple};
    justify-content: center;
    align-items: center;
    elevation: 3;
`;
