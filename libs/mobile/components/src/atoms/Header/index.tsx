import {HeaderWrapper, MoreIconWrapper, Title} from './styles';
import {Icons, MockImages} from '@weddesign/assets';
import {Image} from 'react-native-elements';

const Header = () => {
    console.log('mock: ', MockImages.Profile);
    return (
        <HeaderWrapper>
            <MoreIconWrapper>
                <Icons.More />
            </MoreIconWrapper>
            <Title>{'Weddesign'}</Title>
            <Image source={MockImages.Profile} />
        </HeaderWrapper>
    );
};

export default Header;
