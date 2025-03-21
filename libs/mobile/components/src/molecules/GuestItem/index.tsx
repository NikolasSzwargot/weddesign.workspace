import React from 'react';
import {GuestItemContainer, GuestInfoContainer, GuestNameWrapper} from './styles';
import {GuestDto} from '@shared/dto';
import {Text} from '@weddesign/themes';
import {GuestStatusDot, IconButton} from '../../atoms';
import {Icons} from '@weddesign/assets';
import {TouchableOpacity} from 'react-native';

type GuestItemProps = {
    guest: GuestDto;
    onStatusPress: (guest: GuestDto) => void;
    onGuestPress: () => void;
    onDeletePress: (guest: GuestDto) => void;
};

const GuestItem = ({
    guest,
    onStatusPress,
    onGuestPress,
    onDeletePress,
}: GuestItemProps) => (
    <GuestItemContainer onPress={onGuestPress}>
        <GuestInfoContainer>
            <TouchableOpacity onPress={() => onStatusPress(guest)}>
                <GuestStatusDot status={guest.guestStatusId} />
            </TouchableOpacity>
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
