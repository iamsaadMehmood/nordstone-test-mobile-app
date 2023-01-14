import {Pressable, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
interface IProps {
  title: string;
  onPress: Function;
  marginTop: number;
  marginHorizontal: number;
}
const PrimaryButton = (props: IProps) => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => props.onPress()}
      mt={props.marginTop}
      mx={props.marginHorizontal}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};
export default PrimaryButton;
const styles = StyleSheet.create({
  button: {
    width: widthToDp(90),
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 14,
  },
  title: {
    color: Colors.background,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    fontFamily: Fonts.Regular,
  },
});
