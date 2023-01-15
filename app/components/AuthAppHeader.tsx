import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import LeftIcon from '../assets/svg/LeftIcon';
import {responsiveFontSize, widthToDp} from '../helpers/responsive';
import {goBack} from '../services/navigation.service';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';

interface IProps {
  title: string;

  marginBetween: number;
}
const AuthAppHeader = (props: IProps) => {
  return (
    <HStack style={styles.appBar}>
      <Pressable onPress={() => goBack()}>
        <LeftIcon width={10} height={10} />
      </Pressable>

      <Text ml={widthToDp(props.marginBetween)} style={styles.title}>
        {props.title}
      </Text>
    </HStack>
  );
};
export default AuthAppHeader;
const styles = StyleSheet.create({
  appBar: {
    width: widthToDp(100),
    height: 64,
    paddingLeft: 24,
    alignItems: 'center',
    backgroundColor: Colors.appBarBackground,
  },
  title: {
    // marginLeft: widthToDp(25),
    fontSize: responsiveFontSize(20),
    fontWeight: '500',
    color: Colors.secondary,
    lineHeight: 30,
    fontFamily: Fonts.Regular,
  },
});
