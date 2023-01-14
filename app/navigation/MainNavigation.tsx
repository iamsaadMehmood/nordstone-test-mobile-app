import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../helpers/screenConstant';
import BottomTab from './BottomTabNavigation';

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.bottomTab}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.bottomTab} component={BottomTab} />
    </Stack.Navigator>
  );
};
export default MainNavigation;
