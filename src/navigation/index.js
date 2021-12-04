import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
import {navigationRef} from './RootNavigation';
import {colors} from '../constants/colors';

const index = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default index;
