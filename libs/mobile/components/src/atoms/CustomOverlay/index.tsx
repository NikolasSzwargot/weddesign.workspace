import {Overlay} from 'react-native-elements';
import {styles} from './styles';
import {View} from 'react-native';

type CustomOverlayProps = {
    isVisible: boolean;
    onBackdropPress?: () => void;
    children?: React.ReactNode;
    variant?: 'center' | 'bottom';
};

const CustomOverlay = ({
    isVisible,
    onBackdropPress,
    children,
    variant = 'bottom',
}: CustomOverlayProps) => {
    const fullScreen = variant === 'center';
    const containerStyle =
        variant === 'bottom'
            ? styles.bottomContentContainer
            : styles.centerContentContainer;

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            overlayStyle={styles.overlayStyle}
            animationType={'fade'}
            statusBarTranslucent={true}
            backdropStyle={styles.backdropStyle}
            fullScreen={fullScreen}
        >
            <View style={containerStyle}>{children}</View>
        </Overlay>
    );
};

export default CustomOverlay;
