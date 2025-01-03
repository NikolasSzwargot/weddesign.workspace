import React from 'react';
import {Defs, LinearGradient, Rect, Stop, Svg} from 'react-native-svg';
import {EllipseContainer} from './styles';
import {GradientColor} from '@weddesign/types';
import {variantDefaults} from './variants';

type EllipseVariant = 'home' | 'guests' | 'budget' | 'providers';

type EllipseProps = {
    variant?: EllipseVariant;
    rx?: number;
    ry?: number;
    gradientColors?: GradientColor[];
    angle?: number;
};

const Ellipse = ({
    variant = 'home',
    rx,
    ry,
    gradientColors,
    angle,
    ...props
}: EllipseProps) => {
    const calculateGradientDirection = (angle: number) => {
        const radian = (angle * Math.PI) / 180;
        return {
            x2: 0.5 + Math.cos(radian) / 2,
            y2: 0.5 + Math.sin(radian) / 2,
            x1: 0.5 - Math.cos(radian) / 2,
            y1: 0.5 - Math.sin(radian) / 2,
        };
    };

    const config = variantDefaults[variant];
    const effectiveAngle = angle ? angle : config.angle ?? 90;
    const {x1, y1, x2, y2} = calculateGradientDirection(effectiveAngle);

    return (
        <EllipseContainer variant={variant} {...props}>
            <Svg width="100%" height="100%">
                <Defs>
                    <LinearGradient id="gradient" x1={x1} y1={y1} x2={x2} y2={y2}>
                        {(gradientColors || config.gradientColors).map(
                            (stop, index) => (
                                <Stop
                                    key={index}
                                    offset={stop.offset}
                                    stopColor={stop.color}
                                    stopOpacity={stop.opacity ?? 1}
                                />
                            ),
                        )}
                    </LinearGradient>
                </Defs>
                <Rect
                    width="100%"
                    height="100%"
                    rx={rx || config.rx}
                    ry={ry || config.ry}
                    fill="url(#gradient)"
                />
            </Svg>
        </EllipseContainer>
    );
};

export default Ellipse;
