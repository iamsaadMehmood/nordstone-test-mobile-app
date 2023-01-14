import React from 'react';
import {View, SafeAreaView, Pressable, StyleSheet, Text} from 'react-native';

import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import Notification from '../services/notificaton.service';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
const NotificationScreen = () => {
  const sendNotification = () => {
    Notification.sendNotification(new Date());
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Pressable style={styles.btn} onPress={() => sendNotification()}>
        <Text style={styles.btnTitle}>Send Notification</Text>
      </Pressable>
    </SafeAreaView>
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
    height: heightToDp(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NotificationScreen;
