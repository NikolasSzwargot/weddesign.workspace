import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {View} from 'react-native';
import styles from './styles';

export type DropdownData<T> = {
    label: string;
    value: T;
};

type LanguageDropdownProps<T> = {
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    data: DropdownData<T>[];
};

export const DropdownSelect = <T,>({
    value,
    onChange,
    placeholder,
    data,
}: LanguageDropdownProps<T>) => {
    return (
        <View style={styles.dropdownContainer}>
            <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item) => onChange(item.value)}
                placeholder={placeholder}
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                containerStyle={styles.dropdownListContainer}
                itemTextStyle={styles.itemTextStyle}
                maxHeight={200}
            />
        </View>
    );
};
