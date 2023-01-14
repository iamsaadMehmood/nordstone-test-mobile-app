import React, {useState} from 'react';
import AppHeader from '../components/AppHeader';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView, Text, VStack} from 'native-base';
import InputComponent from '../components/Input';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import AlreadyAccount from '../components/AlreadyAccountorRegister';
import AppLoader from '../components/AppLoader';
import {messages} from '../helpers/messages';
import {Screens} from '../helpers/screenConstant';
import {navigate} from '../services/navigation.service';
import {Fonts} from '../utils/fonts';
import {notifyToast} from '../utils/toast';
import {Colors} from '../utils/color';
import validator from 'validator';
const SignUpScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailRes, setEmailRes] = useState('');
  const [passwordRes, setPasswordRes] = useState('');
  const onSignUp = async () => {};
  return (
    <SafeAreaView style={styles.fullScreen}>
      <AppHeader title={'Sign Up'} />
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
        {emailRes && <Text style={styles.error}>{emailRes}</Text>}
        <PasswordInput
          value={password}
          onChange={(text: string) => {
            console.log(text);
            setPassword(text);
            !validator.isStrongPassword(text)
              ? setPasswordRes(
                  'Password must be at least 8 characters long\nPassword must contain at least one uppercase letter\nPassword must contain at least one lowercase letter\nPassword must contain at least one number\nPassword must contain at least one special character',
                )
              : setPasswordRes('');
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
        {/* <Text style={styles.error}>{passwordRes}</Text> */}
        <PasswordInput
          value={rePassword}
          onChange={(text: string) => {
            setRePassword(text);
            !validator.isStrongPassword(text)
              ? setPasswordRes(
                  'Password must be at least 8 characters long\nPassword must contain at least one uppercase letter\nPassword must contain at least one lowercase letter\nPassword must contain at least one number\nPassword must contain at least one special character\nBoth password should be same',
                )
              : setPasswordRes('');
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
        {passwordRes && <Text style={styles.error}>{passwordRes}</Text>}
        <PrimaryButton
          title={'Register'}
          onPress={async () => {
            console.log(email);
            if (email.trim() && password.trim()) {
              await onSignUp();
            } else {
              notifyToast(messages.requiredFieldsMissing);
            }
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
  error: {
    color: Colors.danger,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    marginLeft: 5,
    marginTop: 3,
  },
});
