import React from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {getProviderCategoryIconAndColor} from '../../molecules/ProvidersCategoryItem/getProviderCategoryIconAndColor';
import IconDot from '../IconDot';
import {styles} from './styles';

type ProviderIconDropdownProps = {
    value: number;
    onSelect: (value: number) => void;
};

const ProviderIconDropdown = ({value, onSelect}: ProviderIconDropdownProps) => {
    const data = Array.from({length: 16}, (_, i) => {
        const id = i + 1;
        const {icon: Icon, color} = getProviderCategoryIconAndColor(id);

        return {
            label: '',
            value: id,
            icon: <IconDot color={color} Icon={Icon} />,
        };
    });

    return (
        <Dropdown
            style={styles.dropdown}
            data={data}
            placeholder=""
            //@ts-expect-error Typescript doesn't understand his new library, but the component is working properly
            value={value}
            onChange={(item) => {
                onSelect(item.value);
            }}
            renderLeftIcon={() => {
                if (value) {
                    const {icon: Icon, color} =
                        getProviderCategoryIconAndColor(value);
                    return <IconDot color={color} Icon={Icon} />;
                }
                return null;
            }}
            renderItem={(item) => (
                <View style={styles.iconContainer}>{item.icon}</View>
            )}
            maxHeight={200}
            dropdownPosition={'bottom'}
        />
    );
};

export default ProviderIconDropdown;
