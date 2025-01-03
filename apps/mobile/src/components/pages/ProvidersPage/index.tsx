import React from 'react';
import {ProvidersGrouped} from '@mobile/components';
import {ProvidersScreens} from '@weddesign/enums';

type ProvidersPageProps = {
    screen?: ProvidersScreens;
};
const ProvidersPage = ({screen}: ProvidersPageProps) => {
    switch (screen) {
        case ProvidersScreens.GROUPED:
            return <ProvidersGrouped />;
        case ProvidersScreens.LIST:
            //@TODO: zamienić na stronę ze szczegółami grupy
            return <ProvidersGrouped />;
        case ProvidersScreens.ADD:
            //@TODO: zamienić na stronę z formularzem dodawania podwykonawcy
            return <ProvidersGrouped />;
    }
};

export default ProvidersPage;
