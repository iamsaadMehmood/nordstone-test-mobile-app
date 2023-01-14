/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import React from 'react';
import {StatusBar} from 'react-native';

import MainNavigation from './app/navigation/MainNavigation';
import {navigationRef} from './app/services/navigation.service';
import {Colors} from './app/utils/color';

function App(): JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={Colors.primary} />

      <MainNavigation />
    </NavigationContainer>
  );
}

export default App;