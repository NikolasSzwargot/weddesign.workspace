import React from 'react';
import { ErrorGeneral } from '@weddesign-mobile/components';
import { ErrorScreens } from '@weddesign/enums';

type ErrorPageProps = {
  screen?: ErrorScreens;
};
const ErrorPage = ({ screen }: ErrorPageProps) => {
  switch (screen) {
    case ErrorScreens.GENERAL:
      return <ErrorGeneral />;
  }
};

export default ErrorPage;
