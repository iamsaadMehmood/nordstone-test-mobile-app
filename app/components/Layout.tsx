import {View} from 'native-base';
import React from 'react';
import {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
// import { widthToDp } from '../helpers/responsive';
interface IProps {
  children: React.ReactNode;
}
const Layout: FC<IProps> = props => {
  return <SafeAreaView style={styles.screen}>{props.children}</SafeAreaView>;
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
    height: heightToDp(100),
    width: widthToDp(100),
  },
});
export default Layout;
