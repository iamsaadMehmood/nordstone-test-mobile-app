import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';
import {FlatList, HStack, Input, Pressable, Text} from 'native-base';
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
import {notifyToast} from '../utils/toast';
import {messages} from '../helpers/messages';
interface IData {
  id: string;
  email: string;
  message: string;
  createdOn: string;
}
const TextScreen = () => {
  const [data, setData] = useState<IData[]>([]);
  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight * 0.7);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
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

  const addToFireStore = (message: string) => {
    const db = firebase.firestore();
    const collectionRef = db.collection('textMsg');
    collectionRef.add({
      email: 'asad',
      message: message,
      createdOn: new Date().toISOString(),
    });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('textMsg')
      .orderBy('createdOn', 'asc')
      .onSnapshot(snap => {
        if (snap) {
          const firestoreData: IData[] = snap.docs.map(doc => {
            return {id: doc.id, ...(doc.data() as any)};
          });
          setData(firestoreData);
        }
      });
    return () => unsubscribe();
  }, []);
  const renderItem = (item: IData) => {
    return (
      <View style={styles.item}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>
          {moment(item.createdOn).format('DD/MM hh:mm a')}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <AppHeader title="Text" />
      <FlatList
        mx={5}
        height={height}
        paddingBottom={20}
        showsVerticalScrollIndicator={false}
        inverted
        keyExtractor={item => item.id}
        data={[...data].reverse()}
        renderItem={item => renderItem(item.item)}
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
        <Pressable
          ml={3}
          onPress={() => {
            if (text) {
              addToFireStore(text);
              setText('');
            } else {
              notifyToast(messages.enterMessage);
            }
          }}>
          <View style={styles.sendBtn}>
            <SendIcon width={4} height={4} />
          </View>
        </Pressable>
      </HStack>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  item: {
    width: widthToDp(65),
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.msgBackground,
    marginTop: 10,
    borderRadius: 10,
  },
  message: {
    fontFamily: Fonts.Regular,
    color: Colors.background,
    fontSize: 14,
  },
  date: {
    fontFamily: Fonts.Regular,
    color: Colors.background,
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'right',
  },
  inputContainer: {
    paddingTop: 5,
    marginBottom: 10,
    height: 80,
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
