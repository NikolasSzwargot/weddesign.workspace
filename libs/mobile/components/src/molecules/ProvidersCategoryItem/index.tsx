import React from 'react';
import {ColumnTextContainer, Container, RowTextContainer} from './styles';
import IconDot from '../../atoms/IconDot';
import {Text} from '@weddesign/themes';
import {Icons} from '@weddesign/assets';
import {getProviderCategoryIconAndColor} from './getProviderCategoryIconAndColor';
import {CategoryToSummaryDto} from '@shared/dto';

type CategoryItemProps = {
    category: CategoryToSummaryDto;
    inDatabaseLabel: string;
    reservedLabel: string;
    onPress: () => void;
    onLongPress: (category: CategoryToSummaryDto) => void;
};

const ProvidersCategoryItem: React.FC<CategoryItemProps> = ({
    category,
    inDatabaseLabel,
    reservedLabel,
    onPress,
    onLongPress,
}) => {
    const {icon, color} = getProviderCategoryIconAndColor(category.iconId);

    return (
        <Container onPress={onPress} onLongPress={() => onLongPress(category)}>
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
    );
};

export default ProvidersCategoryItem;
