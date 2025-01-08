import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const BudgetMainWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100%;
    margin-top: 20px;
`;

export const BudgetMainFrame = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    padding: 10px 30px 0px 30px;
`;

export const FormInputWrapper = styled.View`
    justify-content: flex-start;
    margin-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
    gap: 5px;
`;

export const InputRow = styled.View`
    margin-bottom: 12px;
    width: 100%;
    max-width: 100%;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    gap: 10px;
    margin-bottom: 6px;
`;

export const ErrorArea = styled.View`
    min-height: 20px;
`;

export const CategoryContainer = styled.TouchableOpacity`
    flex-direction: row;
    padding: 0 20px 0 10px;
    align-items: center;
    width: 22%;
    gap: 10px;
`;

export const CategorypickerContainer = styled.View`
    background-color: ${Colors.White};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 70%;
    height: 60%;
    border-radius: 15px;
    padding: 20px;
`;

export const CategorypickerItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    gap: 10px;
    margin-bottom: 6px;
`;

export const DatepickerOpenBox = styled.TouchableOpacity`
    background-color: ${Colors.LightGreen};
    border-radius: 5px;
    padding: 5px;
`;

export const DatepickerContainer = styled.View`
    background-color: ${Colors.White};
    padding: 0 20px 20px 20px;
    flex-direction: column;
    align-items: center;
`;
