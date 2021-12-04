import React from 'react';
import HomeScreen from '../screen/homeScreen';
import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator();

const RootStackNavigator = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTitle: 'WeatherApp',
    }}
    initialRouteName="App">
    <RootStack.Screen name="App" component={HomeScreen} />
  </RootStack.Navigator>
);

export default RootStackNavigator;
