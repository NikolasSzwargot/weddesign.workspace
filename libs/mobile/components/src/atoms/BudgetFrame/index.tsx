import {Animated} from 'react-native';
import styles from './styles';
import {Colors} from '@weddesign/enums';

type BudgetFrameProps = {
    total: number;
    current: number;
    currency: string;
    scrollData: Animated.Value;
};

const BudgetFrame = ({total, current, currency, scrollData}: BudgetFrameProps) => {
    const rectangleHeight = scrollData.interpolate({
        inputRange: [0, 150],
        outputRange: [120, 40],
        extrapolate: 'clamp',
    });

    const text1Style = {
        transform: [
            {
                translateX: scrollData.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -55],
                    extrapolate: 'clamp',
                    easing: (x) => 1 - Math.pow(1 - x, 3),
                }),
            },
            {
                translateY: scrollData.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-20, 0],
                    extrapolate: 'clamp',
                    easing: (x) => x * x * x,
                }),
            },
        ],
        fontSize: scrollData.interpolate({
            inputRange: [0, 80],
            outputRange: [40, 17],
            extrapolate: 'clamp',
        }),
    };
    const text2Style = {
        transform: [
            {
                translateX: scrollData.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 55], // Move right for horizontal layout
                    extrapolate: 'clamp',
                    easing: (x) => 1 - Math.pow(1 - x, 3),
                }),
            },
            {
                translateY: scrollData.interpolate({
                    inputRange: [0, 100],
                    outputRange: [20, 0], // Move down for vertical layout
                    extrapolate: 'clamp',
                    easing: (x) => x * x * x,
                }),
            },
        ],
        fontSize: scrollData.interpolate({
            inputRange: [0, 80],
            outputRange: [24, 17],
            extrapolate: 'clamp',
        }),
    };

    return (
        <Animated.View style={[styles.MainView, {height: rectangleHeight}]}>
            <Animated.Text
                style={[
                    {
                        fontWeight: 'bold',
                        color: Colors.Black,
                        position: 'absolute',
                    },
                    text1Style,
                ]}
            >{`${current}${currency}`}</Animated.Text>
            <Animated.Text
                style={[
                    {
                        fontWeight: 600,
                        color: Colors.TextGrey,
                        position: 'absolute',
                    },
                    text2Style,
                ]}
            >{`/ ${total}${currency}`}</Animated.Text>
        </Animated.View>
    );
};

export default BudgetFrame;
