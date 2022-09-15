import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './Main';
import MetaScreen from './Meta';
import MarketScreen from './Market'

const AppNavigator = createStackNavigator(
    {
        HomeMain: {
          screen: MainScreen,
          navigationOptions: {
            header: null,
        },
        },
        Market:MarketScreen,

        Meta:MetaScreen
    },
    {
        initialRouteName: 'HomeMain',
    }
    );
export default createAppContainer(AppNavigator);
