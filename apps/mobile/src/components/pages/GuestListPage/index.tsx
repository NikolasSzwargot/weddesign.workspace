import React from 'react';
import {GuestList} from '@mobile/components';
import {GuestsScreens} from '@weddesign/enums';

import GuestForm from '../../organisms/GuestList/GuestForm';

type guestsPageProps = {
    screen?: GuestsScreens;
};
const GuestListPage = ({screen}: guestsPageProps) => {
    switch (screen) {
        case GuestsScreens.LIST:
            return <GuestList />;
        case GuestsScreens.ADD:
            return <GuestForm />;
    }
};

export default GuestListPage;
