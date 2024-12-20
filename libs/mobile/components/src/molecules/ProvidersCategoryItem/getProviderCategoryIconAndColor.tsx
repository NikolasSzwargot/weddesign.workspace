import {SvgProps} from 'react-native-svg';
import {Icons} from '@weddesign/assets';
import {Colors} from '@weddesign/enums';
import React from 'react';

export const getProviderCategoryIconAndColor = (id: number) => {
    const iconColorMap: Record<number, {icon: React.FC<SvgProps>; color: Colors}> = {
        1: {icon: Icons.Coffee, color: Colors.StatusAccepted},
        2: {icon: Icons.Map, color: Colors.StatusAccepted},
        3: {icon: Icons.Decors, color: Colors.StatusAccepted},
        4: {icon: Icons.Putus, color: Colors.StatusAccepted},
        5: {icon: Icons.Camera, color: Colors.StatusInvited},
        6: {icon: Icons.Music, color: Colors.StatusInvited},
        7: {icon: Icons.Confetti, color: Colors.StatusInvited},
        8: {icon: Icons.Clip, color: Colors.StatusInvited},
        9: {icon: Icons.Dress, color: Colors.PinkLightest},
        10: {icon: Icons.Camera, color: Colors.PinkLightest},
        11: {icon: Icons.Scizzors, color: Colors.PinkLightest},
        12: {icon: Icons.Makeup, color: Colors.PinkLightest},
        13: {icon: Icons.House, color: Colors.LightBlue},
        14: {icon: Icons.File, color: Colors.LightBlue},
        15: {icon: Icons.Car, color: Colors.LightBlue},
        16: {icon: Icons.Question, color: Colors.LightBlue},
    };

    return iconColorMap[id] || {icon: Icons.Question, color: Colors.LightBlue};
};
