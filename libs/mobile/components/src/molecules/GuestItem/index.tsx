import React from 'react';
import {
    GuestItemContainer,
    GuestInfoContainer,
    StatusDot,
    GuestNameWrapper,
} from './styles';
import {GuestDto} from '@shared/dto';
import {Text} from '@weddesign/themes';

type GuestItemProps = {
    guest: GuestDto;
};

const GuestItem = ({guest}: GuestItemProps) => (
    <GuestItemContainer>
        <GuestInfoContainer>
            <StatusDot status={guest.guestStatusId} />
            <GuestNameWrapper>
                <Text.SemiBold>
                    {guest.firstName} {guest.lastName}
                </Text.SemiBold>
            </GuestNameWrapper>
        </GuestInfoContainer>
    </GuestItemContainer>
);

export default GuestItem;
