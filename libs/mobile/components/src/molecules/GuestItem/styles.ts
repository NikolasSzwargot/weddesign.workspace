import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const GuestItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
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
    color: black;
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
                return Colors.StatusCreated;
            case 2:
                return Colors.StatusInvited;
            case 3:
                return Colors.StatusAccepted;
            case 4:
                return Colors.StatusRejected;
            default:
                return Colors.StatusCreated;
        }
    }};
    border-radius: 20px;
`;
