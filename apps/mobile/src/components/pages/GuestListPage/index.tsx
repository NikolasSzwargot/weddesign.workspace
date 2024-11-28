import React from 'react';
import {GuestList} from '@mobile/components';
import {GuestsScreens} from '@weddesign/enums';

type guestsPageProps = {
    screen?: GuestsScreens;
};
const GuestListPage = ({screen}: guestsPageProps) => {
    return <GuestList />;
};

export default GuestListPage;
