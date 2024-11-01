import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from '@mobile/components';
// import {HomePage} from '@mobile/components';

export type RootParamList = {
    Home: undefined;
};

const Root = createStackNavigator<RootParamList>();

export const WeddesignNavigator = () => {
    return (
        <NavigationContainer>
            <Root.Navigator>
                <Root.Screen name={'Home'} component={HomePage} />
            </Root.Navigator>
        </NavigationContainer>
    );
};
