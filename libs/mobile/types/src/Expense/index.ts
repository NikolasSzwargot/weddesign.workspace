import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Colors} from '@weddesign/enums';

export type Expense = {
    id: number;
    name: string;
    description: string;
    category: string;
    value: number;
    deadline: string | Date; // ISO 8601 datetime string
    isPayed: boolean;
};

export type ExpGroupL = {
    title: string;
    data: Expense[];
    limitText?: string;
};

export type catData = {
    color: Colors;
    icon: React.FC<SvgProps>;
};
