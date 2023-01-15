import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import {ScrollView, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import validator from 'validator';
import AlreadyAccount from '../components/AlreadyAccountorRegister';
import AppLoader from '../components/AppLoader';
import AuthAppHeader from '../components/AuthAppHeader';
import InputComponent from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import ValidationError from '../components/ValidateionError';
import {messages} from '../helpers/messages';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Screens} from '../helpers/screenConstant';
import {navigate} from '../services/navigation.service';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import {notifyToast} from '../utils/toast';
const SignUpScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailRes, setEmailRes] = useState('');
  const [passwordRes, setPasswordRes] = useState('');

  const onSignUp = async (e: string, p: string, rp: string) => {
    if (e && p && p === rp && !emailRes && !passwordRes) {
      setLoading(true);
      try {
        const {user} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        notifyToast(messages.success);
        props.navigation.dispatch(StackActions.replace(Screens.login));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          notifyToast(messages.userAlreadyExist);
        }
        if (error.code === 'auth/invalid-email') {
          notifyToast('Please enter valid email');
        }
      }
    } else {
      notifyToast(messages.requiredFieldsMissing);
    }
  };
  const validatePassword = (text: string) => {
    validator.isStrongPassword(text)
      ? setPasswordRes('')
      : setPasswordRes(
          'Password must be at least 8 characters long\nPassword must contain at least one uppercase letter\nPassword must contain at least one lowercase letter\nPassword must contain at least one number\nPassword must contain at least one special character',
        );
  };
  return (
    <SafeAreaView style={styles.fullScreen}>
      <AuthAppHeader title={'Sign Up'} marginBetween={25} />
      <ScrollView
        px={5}
        maxHeight={heightToDp(75)}
        keyboardShouldPersistTaps={'always'}>
        <Text style={styles.registerText}>
          Hello! Register now and get started.
        </Text>

        <InputComponent
          value={email}
          onChange={(text: string) => {
            setEmail(text);
            !validator.isEmail(text)
              ? setEmailRes('Please enter valid email')
              : setEmailRes('');
          }}
          placeHolder={'Email'}
          width={widthToDp(90)}
          marginLeft={0}
          marginTop={5}
          keyboardType={'email-address'}
        />
        {emailRes && <ValidationError text={emailRes} />}
        <PasswordInput
          value={password}
          onChange={(text: string) => {
            setPassword(text);
            validatePassword(text);
          }}
          placeHolder={'Password'}
          width={widthToDp(90)}
          marginLeft={0}
          marginTop={5}
          showHide={() => {
            setSecurePassword(!securePassword);
          }}
          isSecure={securePassword}
        />
        <PasswordInput
          value={rePassword}
          onChange={(text: string) => {
            setRePassword(text);
            validatePassword(text);
          }}
          placeHolder={'Confirm Password'}
          width={widthToDp(90)}
          marginLeft={0}
          marginTop={5}
          showHide={() => {
            setSecureRePassword(!secureRePassword);
          }}
          isSecure={secureRePassword}
        />
        {passwordRes && <ValidationError text={passwordRes} />}
        <PrimaryButton
          title={'Register'}
          onPress={async () => {
            await onSignUp(email.trim(), password.trim(), rePassword.trim());
          }}
          marginTop={5}
          marginHorizontal={0}
        />

        <AlreadyAccount
          text={'Already have an account? '}
          buttonText={'Login Now'}
          onPress={() => navigate(Screens.login)}
          marginTop={10}
        />
      </ScrollView>

      {loading && <AppLoader />}
    </SafeAreaView>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: Colors.background,
    height: heightToDp(100),
    width: widthToDp(100),
  },
  registerText: {
    marginVertical: 20,
    paddingTop: 10,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
    lineHeight: 30,
    fontSize: responsiveFontSize(24),
    width: widthToDp(60),
  },
});
