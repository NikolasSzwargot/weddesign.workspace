import React, {useState, useRef} from 'react';
import {Animated, View, Text, TouchableWithoutFeedback} from 'react-native';
import {Container, Title, ContentWrapper, ArrowWrapper} from './styles';
import {Icons} from '@weddesign/assets';

interface ExpandableItemProps {
    title: string;
    children: React.ReactNode;
}

const ExpandableItem: React.FC<ExpandableItemProps> = ({title, children}) => {
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        setExpanded((prev) => !prev);

        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false, // We use false because height cannot use native driver
        }).start();
    };

    const arrowRotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'], // Rotate arrow right (collapsed) to down (expanded)
    });

    const contentHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // Replace 100 with the actual height of your content
    });

    return (
        <Container>
            <TouchableWithoutFeedback onPress={toggleExpand}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Title>{title}</Title>
                    <ArrowWrapper style={{transform: [{rotate: arrowRotation}]}}>
                        <Icons.ArrowRight />
                    </ArrowWrapper>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View style={{height: contentHeight, overflow: 'hidden'}}>
                <ContentWrapper>{children}</ContentWrapper>
            </Animated.View>
        </Container>
    );
};

export default ExpandableItem;
