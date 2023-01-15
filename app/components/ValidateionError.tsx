import {Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {responsiveFontSize} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
interface IProps {
  text: string;
}
const ValidationError = (props: IProps) => {
  return <Text style={styles.error}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  error: {
    color: Colors.danger,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    marginLeft: 5,
  },
});
export default ValidationError;
