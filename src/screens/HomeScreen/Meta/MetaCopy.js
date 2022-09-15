import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ProfileScreen=()=>{
    return(
        <Text> HI </Text>
    )
}

const ImagesScreen=()=>{
    return(
        <Text> HI </Text>
    )
}


const VideoScreen=()=>{
    return(
        <Text> dd </Text>
    )
}


const TabNavigator = createMaterialTopTabNavigator(
    {
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarLabel: "전체보기",
          showLabel: ({ focused }) => {
            console.log(focused);
            return focused ? true : false;
          },
        },
      },
      Images: {
        screen: ImagesScreen,
        navigationOptions: {
          tabBarLabel: "운전자",
        },
      },
      Video: {
        screen: VideoScreen,
        navigationOptions: {
          tabBarLabel: "보행자",
        },
      },
    },
    {
      tabBarOptions: {
        showIcon: true,
        activeTintColor: "black", 
        inactiveTintColor: "black",
        style: {
          backgroundColor: "white",
          marginTop: 0,
        },


      },
    }
  );
    
  const Navigator = createAppContainer(TabNavigator);
    
  export default function App() {
    return (
      <Navigator>
        <ProfileScreen />
      </Navigator>
    );
  }