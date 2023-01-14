import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NotificationSelectedIcon from '../assets/svgs/NotificationSelectedIcon';
import NotificationUnselectIcon from '../assets/svgs/NotificationUnselectIcon';
import {heightToDp} from '../helpers/responsive';
import {Screens} from '../helpers/screenConstant';
import NotificationScreen from '../screens/NotificationScreen';
import {Colors} from '../utils/color';
import PhotoScreen from '../screens/PhotoScreen';
import PhotoListingSelectedIcon from '../assets/svgs/PhotoListingSelectedIcon';
import PhotoListingUnselectedIcon from '../assets/svgs/PhotoListingUnselectedIcon';
import TextScreen from '../screens/TextScreen';
import TextSelectedIcon from '../assets/svgs/TextSelectedIcon';
import TextUnselectedIcon from '../assets/svgs/TextUnselectedIcon';
import CalculatorScreen from '../screens/CalculatorScreen';
import CalculatorSelectedIcon from '../assets/svgs/CalculatorSelectedIcon';
import CalculatorUnselectedIcon from '../assets/svgs/CalculatorUnselectedIcon';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.notification}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: heightToDp(9),
          backgroundColor: Colors.background,
          paddingBottom: 20,
          // marginTop: Platform.OS === 'ios' ? 20 : 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={Screens.notification}
        component={NotificationScreen}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <View>
                {tabInfo.focused ? (
                  <View style={styles.iconView}>
                    <NotificationSelectedIcon width={7} height={7} />
                    <Text style={styles.textActive}>Notification</Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <NotificationUnselectIcon width={7} height={7} />
                    <Text style={styles.textInActive}>Notification</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Screens.photo}
        component={PhotoScreen}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <View>
                {tabInfo.focused ? (
                  <View style={styles.iconView}>
                    <PhotoListingSelectedIcon width={7} height={7} />

                    <Text style={styles.textActive}>Photos</Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <PhotoListingUnselectedIcon width={7} height={7} />

                    <Text style={styles.textInActive}>Photos</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Screens.text}
        component={TextScreen}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <View>
                {tabInfo.focused ? (
                  <View style={styles.iconView}>
                    <TextSelectedIcon width={7} height={7} />

                    <Text style={styles.textActive}>Text</Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <TextUnselectedIcon width={7} height={7} />
                    <Text style={styles.textInActive}>Text</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Screens.calculator}
        component={CalculatorScreen}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <View>
                {tabInfo.focused ? (
                  <View style={styles.iconView}>
                    <CalculatorSelectedIcon width={7} height={7} />

                    <Text style={styles.textActive}>Calculator</Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <CalculatorUnselectedIcon width={7} height={7} />
                    <Text style={styles.textInActive}>Calculator</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  textActive: {
    color: Colors.primary,
    // fontFamily: Fonts.Regular,
    fontSize: 12,
    // marginTop: 3,
    fontWeight: '400',
  },
  textInActive: {
    color: Colors.secondary,
    // fontFamily: Fonts.Regular,
    fontSize: 12,
    // marginTop: 3,
    fontWeight: '400',
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});