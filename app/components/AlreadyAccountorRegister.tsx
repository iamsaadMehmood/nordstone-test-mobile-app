import {Text, HStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {Fonts} from '../utils/fonts';
import {Colors} from '../utils/color';

interface Props {
  text: string;
  buttonText: string;
  onPress: Function;
  marginTop: number;
}
const AlreadyAccount = (props: Props) => {
  return (
    <HStack justifyContent={'center'} mt={props.marginTop}>
      <Text style={styles.text}>{props.text}</Text>
      <Text style={styles.button} onPress={() => props.onPress()}>
        {props.buttonText}
      </Text>
    </HStack>
  );
};
export default AlreadyAccount;
const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.Regular,
    fontWeight: 'normal',
    color: Colors.borderColor,
    fontSize: 14,
  },
  button: {
    fontFamily: Fonts.Regular,
    fontWeight: '600',
    color: Colors.primary,
    fontSize: 14,
  },
});
