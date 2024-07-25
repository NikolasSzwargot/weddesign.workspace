import styled from 'styled-components/native';
import {RoundButton, BackgroundEllipse} from '@weddesign/components';
import {Colors} from '@weddesign/enums';

const Home = () => {
    return (
        <Container>
            <BackgroundEllipse />
            <ButtonRow>
                <RoundButton color={Colors.PinkLight} label="Lista gości" />
                <RoundButton color={Colors.PinkLighter} label="Budżet" />
                <RoundButton color={Colors.PinkLightest} label="Podwykonawcy" />
                <RoundButton color={Colors.PinkDark} label="Zadania" />
            </ButtonRow>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-vertical: 20px;
`;

export default Home;
