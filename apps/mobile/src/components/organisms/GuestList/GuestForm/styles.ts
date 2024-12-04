import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const GuestFormWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100%;
    margin-top: 20px;
`;

export const FormInputWrapper = styled.View`
    justify-content: flex-start;
    margin-top: 25%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const InputRow = styled.View`
    margin-bottom: 16px;
`;

export const TextArea = styled.TextInput`
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    text-align-vertical: top;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    //justify-content: space-between;
    gap: 10px;
    margin-bottom: 16px;
`;
