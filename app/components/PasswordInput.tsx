import {Pressable, View} from 'native-base';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Eye from '../assets/svg/Eye';
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
  showHide: Function;
  isSecure: boolean;
}
const PasswordInput = (props: InputProps) => {
  return (
    <View
      ml={props.marginLeft}
      mt={props.marginTop}
      backgroundColor={Colors.background}
      width={props.width}
      //   borderRadius={10}
      style={styles.input}>
      <TextInput
        style={{
          fontSize: responsiveFontSize(16),
          color: Colors.secondary,
          height: 56,
          width: props.width - 45,
          marginLeft: 10,
        }}
        onChangeText={text => {
          props.onChange(text.toString());
        }}
        value={props.value}
        secureTextEntry={props.isSecure}
        placeholder={props.placeHolder}
        placeholderTextColor={Colors.placeHolderColor}
      />
      <Pressable mr={3} onPress={() => props.showHide()}>
        <Eye width={6} height={6} />
      </Pressable>
    </View>
    // <Input
    //   ml={props.marginLeft}
    //   mt={props.marginTop}
    //   backgroundColor={Colors.white}
    //   placeholderTextColor={Colors.placeHolderColor1}
    //   width={props.width}
    //   borderRadius={10}
    //   value={props.value}
    //   style={styles.input}
    //   onChangeText={text => {
    //     props.onChange(text.toString());
    //   }}
    //   secureTextEntry={props.isSecure}
    //   placeholder={props.placeHolder}
    //   InputRightElement={
    //     <Pressable mr={3} onPress={() => props.showHide()}>
    //       <Eye width={6} height={6} />
    //     </Pressable>
    //   }
    // />
  );
};
export default PasswordInput;
const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.background,
    height: 56,
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.borderColor,
    flexDirection: 'row',

    borderRadius: 10,
  },
});
