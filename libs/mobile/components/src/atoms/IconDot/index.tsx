import React from 'react';
import {Colors} from '@weddesign/enums';
import {SvgProps} from 'react-native-svg';
import {Dot} from './styles';

type IconDotProps = {
    color: Colors;
    Icon: React.FC<SvgProps>;
};

const IconDot = ({color, Icon}: IconDotProps) => {
    return (
        <Dot color={color}>
            <Icon />
        </Dot>
    );
};

export default IconDot;
