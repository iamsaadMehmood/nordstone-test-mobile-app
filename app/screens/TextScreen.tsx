import {FlatList, HStack, Input, Pressable} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import SendIcon from '../assets/svgs/SendIcon';
import AppHeader from '../components/AppHeader';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
const TextScreen = () => {
  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight * 0.7);
  const [text, setText] = useState('');
  const keyboardDidShow = (e: any) => {
    const shortHeight = screenHeight - e.endCoordinates.height;

    console.log(height, shortHeight);
    setHeight(shortHeight * 0.6);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHeight(screenHeight * 0.7);
        // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <SafeAreaView>
      <AppHeader title="Text" />
      <FlatList
        height={height}
        paddingBottom={20}
        inverted
        data={[]}
        renderItem={item => <></>}
      />
      <HStack style={styles.inputContainer}>
        <Input
          multiline={true}
          minHeight={50}
          maxHeight={100}
          width={widthToDp(70)}
          borderRadius={55}
          value={text}
          keyboardType={'default'}
          backgroundColor={Colors.messageInputBackground}
          placeholder="Message"
          placeholderTextColor={Colors.messagePlaceHolder}
          color={Colors.secondary}
          fontFamily={Fonts.Regular}
          fontWeight={'400'}
          fontSize={responsiveFontSize(17)}
          onChangeText={(val: string) => {
            setText(val.toString());
          }}
        />
        <Pressable ml={3} onPress={() => {}}>
          <View style={styles.sendBtn}>
            <SendIcon width={4} height={4} />
          </View>
        </Pressable>
      </HStack>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 5,
    marginBottom: 10,
    height: 100,
    width: widthToDp(100),
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: widthToDp(80),
    height: heightToDp(8),
  },
  sendBtn: {
    backgroundColor: Colors.primary,
    height: widthToDp(10),
    width: widthToDp(10),
    borderRadius: widthToDp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TextScreen;
