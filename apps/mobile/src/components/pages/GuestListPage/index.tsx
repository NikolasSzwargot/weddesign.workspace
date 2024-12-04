import React from 'react';
import {GuestList} from '@mobile/components';
import {GuestsScreens} from '@weddesign/enums';

type guestsPageProps = {
    screen?: GuestsScreens;
};
const GuestListPage = ({screen}: guestsPageProps) => {
    switch (screen) {
        case GuestsScreens.LIST:
            return <GuestList />;
        case GuestsScreens.ADD:
            return <GuestList />;
    }
};

export default GuestListPage;
