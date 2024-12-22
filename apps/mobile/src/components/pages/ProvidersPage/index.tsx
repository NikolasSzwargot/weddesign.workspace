import React from 'react';
import {ProvidersGrouped} from '@mobile/components';
import {ProvidersScreens} from '@weddesign/enums';

import ProvidersList from '../../organisms/Providers/ProvidersList';
import ProvidersForm from '../../organisms/Providers/ProvidersForm';

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
            return <ProvidersForm />;
    }
};

export default ProvidersPage;
