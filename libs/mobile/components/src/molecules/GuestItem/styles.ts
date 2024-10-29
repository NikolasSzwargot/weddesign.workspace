import styled from 'styled-components/native';

export const GuestItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    //border-bottom-width: 1px;
    border-bottom-color: #ececec;
`;

export const GuestInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const GuestName = styled.Text`
    font-size: 16px;
    margin-left: 10px;
    font-weight: 500;
    color: #333;
`;

interface StatusDotProps {
    status: number;
}

export const StatusDot = styled.View<StatusDotProps>`
    width: 40px;
    height: 40px;
    background-color: ${({status}) => {
        switch (status) {
            case 1:
                return '#f6d36f';
            case 2:
                return '#b6d79d';
            case 3:
                return '#ed6055';
            default:
                return '#dadada';
        }
    }};
    border-radius: 20px;
`;
