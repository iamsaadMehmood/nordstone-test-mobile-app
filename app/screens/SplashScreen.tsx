import {StackActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WelcomeLoader from '../components/WelcomeLoader';
import {heightToDp, widthToDp} from '../helpers/responsive';
import {Screens} from '../helpers/screenConstant';
import {getEmail} from '../helpers/storage';
import {Colors} from '../utils/color';

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
    <SafeAreaView style={styles.fullScreen}>
      <WelcomeLoader />
    </SafeAreaView>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  fullScreen: {
    height: heightToDp(100),
    width: widthToDp(100),
    backgroundColor: Colors.appBarBackground,
  },
});
