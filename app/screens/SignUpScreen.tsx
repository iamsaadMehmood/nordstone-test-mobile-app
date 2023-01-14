import React, {useState} from 'react';
import AppHeader from '../components/AppHeader';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text, VStack} from 'native-base';
import InputComponent from '../components/Input';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AlreadyAccount from '../components/AlreadyAccountorRegister';
import AppLoader from '../components/AppLoader';
import {messages} from '../helpers/messages';
import {Screens} from '../helpers/screenConstant';
import {navigate} from '../services/navigation.service';
import {Fonts} from '../utils/fonts';
import {notifyToast} from '../utils/toast';

const SignUpScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);
  const [rePassword, setRePassword] = useState('');

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {};
  return (
    <SafeAreaView style={styles.fullScreen}>
      <AppHeader title={'Sign Up'} />
      <VStack mx={5}>
        <Text style={styles.registerText}>
          Hello! Register now and get started.
        </Text>

        <InputComponent
          value={email}
          onChange={(text: string) => {
            setEmail(text);
          }}
          placeHolder={'Email'}
          width={widthToDp(90)}
          marginLeft={0}
          marginTop={5}
          keyboardType={'email-address'}
        />
        <PasswordInput
          value={password}
          onChange={(text: string) => {
            console.log(text);
            setPassword(text);
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
      </VStack>

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
