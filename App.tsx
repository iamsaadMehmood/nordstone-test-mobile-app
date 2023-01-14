/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StatusBar} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import MainNavigation from './app/navigation/MainNavigation';
import {navigationRef} from './app/services/navigation.service';
import {Colors} from './app/utils/color';

const App = () => {
  return (
    <NativeBaseProvider>
      <RootSiblingParent>
        <NavigationContainer ref={navigationRef}>
          <StatusBar backgroundColor={Colors.primary} />
          <MainNavigation />
        </NavigationContainer>
      </RootSiblingParent>
    </NativeBaseProvider>
  );
};

export default App;
