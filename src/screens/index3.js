import React from "react";
import { Text,View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import SomethingScreen from "./SomethingScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';


const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const StackView = createStackNavigator(
  {
    SomethingScreen,
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      title: "모아보기",
    }),
  }
);

const WholeView = createStackNavigator(
  {
    SomethingScreen,
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      title: "전체보기",
    }),
  }
);

const DefenseView = createStackNavigator(
  {
    SomethingScreen,
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);


const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    StackView: StackView,
    WholeView: WholeView,
    Defense: DefenseView,

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "Home") {
          icon =  <Icon name="home-outline" size={23}/> 
        } else if (routeName === "StackView") {
          icon = <IconFeather name="book" size={23}/> 
        } else if (routeName === "WholeView") {
          icon = <IconFeather name="grid" size={23}/> 
        } else if (routeName === "Defense") {
          icon = <IconFeather name="shield" size={23}/> 
        }

        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        return (
          <Text style={{ color: (focused && "#46c3ad") || "black" }}>
            {icon} 
          </Text>
        );
      },
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "black",
    },
  }
);
 const TabBarAdvancedButton = ({
  bgColor,
  ...props
}) => (
  <View
    style={styles.container}
    pointerEvents="box-none"
  >
    <TabBg
      color={bgColor}
      style={styles.background}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
    >
      <Icon
        name="rocket"
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  </View>
);


const AppStack = createStackNavigator({
  // LoginScreen: LoginScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

export default createAppContainer(AppStack);
