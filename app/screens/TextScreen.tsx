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
import SendIcon from '../assets/svg/SendIcon';
import AppHeader from '../components/AppHeader';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import {notifyToast} from '../utils/toast';
import {messages} from '../helpers/messages';
import {getEmail} from '../helpers/storage';
import AppLoader from '../components/AppLoader';
interface IData {
  id: string;
  email: string;
  message: string;
  createdOn: string;
}
const TextScreen = () => {
  const [data, setData] = useState<IData[]>([]);
  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight * 0.72);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const keyboardDidShow = (e: any) => {
    const shortHeight = screenHeight - e.endCoordinates.height;
    setHeight(shortHeight * 0.66);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHeight(screenHeight * 0.72);
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
    const collectionRef = db.collection(email);
    collectionRef.add({
      email: email,
      message: message,
      createdOn: new Date().toISOString(),
    });
  };

  const getStoreEmail = async () => {
    if (email) {
      return email;
    } else {
      const e = await getEmail();
      setEmail(e);
      return e;
    }
  };
  useEffect(() => {
    let unsubscribe: any;
    setLoader(true);
    getStoreEmail().then(e => {
      unsubscribe = firebase
        .firestore()
        .collection(e)
        .orderBy('createdOn', 'asc')
        .onSnapshot(snap => {
          if (snap) {
            const firestoreData: IData[] = snap.docs.map(doc => {
              return {id: doc.id, ...(doc.data() as any)};
            });
            setData(firestoreData);
            setLoader(false);
          }
        });
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
          maxHeight={70}
          width={widthToDp(70)}
          borderRadius={55}
          value={text}
          keyboardType={'default'}
          backgroundColor={Colors.messageInputBackground}
          placeholder="Enter text"
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
      {loader && <AppLoader />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  item: {
    width: widthToDp(65),
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    marginBottom: 10,
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
    // opacity: ,
    textAlign: 'right',
  },
  inputContainer: {
    paddingTop: 5,
    marginBottom: 10,
    height: 80,
    width: widthToDp(100),
    backgroundColor: Colors.appBarBackground,
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
