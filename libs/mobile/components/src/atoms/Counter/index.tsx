import React from 'react';
import {CounterContainer, CountText, LabelText} from './styles';

type CounterProps = {
    count: number;
    label: string;
};

const Counter = ({count, label}: CounterProps) => (
    <CounterContainer>
        <CountText>{count}</CountText>
        <LabelText>{label}</LabelText>
    </CounterContainer>
);

export default Counter;
