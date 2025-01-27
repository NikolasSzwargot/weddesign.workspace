import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Slider} from 'react-native-elements';
import {styles} from './styles';
import {Colors} from '@weddesign/enums';

type CustomSliderProps = {
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number) => void;
    initialValue?: number;
    label?: string;
    unit?: string;
    value?: number;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    initialValue = 0,
    label = 'Ustaw limit',
    unit = '',
    value: externalValue,
}) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (externalValue !== undefined && externalValue !== value) {
            setValue(externalValue);
        }
    }, [externalValue, value]);

    const handleValueChange = (sliderValue: number) => {
        setValue(sliderValue);
        if (onValueChange) {
            onValueChange(sliderValue);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>
                    {(value ?? 0).toLocaleString()} {unit} - {max.toLocaleString()}{' '}
                    {unit}
                </Text>
            </View>
            <Slider
                value={value ?? 0}
                onValueChange={handleValueChange}
                minimumValue={min}
                maximumValue={max}
                step={step}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor={Colors.WhiteDark}
                maximumTrackTintColor={Colors.LightGray}
                thumbTintColor={Colors.Black}
            />
        </View>
    );
};

export default CustomSlider;
