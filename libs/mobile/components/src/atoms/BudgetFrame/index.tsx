import {Animated, TextStyle} from 'react-native';
import styles from './styles';
import {Colors} from '@weddesign/enums';
import {formatNumberWithSpaces} from '@weddesign-mobile/utils';

type BudgetFrameProps = {
    total: number;
    current: number;
    currency?: string;
    scrollData?: Animated.Value;
};

const BudgetFrame = ({
    total,
    current,
    currency = '',
    scrollData,
}: BudgetFrameProps) => {
    const rectangleHeight = scrollData
        ? scrollData.interpolate({
              inputRange: [0, 150],
              outputRange: [120, 40],
              extrapolate: 'clamp',
          })
        : 40;

    const text1Style: Animated.WithAnimatedObject<TextStyle> = {
        transform: [
            {
                translateX: scrollData
                    ? scrollData.interpolate({
                          inputRange: [0, 100],
                          outputRange: [0, -55],
                          extrapolate: 'clamp',
                          easing: (x) => 1 - Math.pow(1 - x, 3),
                      })
                    : -55,
            },
            {
                translateY: scrollData
                    ? scrollData.interpolate({
                          inputRange: [0, 100],
                          outputRange: [-20, 0],
                          extrapolate: 'clamp',
                          easing: (x) => x * x * x,
                      })
                    : 0,
            },
        ],
    };
    const fontSize1 = scrollData
        ? scrollData.interpolate({
              inputRange: [0, 80],
              outputRange: [36, 17],
              extrapolate: 'clamp',
          })
        : 17;
    const text2Style: Animated.WithAnimatedObject<TextStyle> = {
        transform: [
            {
                translateX: scrollData
                    ? scrollData.interpolate({
                          inputRange: [0, 100],
                          outputRange: [0, 55],
                          extrapolate: 'clamp',
                          easing: (x) => 1 - Math.pow(1 - x, 3),
                      })
                    : 55,
            },
            {
                translateY: scrollData
                    ? scrollData.interpolate({
                          inputRange: [0, 100],
                          outputRange: [20, 0],
                          extrapolate: 'clamp',
                          easing: (x) => x * x * x,
                      })
                    : 0,
            },
        ],
    };
    const fontSize2 = scrollData
        ? scrollData.interpolate({
              inputRange: [0, 80],
              outputRange: [24, 17],
              extrapolate: 'clamp',
          })
        : 17;

    return (
        <Animated.View style={[styles.MainView, {height: rectangleHeight}]}>
            <Animated.Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                    {
                        fontWeight: 'bold',
                        color: Colors.Black,
                        position: 'absolute',
                        fontSize: fontSize1,
                    },
                    text1Style,
                ]}
            >{`${formatNumberWithSpaces(
                current.toFixed(2),
            )} ${currency}`}</Animated.Text>
            <Animated.Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                    {
                        fontWeight: 600,
                        color: Colors.TextGrey,
                        position: 'absolute',
                        fontSize: fontSize2,
                    },
                    text2Style,
                ]}
            >{`/ ${formatNumberWithSpaces(
                total.toFixed(2),
            )} ${currency}`}</Animated.Text>
        </Animated.View>
    );
};

export default BudgetFrame;
