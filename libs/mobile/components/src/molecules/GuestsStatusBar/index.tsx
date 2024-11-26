import React from 'react';
import {
    StatusBarContainer,
    StatusBarWrapper,
    StatusSegment,
    StatusText,
} from './styles';

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
                    color="#b6d79d"
                />
                <StatusSegment
                    widthPercentage={widthPercentages[2]}
                    color="#f6d36f"
                />
                <StatusSegment
                    widthPercentage={widthPercentages[4]}
                    color="#ed6055"
                />
                <StatusSegment
                    widthPercentage={widthPercentages[1]}
                    color="#dadada"
                />
            </StatusBarContainer>
            <StatusText>{confirmationText}</StatusText>
        </StatusBarWrapper>
    );
};

export default GuestsStatusBar;
