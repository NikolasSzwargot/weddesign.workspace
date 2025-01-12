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

export const BudgetMainFrame = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    padding: 10px 30px 0 30px;
`;

export const FormInputWrapper = styled.View`
    justify-content: flex-start;
    margin-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
`;

export const InputRow = styled.View`
    margin-bottom: 12px;
    width: 100%;
    max-width: 100%;
`;

export const AmountRow = styled.View`
    width: 75%;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    gap: 10px;
    margin-bottom: 6px;
`;

export const FirstRow = styled(Row)`
    align-items: flex-start;
`;

export const ErrorArea = styled.View`
    min-height: 20px;
`;

export const CategoryContainer = styled.TouchableOpacity`
    flex-direction: row;
    padding: 0 20px 0 10px;
    align-items: center;
    width: 22%;
    gap: 5px;
    margin-top: 5px;
`;

export const CategoryPickerContainer = styled.View`
    background-color: ${Colors.White};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 70%;
    min-width: 275px;
    height: 75%;
    border-radius: 15px;
    padding: 20px;
`;

export const CategoryPickerItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 80%;
    gap: 10px;
    margin: 0 30px 6px 20px;
`;

export const DatePickerOpenBox = styled.TouchableOpacity`
    background-color: ${Colors.LightGreen};
    border-radius: 5px;
    padding: 5px;
`;

export const DatePickerContainer = styled.View`
    background-color: ${Colors.White};
    padding: 0 20px 20px 20px;
    flex-direction: column;
    align-items: center;
`;
