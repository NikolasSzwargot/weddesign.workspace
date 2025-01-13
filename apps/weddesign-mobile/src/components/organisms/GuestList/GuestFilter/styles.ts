import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 805px;
    justify-content: center;
    align-items: center;
`;

export const GuestFormWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    margin-top: 20px;
`;

export const FormInputWrapper = styled.View`
    justify-content: flex-start;
    margin-top: 10%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const TitleRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const StatusRow = styled.View`
    margin-bottom: 16px;
`;

export const CloseIcon = styled.View`
    justify-content: flex-start;
    align-items: flex-end;
`;
