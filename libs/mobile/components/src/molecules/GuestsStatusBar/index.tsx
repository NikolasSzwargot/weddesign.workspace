import React from 'react';
import {
    StatusBarContainer,
    StatusBarWrapper,
    StatusSegment,
    StatusText,
} from './styles';
import {Colors} from '@weddesign/enums';

type StatusBarProps = {
    created: number;
    invited: number;
    accepted: number;
    rejected: number;
    totalGuests: number;
    confirmationText: string;
};

const GuestsStatusBar = ({
    created,
    invited,
    accepted,
    rejected,
    totalGuests,
    confirmationText,
}: StatusBarProps) => {
    const widthPercentages = {
        1: (created / totalGuests) * 100,
        2: (invited / totalGuests) * 100,
        3: (accepted / totalGuests) * 100,
        4: (rejected / totalGuests) * 100,
    };

    return (
        <StatusBarWrapper>
            <StatusBarContainer>
                <StatusSegment
                    widthPercentage={widthPercentages[3]}
                    color={Colors.StatusAccepted}
                />
                <StatusSegment
                    widthPercentage={widthPercentages[2]}
                    color={Colors.StatusInvited}
                />
                <StatusSegment
                    widthPercentage={widthPercentages[4]}
                    color={Colors.StatusRejected}
                />
                <StatusSegment
                    widthPercentage={widthPercentages[1]}
                    color={Colors.StatusCreated}
                />
            </StatusBarContainer>
            <StatusText>{confirmationText}</StatusText>
        </StatusBarWrapper>
    );
};

export default GuestsStatusBar;
