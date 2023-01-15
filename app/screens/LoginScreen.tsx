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
import auth from '@react-native-firebase/auth';
import {storeEmail} from '../helpers/storage';

const LoginScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  //Welcome back! Glad to see you, Again!
  const handleLogin = async (e: string, p: string) => {
    if (e && p) {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(e, p);
        console.log('User signed in!');
        await storeEmail(e);
        setLoading(false);
        props.navigation.dispatch(StackActions.replace(Screens.bottomTab));
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          notifyToast('No account found for that email!');
        } else if (error.code === 'auth/wrong-password') {
          notifyToast('Wrong password!');
        }
      }
    } else {
      notifyToast(messages.requiredFieldsMissing);
    }
  };

  async function handleForgotPassword(e: string) {
    try {
      await auth().sendPasswordResetEmail(e);
      // console.log(`Password reset email sent to ${e}`);
      notifyToast(`Password reset email sent to ${e}`);
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        // console.log(`No account found for email: ${e}`);
        notifyToast(`No account found for email: ${e}`);
      }
    }
  }
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
            await handleLogin(e, p);
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
