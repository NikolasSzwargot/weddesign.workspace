import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Colors} from '@weddesign/enums';

export type Expense = {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    amount: number;
    deadline: string | Date; // ISO 8601 datetime string
    isPaid: boolean;
};

export type ExpGroupL = {
    categoryId?: number;
    title: string;
    data: Expense[];
    subtitle?: string;
    limit?: number;
    spent?: number;
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
