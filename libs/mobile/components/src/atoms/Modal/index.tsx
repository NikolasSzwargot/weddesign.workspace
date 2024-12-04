import React, {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {CustomOverlay} from '../../atoms';

type ModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    children: React.ReactNode;
};

const Modal = ({isVisible, onBackdropPress, children}: ModalProps) => {
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 0,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, slideAnim]);

    return (
        <CustomOverlay
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            variant="bottom"
        >
            <Animated.View
                style={{
                    transform: [{translateY: slideAnim}],
                }}
            >
                {children}
            </Animated.View>
        </CustomOverlay>
    );
};

export default Modal;
