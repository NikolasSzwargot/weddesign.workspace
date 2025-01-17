import React from 'react';
import {GuestList} from '@weddesign-mobile/components';
import {GuestsScreens} from '@weddesign/enums';

import GuestForm from '../../organisms/GuestList/GuestForm';
import GuestFilter from '../../organisms/GuestList/GuestFilter';

type guestsPageProps = {
    screen?: GuestsScreens;
};
const GuestListPage = ({screen}: guestsPageProps) => {
    switch (screen) {
        case GuestsScreens.LIST:
            return <GuestList />;
        case GuestsScreens.ADD:
            return <GuestForm />;
        case GuestsScreens.FILTER:
            return <GuestFilter />;
    }
};

export default GuestListPage;
