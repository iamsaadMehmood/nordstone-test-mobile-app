import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../helpers/screenConstant';
import BottomTab from './BottomTabNavigation';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.login}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.splash} component={SplashScreen} />
      <Stack.Screen name={Screens.signUp} component={SignUpScreen} />
      <Stack.Screen name={Screens.login} component={LoginScreen} />
      <Stack.Screen name={Screens.bottomTab} component={BottomTab} />
    </Stack.Navigator>
  );
};
export default MainNavigation;
