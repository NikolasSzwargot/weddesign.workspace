import React from 'react';
import {
    StatusBarContainer,
    StatusBarWrapper,
    StatusSegment,
    StatusText,
} from './styles';
import {Colors} from '@weddesign/enums';
import {Statuses} from '@weddesign/types';

type StatusBarProps = {
    statuses: Statuses;
    totalGuests: number;
    confirmationText: string;
};

const GuestsStatusBar = ({
    statuses,
    totalGuests,
    confirmationText,
}: StatusBarProps) => {
    const widthPercentages = {
        1: (statuses.countCreated / totalGuests) * 100,
        2: (statuses.countInvited / totalGuests) * 100,
        3: (statuses.countAccepted / totalGuests) * 100,
        4: (statuses.countRejected / totalGuests) * 100,
    };

    const statusSegments = [
        {width: widthPercentages[3], color: Colors.StatusAccepted},
        {width: widthPercentages[2], color: Colors.StatusInvited},
        {width: widthPercentages[4], color: Colors.StatusRejected},
        {width: widthPercentages[1], color: Colors.StatusCreated},
    ];

    return (
        <StatusBarWrapper>
            <StatusBarContainer>
                {statusSegments.map((segment, index) => (
                    <StatusSegment
                        key={index}
                        widthPercentage={segment.width}
                        color={segment.color}
                    />
                ))}
            </StatusBarContainer>
            <StatusText>{confirmationText}</StatusText>
        </StatusBarWrapper>
    );
};

export default GuestsStatusBar;
