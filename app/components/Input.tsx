import {Input} from 'native-base';
import React from 'react';
import {KeyboardTypeOptions, StyleSheet} from 'react-native';
import {responsiveFontSize} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
interface InputProps {
  value: string;
  onChange: Function;
  placeHolder: string;
  width: number;
  marginLeft: number;
  marginTop: number;
  editable?: boolean;
  keyboardType: KeyboardTypeOptions;
  onC?: Function;
}
const InputComponent = (props: InputProps) => {
  return (
    <Input
      ml={props.marginLeft}
      mt={props.marginTop}
      placeholderTextColor={Colors.placeHolderColor}
      width={props.width}
      value={props.value}
      borderRadius={12}
      keyboardType={props.keyboardType}
      style={styles.input}
      autoCapitalize={'none'}
      editable={props.editable}
      onChangeText={text => {
        props.onChange(text.toString());
      }}
      placeholder={props.placeHolder}
    />
  );
};
export default InputComponent;
const styles = StyleSheet.create({
  input: {
    fontSize: responsiveFontSize(16),
    color: Colors.secondary,
    backgroundColor: Colors.background,
    height: 56,
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
  },
});
