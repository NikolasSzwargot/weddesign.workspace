import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 805,
    },
}))`
    flex: 1;
`;

export const TasksFilterWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 10px;
`;

export const FormWrapper = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    padding-left: 20px;
    padding-right: 30px;
    gap: 32px;
`;

export const TitleWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
`;
