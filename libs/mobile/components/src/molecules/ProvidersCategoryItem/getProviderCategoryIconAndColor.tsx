import {SvgProps} from 'react-native-svg';
import {Icons} from '@weddesign/assets';
import {Colors} from '@weddesign/enums';
import React from 'react';

export const getProviderCategoryIconAndColor = (id: number) => {
    const iconColorMap: Record<number, {icon: React.FC<SvgProps>; color: Colors}> = {
        1: {icon: Icons.Map, color: Colors.StatusAccepted},
        2: {icon: Icons.Putus, color: Colors.StatusAccepted},
        3: {icon: Icons.Camera, color: Colors.StatusInvited},
        4: {icon: Icons.Music, color: Colors.StatusInvited},
        5: {icon: Icons.Dress, color: Colors.PinkLightest},
    };

    return iconColorMap[id] || {icon: Icons.Question, color: Colors.LightBlue};
};
