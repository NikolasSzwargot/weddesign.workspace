import React from 'react';
import {categoryData} from '@weddesign/types';
import {Colors} from '@weddesign/enums';
import {Icons} from '@weddesign/assets';
import {SvgProps} from 'react-native-svg';

const categoryDataMap: {[key: string]: {color: Colors; icon: React.FC<SvgProps>}} = {
    1: {color: Colors.StatusAccepted, icon: Icons.Coffee},
    2: {color: Colors.StatusAccepted, icon: Icons.Map},
    3: {color: Colors.StatusAccepted, icon: Icons.Decors},
    4: {color: Colors.StatusAccepted, icon: Icons.Putus},
    5: {color: Colors.StatusInvited, icon: Icons.Camera},
    6: {color: Colors.StatusInvited, icon: Icons.Music},
    7: {color: Colors.StatusInvited, icon: Icons.Confetti},
    8: {color: Colors.StatusInvited, icon: Icons.Gift},
    9: {color: Colors.PinkLightest, icon: Icons.Dress},
    10: {color: Colors.PinkLightest, icon: Icons.Camera},
    11: {color: Colors.PinkLightest, icon: Icons.Earrings},
    12: {color: Colors.PinkLightest, icon: Icons.Rings},
    13: {color: Colors.LightBlue, icon: Icons.House},
    14: {color: Colors.LightBlue, icon: Icons.File},
    15: {color: Colors.LightBlue, icon: Icons.Car},
    16: {color: Colors.LightBlue, icon: Icons.Question},
};

export const getBudgetCategoryData = (catId: number): categoryData => {
    return categoryDataMap[catId];
};
