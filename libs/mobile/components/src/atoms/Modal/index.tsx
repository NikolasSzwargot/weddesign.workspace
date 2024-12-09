import React, {useRef, useEffect, useState} from 'react';
import {Animated, Easing, LayoutChangeEvent} from 'react-native';
import {CustomOverlay} from '../../atoms';

type ModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    children: React.ReactNode;
};

const Modal = ({isVisible, onBackdropPress, children}: ModalProps) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const animationDistance = contentHeight || 300;
        const duration = 245;

        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: animationDistance,
                duration,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, contentHeight, slideAnim]);

    const handleLayout = (event: LayoutChangeEvent) => {
        const {height} = event.nativeEvent.layout;
        setContentHeight(height);
    };

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
                onLayout={handleLayout}
            >
                {children}
            </Animated.View>
        </CustomOverlay>
    );
};

export default Modal;
