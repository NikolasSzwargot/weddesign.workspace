import {ActivityIndicator} from 'react-native';
import {LoadingWrapper} from './styles';
import {Text} from '@weddesign/themes';
import {Colors} from '@weddesign/enums';

type SpinnerProps = {
    color?: Colors;
    msg?: string;
};

const LoadingSpinner = ({color = Colors.PinkDark, msg = ''}: SpinnerProps) => {
    return (
        <LoadingWrapper>
            <ActivityIndicator size={55} color={color} />
            <Text.Regular>{msg}</Text.Regular>
        </LoadingWrapper>
    );
};

export default LoadingSpinner;
