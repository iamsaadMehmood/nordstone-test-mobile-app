import {HStack, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';

interface IProps {
  title: string;
}
const AppHeader = (props: IProps) => {
  return (
    <HStack style={styles.appBar}>
      <Text style={styles.title}>{props.title}</Text>
    </HStack>
  );
};
export default AppHeader;
const styles = StyleSheet.create({
  appBar: {
    width: widthToDp(100),
    height: 64,
    paddingLeft: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appBarBackground,
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: '500',
    color: Colors.secondary,
    lineHeight: 30,
    fontFamily: Fonts.Regular,
  },
});
