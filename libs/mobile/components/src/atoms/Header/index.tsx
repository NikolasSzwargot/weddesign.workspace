import {HeaderWrapper, ItemWrapper, TitleWrapper} from './styles';
import {Icons} from '@weddesign/assets';
import {Text} from '@weddesign/themes';

const Header = () => {
    return (
        <HeaderWrapper>
            <ItemWrapper>
                <Icons.More />
            </ItemWrapper>
            <TitleWrapper>
                <Text.Bold size={20}>{'Weddesign'}</Text.Bold>
            </TitleWrapper>
            {/*@TODO: Fix images*/}
            <ItemWrapper>
                <Text.Regular>{''}</Text.Regular>
            </ItemWrapper>
        </HeaderWrapper>
    );
};

export default Header;
