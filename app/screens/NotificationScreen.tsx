import {Pressable, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import AppHeader from '../components/AppHeader';
import Layout from '../components/Layout';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import Notification from '../services/notification.service';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
const NotificationScreen = () => {
  const sendNotification = () => {
    Notification.sendNotification();
  };
  return (
    <Layout>
      <AppHeader title="Notification" />
      <View style={styles.mainContainer}>
        <Pressable style={styles.btn} onPress={() => sendNotification()}>
          <Text style={styles.btnTitle}>Send Notification</Text>
        </Pressable>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: widthToDp(80),
    height: 55,
    backgroundColor: Colors.danger,
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
  mainContainer: {
    width: widthToDp(100),
    height: heightToDp(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NotificationScreen;
