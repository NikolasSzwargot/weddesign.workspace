import {Animated} from 'react-native';
import styles from './styles';
import {Colors} from '@weddesign/enums';

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

    const text1Style = {
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
    const text2Style = {
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
                style={[
                    {
                        fontWeight: 'bold',
                        color: Colors.Black,
                        position: 'absolute',
                        fontSize: fontSize1,
                    },
                    //@ts-expect-error this form works and is allowed by type, but build doesn't see it as correct one
                    text1Style,
                ]}
            >{`${current.toFixed(2)}${currency}`}</Animated.Text>
            <Animated.Text
                style={[
                    {
                        fontWeight: 600,
                        color: Colors.TextGrey,
                        position: 'absolute',
                        fontSize: fontSize2,
                    },
                    //@ts-expect-error this form works and is allowed by type, but build doesn't see it as correct one
                    text2Style,
                ]}
            >{`/ ${total.toFixed(2)}${currency}`}</Animated.Text>
        </Animated.View>
    );
};

export default BudgetFrame;
