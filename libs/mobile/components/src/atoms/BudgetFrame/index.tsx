import {Text} from '@weddesign/themes';
import {MainView} from './styles';
import {useTranslation} from 'react-i18next';

type BudgetFrameProps = {
    total: number;
    current: number;
};

const BudgetFrame = ({current = 70000, total = 10000}: BudgetFrameProps) => {
    const {t} = useTranslation('budget');
    return (
        <MainView>
            <Text.Bold size={40}>{`${current} ${t('currency')}`}</Text.Bold>
            <Text.SemiBold size={24}>{`/ ${total} ${t('currency')}`}</Text.SemiBold>
        </MainView>
    );
};

export default BudgetFrame;
