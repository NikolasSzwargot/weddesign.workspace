import React from 'react';
import {Login} from '@mobile/components';
import {LoginScreens} from '@weddesign/enums';
import {CreateUserDto} from '@shared/dto';
import {FormProvider, useForm} from 'react-hook-form';
import {DateType} from 'react-native-ui-datepicker';

import LanguageSetup from '../../organisms/Login/LanguageSetup';
import Register from '../../organisms/Login/Register';
import BrideGroomSetup from '../../organisms/Login/BrideGroomSetup';
import DateSetup from '../../organisms/Login/DateSetup';

type loginPageProps = {
    screen?: LoginScreens;
};

export type RegisterFormType = {
    firstNameBride: string;
    firstNameGroom: string;
    lastName: string;
    weddingDate: DateType;
    language: string;
    email: string;
    password: string;
};

const defaultUserValues: RegisterFormType = {
    firstNameBride: '',
    firstNameGroom: '',
    lastName: 'mock',
    weddingDate: new Date(),
    language: 'en',
    email: '',
    password: '',
} as const;

export const LoginPage = ({screen}: loginPageProps) => {
    const methods = useForm<CreateUserDto>({defaultValues: {...defaultUserValues}});

    switch (screen) {
        case LoginScreens.LANGUAGE:
            return (
                <FormProvider {...methods}>
                    <LanguageSetup />
                </FormProvider>
            );
        case LoginScreens.REGISTER:
            return (
                <FormProvider {...methods}>
                    <Register />
                </FormProvider>
            );
        case LoginScreens.NAMES:
            return (
                <FormProvider {...methods}>
                    <BrideGroomSetup />
                </FormProvider>
            );
        case LoginScreens.DATE:
            return (
                <FormProvider {...methods}>
                    <DateSetup />
                </FormProvider>
            );
        default:
            return <Login />;
    }
};
