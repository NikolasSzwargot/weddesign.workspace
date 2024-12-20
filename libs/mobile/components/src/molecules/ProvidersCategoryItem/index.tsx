import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ColumnTextContainer, Container, RowTextContainer} from './styles';
import IconDot from '../../atoms/IconDot';
import {Text} from '@weddesign/themes';
import {Icons} from '@weddesign/assets';
import {getProviderCategoryIconAndColor} from './getProviderCategoryIconAndColor';

type Category = {
    id: number;
    iconId: number;
    name: string;
    inDatabase: number;
    reserved: number;
};

type CategoryItemProps = {
    category: Category; //@TODO: Zastąpić DTO z shared
    inDatabaseLabel: string;
    reservedLabel: string;
    onPress: () => void;
};

const ProvidersCategoryItem: React.FC<CategoryItemProps> = ({
    category,
    inDatabaseLabel,
    reservedLabel,
    onPress,
}) => {
    const {icon, color} = getProviderCategoryIconAndColor(category.iconId);

    return (
        <TouchableOpacity onPress={onPress}>
            <Container>
                <IconDot Icon={icon} color={color}></IconDot>

                <ColumnTextContainer>
                    <Text.Bold size={20}>{category.name}</Text.Bold>
                    <RowTextContainer>
                        <Text.SemiBold size={16}>
                            {inDatabaseLabel} {category.inDatabase}
                        </Text.SemiBold>
                        <Text.SemiBold size={16}>
                            {reservedLabel} {category.reserved}
                        </Text.SemiBold>
                    </RowTextContainer>
                </ColumnTextContainer>
                <Icons.ArrowRight />
            </Container>
        </TouchableOpacity>
    );
};

export default ProvidersCategoryItem;
