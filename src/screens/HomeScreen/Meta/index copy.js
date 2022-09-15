import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SubMeta from './SubMeta';


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', position:'absolute',top:0}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 , height:60, justifyContent:'flex-end', backgroundColor:isFocused? '#9c9a9a': '#d9d9d9'}}
          >

          <Text style={{ color: isFocused ? '#222' : '#222' ,alignSelf:'center', fontSize:18, marginBottom:10}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class MetaScreen extends React.Component{
  render(){
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen name="전체보기" 
                       options={{headerShown: false}}
                      component={SubMeta} />
          <Tab.Screen name="운전자" 
                       options={{headerShown: false}}
                      component={SubMeta} />
          <Tab.Screen name="보행자" 
                       options={{headerShown: false}}
                      component={SubMeta} />
        </Tab.Navigator>
     </NavigationContainer>

  );
    }
}