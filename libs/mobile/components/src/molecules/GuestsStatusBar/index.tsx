import React from 'react';
import { Guest } from '@weddesign/types';
import { StatusBarContainer, StatusBarWrapper, StatusSegment, StatusText } from './styles';

type StatusBarProps = {
  guests: Guest[];
};

const GuestsStatusBar = ({guests}: StatusBarProps) => {
  const totalGuests = guests.length;
  const countByStatus = {
    1: guests.filter(guest => guest.statusId === 1).length,
    2: guests.filter(guest => guest.statusId === 2).length,
    3: guests.filter(guest => guest.statusId === 3).length,
    4: guests.filter(guest => guest.statusId === 4).length,
  };

  const widthPercentages = {
    1: (countByStatus[1] / totalGuests) * 100,
    2: (countByStatus[2] / totalGuests) * 100,
    3: (countByStatus[3] / totalGuests) * 100,
    4: (countByStatus[4] / totalGuests) * 100,
  };

  return (
      <StatusBarWrapper>
          <StatusBarContainer>
              <StatusSegment widthPercentage={widthPercentages[2]} color="#b6d79d" />
              <StatusSegment widthPercentage={widthPercentages[1]} color="#f6d36f" />
              <StatusSegment widthPercentage={widthPercentages[3]} color="#ed6055" />
              <StatusSegment widthPercentage={widthPercentages[4]} color="#dadada" />
          </StatusBarContainer>
         <StatusText>
           {countByStatus[2]} na {totalGuests} gości potwierdziło swoje przybycie
         </StatusText>
      </StatusBarWrapper>
  );
};

export default GuestsStatusBar;
