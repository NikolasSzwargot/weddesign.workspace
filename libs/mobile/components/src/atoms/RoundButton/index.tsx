import {ButtonContainer, OpacityContainer} from './styles';
import {Colors} from '@weddesign/enums';
import {Text} from '@weddesign/themes';

type RoundButtonProps = {
    color?: Colors;
    label: string;
    onPress?: () => void;
};

const RoundButton = ({color, label, onPress = () => {}}: RoundButtonProps) => {
    return (
        <OpacityContainer>
            <ButtonContainer color={color} onPress={onPress}></ButtonContainer>
            <Text.Regular size={11} style={{color: color ?? Colors.Black}}>
                {label}
            </Text.Regular>
        </OpacityContainer>
    );
};

export default RoundButton;
