import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import NotificationSelectedIcon from '../assets/svg/NotificationSelectedIcon';
import NotificationUnselectIcon from '../assets/svg/NotificationUnselectIcon';
import {heightToDp} from '../helpers/responsive';
import {Screens} from '../helpers/screenConstant';
import NotificationScreen from '../screens/NotificationScreen';
import {Colors} from '../utils/color';
import PhotoScreen from '../screens/PhotoScreen';
import PhotoListingSelectedIcon from '../assets/svg/PhotoListingSelectedIcon';
import PhotoListingUnselectedIcon from '../assets/svg/PhotoListingUnselectedIcon';
import TextScreen from '../screens/TextScreen';
import TextSelectedIcon from '../assets/svg/TextSelectedIcon';
import TextUnselectedIcon from '../assets/svg/TextUnselectedIcon';
import CalculatorScreen from '../screens/CalculatorScreen';
import CalculatorSelectedIcon from '../assets/svg/CalculatorSelectedIcon';
import CalculatorUnselectedIcon from '../assets/svg/CalculatorUnselectedIcon';
import {Text, View} from 'native-base';
import {Fonts} from '../utils/fonts';

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
                    <NotificationSelectedIcon width={6} height={6} />
                    <Text mt={1} style={styles.textActive}>
                      Notification
                    </Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <NotificationUnselectIcon width={6} height={6} />
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
                    <PhotoListingSelectedIcon width={6} height={6} />

                    <Text mt={1} style={styles.textActive}>
                      Photos
                    </Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <PhotoListingUnselectedIcon width={6} height={6} />

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
                    <TextSelectedIcon width={6} height={6} />

                    <Text mt={1} style={styles.textActive}>
                      Text
                    </Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <TextUnselectedIcon width={6} height={6} />
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
                    <CalculatorSelectedIcon width={6} height={6} />

                    <Text mt={1} style={styles.textActive}>
                      Calculator
                    </Text>
                  </View>
                ) : (
                  <View style={styles.iconView}>
                    <CalculatorUnselectedIcon width={6} height={6} />
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
    fontFamily: Fonts.Regular,
    fontSize: 12,
    // marginTop: 3,
    fontWeight: '400',
  },
  textInActive: {
    color: Colors.secondary,
    fontFamily: Fonts.Regular,
    fontSize: 12,
    // marginTop: 3,
    fontWeight: '400',
  },
  iconView: {
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
