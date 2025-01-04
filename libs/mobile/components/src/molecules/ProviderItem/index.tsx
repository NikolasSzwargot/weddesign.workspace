import React, {useState, useRef, useCallback} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {Icons} from '@weddesign/assets';
import {
    Container,
    Header,
    ArrowWrapper,
    DetailsWrapper,
    IconRow,
    IconWrapper,
    DetailsRow,
    HeaderIcon,
    HeaderIconRow,
    ReservedWrapper,
} from './styles';
import {ProviderDto} from '@shared/dto';
import {getProviderCategoryIconAndColor} from '../ProvidersCategoryItem/getProviderCategoryIconAndColor';
import {IconDot} from '../../atoms';
import {Text} from '@weddesign/themes';

type ProviderItemProps = {
    provider: ProviderDto;
    categoryIconId: number;
    currency: string;
    onProviderPress: () => void;
    onDeletePress: (provider: ProviderDto) => void;
};

const ProviderItem = ({
    provider,
    categoryIconId,
    currency,
    onProviderPress,
    onDeletePress,
}: ProviderItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    const {icon, color} = getProviderCategoryIconAndColor(categoryIconId);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);

        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const arrowRotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const animatedContentHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            0,
            provider.phoneNumber ||
            provider.email ||
            provider.description ||
            provider.instagram ||
            provider.website ||
            provider.amount
                ? contentHeight
                : 0,
        ],
    });

    const onContentLayout = useCallback(
        (event: any) => {
            const {height} = event.nativeEvent.layout;
            if (height !== contentHeight) {
                setContentHeight(height);
            }
        },
        [contentHeight],
    );

    return (
        <Container>
            <TouchableOpacity onPress={onProviderPress}>
                <Header>
                    <IconDot color={color} Icon={icon} />
                    <Text.Bold style={{flex: 1, marginLeft: 20}}>
                        {provider.name}
                    </Text.Bold>

                    <HeaderIconRow>
                        {provider.isReserved && (
                            <ReservedWrapper>
                                <Icons.ProviderReserved />
                            </ReservedWrapper>
                        )}

                        <HeaderIcon onPress={() => onDeletePress(provider)}>
                            <Icons.X />
                        </HeaderIcon>
                        <ArrowWrapper style={{transform: [{rotate: arrowRotation}]}}>
                            <HeaderIcon onPress={toggleExpand}>
                                <Icons.ArrowRightGray width={20} height={20} />
                            </HeaderIcon>
                        </ArrowWrapper>
                    </HeaderIconRow>
                </Header>
            </TouchableOpacity>

            <Animated.View
                style={{
                    height: animatedContentHeight,
                    overflow: 'hidden',
                }}
            >
                <DetailsWrapper onLayout={onContentLayout}>
                    <DetailsRow>
                        {provider.phoneNumber && (
                            <Text.Regular size={14}>
                                {provider.phoneNumber}
                            </Text.Regular>
                        )}
                        {provider.email && (
                            <Text.Regular size={14}>{provider.email}</Text.Regular>
                        )}
                    </DetailsRow>

                    {provider.description && (
                        <Text.Regular size={14} style={{paddingBottom: 5}}>
                            {provider.description}
                        </Text.Regular>
                    )}
                    <IconWrapper>
                        <IconRow>
                            {provider.instagram && (
                                <TouchableOpacity
                                    onPress={() => console.log('Open instagram')}
                                >
                                    <Icons.Instagram />
                                </TouchableOpacity>
                            )}

                            {provider.website && (
                                <TouchableOpacity
                                    onPress={() => console.log('Open website')}
                                >
                                    <Icons.Website />
                                </TouchableOpacity>
                            )}

                            {provider.amount && (
                                <Text.Regular size={14}>
                                    {provider.amount} {currency}
                                </Text.Regular>
                            )}
                        </IconRow>
                    </IconWrapper>
                </DetailsWrapper>
            </Animated.View>
        </Container>
    );
};

export default ProviderItem;
