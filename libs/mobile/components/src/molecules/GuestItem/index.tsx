import React from 'react';
import {
    GuestItemContainer,
    GuestInfoContainer,
    StatusDot,
    GuestNameWrapper,
} from './styles';
import {GuestDto} from '@shared/dto';
import {Text} from '@weddesign/themes';
import {IconButton} from '../../atoms';
import {Icons} from '@weddesign/assets';

type GuestItemProps = {
    guest: GuestDto;
    onGuestPress: () => void;
    onDeletePress: (guest: GuestDto) => void;
};

const GuestItem = ({guest, onGuestPress, onDeletePress}: GuestItemProps) => (
    <GuestItemContainer onPress={onGuestPress}>
        <GuestInfoContainer>
            <StatusDot status={guest.guestStatusId} />
            <GuestNameWrapper>
                <Text.SemiBold>
                    {guest.firstName} {guest.lastName}
                </Text.SemiBold>
            </GuestNameWrapper>
        </GuestInfoContainer>
        <IconButton Icon={Icons.X} onPress={() => onDeletePress(guest)} />
    </GuestItemContainer>
);

export default GuestItem;
