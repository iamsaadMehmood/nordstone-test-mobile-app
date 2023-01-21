import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import {Modal, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {Keyboard, SafeAreaView, StyleSheet} from 'react-native';
import validator from 'validator';
import AlreadyAccount from '../components/AlreadyAccountorRegister';
import AppHeader from '../components/AppHeader';
import AppLoader from '../components/AppLoader';
import InputComponent from '../components/Input';
import Layout from '../components/Layout';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import ValidationError from '../components/ValidateionError';
import {messages} from '../helpers/messages';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Screens} from '../helpers/screenConstant';
import {storeEmail} from '../helpers/storage';
import {navigate} from '../services/navigation.service';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import {notifyToast} from '../utils/toast';

const LoginScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [fEmail, setFEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailRes, setEmailRes] = useState('');
  const handleLogin = async (e: string, p: string) => {
    if (e && p) {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(e, p);
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

  const handleForgotPassword = async (e: string) => {
    if (e) {
      Keyboard.dismiss();
      setLoading(true);
      try {
        await auth().sendPasswordResetEmail(e);
        notifyToast(`Password reset email sent to ${e}`);
        setLoading(false);
        setShowModal(false);
      } catch (error: any) {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          notifyToast(`No account found for email: ${e}`);
        }
      }
    } else {
      notifyToast(messages.requiredFieldsMissing);
    }
  };
  return (
    <Layout>
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
            onPress={() => setShowModal(true)}
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
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg">
        <Modal.Content style={styles.modalBodyContainer}>
          <Text style={styles.forgetPasswordTitle}>Forget Password</Text>
          <View>
            <InputComponent
              value={fEmail}
              onChange={(text: string) => {
                setFEmail(text);
                validator.isEmail(text)
                  ? setEmailRes('')
                  : setEmailRes('Please enter valid email');
              }}
              placeHolder={'Enter your email'}
              width={widthToDp(80)}
              marginLeft={0}
              marginTop={5}
              keyboardType={'email-address'}
            />
            {emailRes && <ValidationError text={emailRes} />}
          </View>
          <PrimaryButton
            title={'Forget Password'}
            onPress={async () => {
              await handleForgotPassword(fEmail.trim());
            }}
            marginTop={5}
            marginHorizontal={0}
            width={80}
          />
        </Modal.Content>
      </Modal>
      {loading && <AppLoader />}
    </Layout>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
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
  modalBodyContainer: {
    width: widthToDp(90),
    height: heightToDp(40),
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 20,
  },
  forgetPasswordTitle: {
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(20),
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.primary,
  },
  btn: {
    width: widthToDp(90),
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: responsiveFontSize(16),
    color: Colors.background,
    fontWeight: '400',
    fontFamily: Fonts.Regular,
  },
});
