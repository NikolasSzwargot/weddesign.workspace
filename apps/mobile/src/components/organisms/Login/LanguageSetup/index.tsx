import {ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';

import {Container, ProgressLogoContainer} from '../styles';

const LanguageSetup = () => {
    return (
        <Container>
            <ProgressLogoContainer>
                <ProgressBar progress={1} />
                <Images.Logo />
            </ProgressLogoContainer>
        </Container>
    );
};

export default LanguageSetup;
