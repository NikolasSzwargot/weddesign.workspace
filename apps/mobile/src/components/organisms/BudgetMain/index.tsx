import React from 'react';
import {DudgetEllipse, BudgetFrame, ProgressBar} from '@weddesign/components';
import {Colors} from '@weddesign/enums';
import {Header} from '@weddesign/components';
import { Text } from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {} from '@mobile/mocks';
import {} from '@weddesign/utils';

import {
  Container,
  BudgetMainWrapper,
  BudgetMainFrame
} from './styles';

const BudgetMain = () => {
  const {t} = useTranslation('budget');
  const price= {
    total: 2137,
    current: 690,
  };

  return (
    <Container>
      <DudgetEllipse />
      <BudgetMainWrapper>
        <Header />
        <BudgetMainFrame>
          <BudgetFrame current={price.current} total={price.total} />
          <ProgressBar
            max ={price.total}
            progress = {price.current}
            backgroundColor ={Colors.LightGray}
            fillColor ={Colors.BananaGold}/>
          <Text.Regular size={16} style={{ textAlign: 'center' }}>{`${t(
            'mainProgressbarText', {percent: Math.round(100*price.current/price.total)}
          )}`}</Text.Regular>

        </BudgetMainFrame>
      </BudgetMainWrapper>
    </Container>
  );
};

export default BudgetMain;