import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Colors} from '@weddesign/enums';

type TProps = {
    value: boolean;
    onChange: () => void;
    onColor?: string;
    offColor?: string;
    label?: string;
    labelStyle?: any;
};

const CustomSwitch: React.FC<TProps> = ({
    value,
    onChange,
    onColor = Colors.PinkDark,
    offColor = Colors.LightGray,
    label = '',
    labelStyle,
}) => {
    const [isEnabled, setIsEnabled] = useState(value);

    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        setIsEnabled(value);
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [animatedValue, value]);

    const handleToggle = () => {
        setIsEnabled(!isEnabled);
        onChange();
    };

    const moveToggle = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 22],
    });

    const color = isEnabled ? onColor : offColor;

    return (
        <View style={styles.container}>
            {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableOpacity onPress={handleToggle} activeOpacity={1}>
                <View style={[styles.toggleContainer, {backgroundColor: color}]}>
                    <Animated.View
                        style={[styles.toggleWheelStyle, {marginLeft: moveToggle}]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CustomSwitch;
