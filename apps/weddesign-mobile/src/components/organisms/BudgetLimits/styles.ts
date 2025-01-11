import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const MainWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 20px;
    gap: 20px;
`;

export const TotalWrapper = styled.TouchableOpacity`
    width: 100%;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
`;

export const CategoryListItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    min-width: 95%;
    align-items: center;
    padding: 10px 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.LightGray};
`;

export const CategoryInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
    gap: 15px;
`;

interface CatDotProps {
    color: Colors;
}
export const StatusDot = styled.View<CatDotProps>`
    width: 40px;
    height: 40px;
    background-color: ${({color}) => color};
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;
