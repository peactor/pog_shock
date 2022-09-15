import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import SomethingScreen from "./SomethingScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let icon = "▲";

        if (label === "Home") {
          icon =  <Icon name="home-outline" size={23}/> 
        } else if (label === "StackView") {
          icon = <IconFeather name="book" size={23}/> 
        } else if (label === "WholeView") {
          icon = <IconFeather name="grid" size={23}/> 
        } else if (label === "Defense") {
          icon = <IconFeather name="shield" size={23}/> 
        }


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
            style={{ flex: 1 }}
          >
          <Text style={{ color: (isFocused && "#673ab7") || "black" , alignSelf:'center'}}>
            {icon} 
          </Text>
          <Text style={{ color: isFocused ? '#673ab7' : '#222' ,alignSelf:'center'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen name="Home" 
                component={HomeScreen} 
                options={{headerShown: false}}

                />
          <Tab.Screen name="StackView" 
                component={SomethingScreen}
                options={{headerShown: false}}

                 />
          <Tab.Screen name="WholeView" 
                component={SettingsScreen}
                options={{headerShown: false}}

                 />
          <Tab.Screen name="Defense" 
                component={SettingsScreen}
                options={{headerShown: false}}

                 />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}