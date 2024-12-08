import styled from 'styled-components/native';
import {Colors, GuestStatuses} from '@weddesign/enums';

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
