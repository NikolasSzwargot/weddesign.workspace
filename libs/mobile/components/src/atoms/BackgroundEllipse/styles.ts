import styled from 'styled-components/native';
import {View} from 'react-native';
import {Colors} from '@weddesign/enums';

export const Ellipse = styled(View)`
    position: absolute;
    width: 120%;
    height: 80%;
    background-color: ${Colors.Pink};
    border-radius: 210px;
    top: -53%;
    z-index: -1;
`;
