import React from 'react';
import {Home} from '@mobile/components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '@mobile/navigation';

type HomeProps = StackScreenProps<RootParamList, 'Home'>;

const HomePage = ({navigation, route}: HomeProps) => {
    return <Home />;
};

export default HomePage;
