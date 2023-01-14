import React from 'react';
import {goBack} from '../services/navigation.service';
import {StyleSheet} from 'react-native';
import {responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import {HStack, Pressable, Text} from 'native-base';
import LeftIcon from '../assets/svgs/LeftIcon';

interface IProps {
  title: string;
  //   isLeftIcon: boolean;
  //   marginBetween?: number;
}
const AppHeader = (props: IProps) => {
  return (
    <HStack style={styles.appBar}>
      {/* {props.isLeftIcon&&<Pressable onPress={() => goBack()}>
        <LeftIcon width={10} height={10} />
      </Pressable>} */}
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
    backgroundColor: Colors.background,
  },
  title: {
    // marginLeft: widthToDp(25),
    fontSize: responsiveFontSize(20),
    fontWeight: '500',
    color: Colors.primary,
    lineHeight: 30,
    fontFamily: Fonts.Regular,
  },
});
