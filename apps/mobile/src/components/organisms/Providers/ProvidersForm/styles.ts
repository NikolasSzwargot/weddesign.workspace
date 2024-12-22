import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 805px;
    justify-content: center;
    align-items: center;
`;

export const ProvidersFormWrapper = styled.View`
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    flex: 1;
    margin-top: 10px;
    gap: 70px;
`;

export const FormInputWrapper = styled.View`
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
`;

export const InputRow = styled.View`
    margin-bottom: 12px;
    width: 100%;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 16px;
`;

export const RatingRow = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
`;

export const ErrorArea = styled.View`
    min-height: 20px;
`;

export const ButtonRow = styled.View`
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;
