import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const MainWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    width: 100vw;
    height: 100%;
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

export const ModalContainer = styled.View`
    flex: 1;
    background-color: white;
    padding: 20px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 250px;
    flex-direction: column;
`;

export const ModalRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    //width: 100%;
    gap: 10px;
    margin-bottom: 16px;
`;
