import {View} from 'native-base';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
import React, {useEffect} from 'react';
import WelcomeLoader from '../components/WelcomeLoader';
import {getEmail} from '../helpers/storage';
import {StackActions} from '@react-navigation/native';
import {Screens} from '../helpers/screenConstant';

const SplashScreen = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      getEmail().then((email: string) => {
        if (email) {
          props.navigation.dispatch(StackActions.replace(Screens.bottomTab));
        } else {
          props.navigation.dispatch(StackActions.replace(Screens.login));
        }
      });
    }, 1000);
  }, []);
  return (
    <SafeAreaView>
      <WelcomeLoader />
    </SafeAreaView>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  fullScreen: {
    height: heightToDp(100),
    width: widthToDp(100),
    backgroundColor: Colors.background,
  },
});
