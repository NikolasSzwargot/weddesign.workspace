import React from 'react';
import {categoryData} from '@weddesign/types';
import {Colors, ExpenseTypes} from '@weddesign/enums';
import {Icons} from '@weddesign/assets';
import {SvgProps} from 'react-native-svg';

const categoryToIconMap: {[key: string]: React.FC<SvgProps>} = {
    food: Icons.Coffee,
    place: Icons.Map,
    decor: Icons.Decors,
    flowers: Icons.Putus,
    photos: Icons.Camera,
    music: Icons.Music,
    entertainment: Icons.Confetti,
    gifts: Icons.Gift,
    dress: Icons.Dress,
    appearance: Icons.Camera,
    accessories: Icons.Earrings,
    rings: Icons.Rings,
    accommodation: Icons.House,
    law: Icons.File,
    transport: Icons.Car,
    other: Icons.Question,
};

export const getBudgetCategoryData = (catName: string): categoryData => {
    const color = (() => {
        switch (catName) {
            case ExpenseTypes.Food:
            case ExpenseTypes.Place:
            case ExpenseTypes.Decor:
            case ExpenseTypes.Flowers:
                return Colors.StatusAccepted;
            case ExpenseTypes.Photos:
            case ExpenseTypes.Music:
            case ExpenseTypes.Entertainment:
            case ExpenseTypes.Gifts:
                return Colors.StatusInvited;
            case ExpenseTypes.Dress:
            case ExpenseTypes.Appearance:
            case ExpenseTypes.Accessories:
            case ExpenseTypes.Rings:
                return Colors.PinkLightest;
            case ExpenseTypes.Accommodation:
            case ExpenseTypes.Law:
            case ExpenseTypes.Transport:
            case ExpenseTypes.Other:
                return Colors.LightBlue;
            default:
                return Colors.LightBlue;
        }
    })();
    const icon = categoryToIconMap[catName] || Icons.Question;
    return {
        color,
        icon,
    };
};
