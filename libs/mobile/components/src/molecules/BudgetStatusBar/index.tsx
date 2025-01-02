import React from 'react';
import {Colors} from '@weddesign/enums';
import {StatusBarContainer, StatusBarWrapper, StatusSegment} from './styles';
import {MainLimitProps} from '@weddesign/types';

const BudgetStatusBar = ({totalPlanned, paid, notPaid, limit}: MainLimitProps) => {
    const widthPercentages = {
        1: (paid / limit) * 100,
        2: (notPaid / limit) * 100,
        3: ((limit - totalPlanned) / limit) * 100,
    };

    const statusSegments = [
        {width: widthPercentages[1], color: Colors.StatusAccepted},
        {width: widthPercentages[2], color: Colors.StatusInvited},
        {width: widthPercentages[3], color: Colors.LightGray},
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
        </StatusBarWrapper>
    );
};

export default BudgetStatusBar;
