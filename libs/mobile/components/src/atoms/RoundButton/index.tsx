import {ButtonContainer, Label, OpacityContainer} from './styles';
import {Colors} from '@weddesign/enums';

type RoundButtonProps = {
    color?: Colors;
    label: string;
    onPress?: () => void;
};

const RoundButton = ({color, label, onPress = () => {}}: RoundButtonProps) => {
    return (
        <OpacityContainer>
            <ButtonContainer color={color} onPress={onPress}></ButtonContainer>
            <Label color={color}>{label}</Label>
        </OpacityContainer>
    );
};

export default RoundButton;
