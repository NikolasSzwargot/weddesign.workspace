import React from 'react';
import {TouchableOpacity} from 'react-native';
import {getProviderCategoryIconAndColor} from '@weddesign/utils';
import {ColumnTextContainer, Container, RowTextContainer} from './styles';
import IconDot from '../../atoms/IconDot';
import {Text} from '@weddesign/themes';
import {Icons} from '@weddesign/assets';

type CategoryItemProps = {
    id: number; //@TODO: Pobierać z DTO
    name: string; //@TODO: Pobierać z DTO
    inDatabase: number; //@TODO: Pobierać z DTO
    reserved: number; //@TODO: Pobierać z DTO
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
                <IconDot Icon={icon} color={color}></IconDot>

                <ColumnTextContainer>
                    <Text.Bold size={20}>{name}</Text.Bold>
                    <RowTextContainer>
                        <Text.SemiBold size={16}>
                            {inDatabaseLabel} {inDatabase}
                        </Text.SemiBold>
                        <Text.SemiBold size={16}>
                            {reservedLabel} {reserved}
                        </Text.SemiBold>
                    </RowTextContainer>
                </ColumnTextContainer>
                <Icons.ArrowRight />
            </Container>
        </TouchableOpacity>
    );
};

export default ProvidersCategoryItem;
