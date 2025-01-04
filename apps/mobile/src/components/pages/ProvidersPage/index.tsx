import React from 'react';
import {ProvidersGrouped} from '@mobile/components';
import {ProvidersScreens} from '@weddesign/enums';

import ProvidersList from '../../organisms/Providers/ProvidersList';

type ProvidersPageProps = {
    screen?: ProvidersScreens;
};
const ProvidersPage = ({screen}: ProvidersPageProps) => {
    switch (screen) {
        case ProvidersScreens.GROUPED:
            return <ProvidersGrouped />;
        case ProvidersScreens.LIST:
            return <ProvidersList />;
        case ProvidersScreens.ADD:
            //@TODO: Change to screen with Form
            return <ProvidersGrouped />;
    }
};

export default ProvidersPage;
