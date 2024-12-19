import React from 'react';
import {TouchableOpacity} from 'react-native';
import {getProviderCategoryIconAndColor} from '@weddesign/utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container} from './styles';

type CategoryItemProps = {
    id: number;
    name: string;
    inDatabase: number;
    reserved: number;
    inDatabaseLabel: string;
    reservedLabel: string;
    onPress: () => void;
};

const ProvidersCategoryItem: React.FC<CategoryItemProps> = ({
    id,
    name,
    inDatabase,
    reserved,
    inDatabaseLabel,
    reservedLabel,
    onPress,
}) => {
    const {icon, color} = getProviderCategoryIconAndColor(id);

    return (
        <TouchableOpacity onPress={onPress}>
            <Container>
                <IconContainer backgroundColor={color}>
                    <Icon name={iconName} size={20} color="#000" />
                </IconContainer>
                <DetailsContainer>
                    <Name>{name}</Name>
                    <SubText>
                        {inDatabaseLabel}: {inDatabase} {reservedLabel}: {reserved}
                    </SubText>
                </DetailsContainer>
                <Arrow>›</Arrow>
            </Container>
        </TouchableOpacity>
    );
};

export default ProvidersCategoryItem;
