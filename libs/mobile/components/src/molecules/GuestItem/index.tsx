import React from 'react';
import {
    GuestItemContainer,
    GuestInfoContainer,
    GuestName,
    StatusDot,
} from './styles';
import {GuestDto} from '@shared/dto';

type GuestItemProps = {
    guest: GuestDto;
};

const GuestItem = ({guest}: GuestItemProps) => (
    <GuestItemContainer>
        <GuestInfoContainer>
            <StatusDot status={guest.guestStatusId} />
            <GuestName>
                {guest.firstName} {guest.lastName}
            </GuestName>
        </GuestInfoContainer>
    </GuestItemContainer>
);

export default GuestItem;
