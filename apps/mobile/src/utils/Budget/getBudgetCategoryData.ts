import React from 'react';
import {categoryData} from '@weddesign/types';
import {Colors, ExpenseTypes} from '@weddesign/enums';
import {Icons} from '@weddesign/assets';
import {SvgProps} from 'react-native-svg';

const categoryToIconMap: {[key: string]: React.FC<SvgProps>} = {
    1: Icons.Coffee,
    2: Icons.Map,
    3: Icons.Decors,
    4: Icons.Putus,
    5: Icons.Camera,
    6: Icons.Music,
    7: Icons.Confetti,
    8: Icons.Gift,
    9: Icons.Dress,
    10: Icons.Camera,
    11: Icons.Earrings,
    12: Icons.Rings,
    13: Icons.House,
    14: Icons.File,
    15: Icons.Car,
    16: Icons.Question,
};

export const getBudgetCategoryData = (catId: number): categoryData => {
    const color = (() => {
        switch (catId) {
            case 1:
            case 2:
            case 3:
            case 4:
                return Colors.StatusAccepted;
            case 5:
            case 6:
            case 7:
            case 8:
                return Colors.StatusInvited;
            case 9:
            case 10:
            case 11:
            case 12:
                return Colors.PinkLightest;
            case 13:
            case 14:
            case 15:
            case 16:
                return Colors.LightBlue;
        }
    })();
    const icon = categoryToIconMap[catId] || Icons.Question;
    return {
        color,
        icon,
    };
};
