import styled from 'styled-components/native';
import {Colors, GuestStatuses} from '@weddesign/enums';

export const GuestItemContainer = styled.TouchableOpacity`
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

export const GuestNameWrapper = styled.View`
    margin-left: 10px;
`;

interface StatusDotProps {
    status: number;
}

export const StatusDot = styled.View<StatusDotProps>`
    width: 40px;
    height: 40px;
    background-color: ${({status}) => {
        switch (status) {
            case GuestStatuses.Created:
                return Colors.StatusCreated;
            case GuestStatuses.Invited:
                return Colors.StatusInvited;
            case GuestStatuses.Accepted:
                return Colors.StatusAccepted;
            case GuestStatuses.Rejected:
                return Colors.StatusRejected;
            default:
                return Colors.StatusCreated;
        }
    }};
    border-radius: 20px;
`;
