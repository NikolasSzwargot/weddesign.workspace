import React from 'react';
import {
    GuestItemContainer,
    GuestInfoContainer,
    GuestName,
    StatusDot,
} from './styles';

import {Guest} from '@weddesign/types';

type GuestItemProps = {
    guest: Guest;
};

const GuestItem = ({guest}: GuestItemProps) => (
    <GuestItemContainer>
        <GuestInfoContainer>
            <StatusDot status={guest.statusId} />
            <GuestName>
                {guest.firstName} {guest.lastName}
            </GuestName>
        </GuestInfoContainer>
    </GuestItemContainer>
);

export default GuestItem;
