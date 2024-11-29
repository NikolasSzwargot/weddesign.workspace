import styled from 'styled-components/native';
import {View} from 'react-native';
import {Colors} from '@weddesign/enums';

export const Ellipse = styled(View)`
    position: absolute;
    width: 150%;
    height: 150%;
    background-color: ${Colors.LightBlue};
    border-radius: 280px;
    top: -131%;
    z-index: -1;
`;
