import {StackActions} from '@react-navigation/native';
import {Text, View, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AlreadyAccount from '../components/AlreadyAccountorRegister';
import AppHeader from '../components/AppHeader';
import AppLoader from '../components/AppLoader';
import InputComponent from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import {messages} from '../helpers/messages';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Screens} from '../helpers/screenConstant';
import {navigate} from '../services/navigation.service';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import {notifyToast} from '../utils/toast';

const LoginScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  //Welcome back! Glad to see you, Again!
  return (
    <SafeAreaView style={styles.fullScreen}>
      <AppHeader title={'Sign In'} />
      <VStack mx={5}>
        <Text style={styles.registerText}>Welcome!</Text>
        <InputComponent
          value={email}
          onChange={(text: string) => {
            setEmail(text);
          }}
          placeHolder={'Enter your email'}
          width={widthToDp(90)}
          marginLeft={0}
          marginTop={20}
          keyboardType={'email-address'}
        />
        <PasswordInput
          value={password}
          onChange={(text: string) => {
            setPassword(text);
          }}
          placeHolder={'Enter your password'}
          width={widthToDp(90)}
          marginLeft={0}
          marginTop={5}
          showHide={() => {
            setSecurePassword(!securePassword);
          }}
          isSecure={securePassword}
        />
        <View style={styles.forgetPassword}>
          <Text
            onPress={() => navigate(Screens.bottomTab)}
            style={styles.forgetPasswordText}>
            Forgot Password?
          </Text>
        </View>
        <PrimaryButton
          title={'Login'}
          onPress={async () => {
            const e = email.trim();
            const p = password.trim();
            if (e && p) {
              // console.log(x, x.password, p);
              // if (x.email === e && x.password === p) {
              // await storeEmail(e);
              // await storeUsername(x.username);
              props.navigation.dispatch(
                StackActions.replace(Screens.bottomTab),
              );
              // } else {
              //   notifyToast(messages.invalidCredentials);
              // }
            } else {
              notifyToast(messages.requiredFieldsMissing);
            }
          }}
          marginTop={5}
          marginHorizontal={0}
        />

        <AlreadyAccount
          marginTop={5}
          text={'Don’t have an account? '}
          buttonText={'Register Now'}
          onPress={() => navigate(Screens.signUp)}
        />
      </VStack>
      {loading && <AppLoader />}
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: Colors.background,
    height: heightToDp(100),
    width: widthToDp(100),
  },

  registerText: {
    marginVertical: 20,
    paddingTop: 10,
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    fontSize: responsiveFontSize(24),
    width: widthToDp(80),
  },

  forgetPassword: {
    width: widthToDp(90),
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  forgetPasswordText: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Colors.borderColor,
  },
});
