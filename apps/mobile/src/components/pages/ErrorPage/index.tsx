import React from 'react';
import {GuestList} from '@mobile/components';
import {ErrorScreens} from '@weddesign/enums';

type ErrorPageProps = {
    screen?: ErrorScreens;
};
const ErrorPage = ({screen}: ErrorPageProps) => {
    switch (screen) {
        case ErrorScreens.GENERAL:
            return <GuestList />;
    }
};

export default ErrorPage;
