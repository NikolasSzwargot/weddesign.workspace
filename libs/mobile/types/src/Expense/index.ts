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

export type categoryData = {
    color: Colors;
    icon: React.FC<SvgProps>;
};

export type MainLimitProps = {
    limit: number;
    paid: number;
    notPaid: number;
    totalPlanned: number;
};
