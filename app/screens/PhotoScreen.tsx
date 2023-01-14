import React, {useCallback, useEffect, useState} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert, Linking, Platform, SafeAreaView, StyleSheet} from 'react-native';

import {messages} from '../helpers/messages';
import {Modal, View, Divider, Pressable, Text, FlatList} from 'native-base';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import {Fonts} from '../utils/fonts';
import {Colors} from '../utils/color';
import {uploadImage} from '../services/uploadImage';
import AppLoader from '../components/AppLoader';
import AppHeader from '../components/AppHeader';
import {firebase} from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
// import useState from 'react';
interface IData {
  username: string;
  createdOn: string;
  photo: string;
}
const PhotoScreen = () => {
  const [data, setData] = useState<IData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const addToFireStore = (url: string) => {
    const db = firebase.firestore();
    const collectionRef = db.collection('testPhotos');
    collectionRef.add({
      username: 'saad',
      photo: url,
      createdOn: new Date().toString(),
    });
  };
  useEffect(() => {
    const db = firebase.firestore();
    const collectionRef = db.collection('testPhotos');
    const unsubscribe = collectionRef.onSnapshot(snap => {
      const firestoreData: IData[] = snap.docs.map(doc => doc.data() as IData);
      setData(firestoreData.reverse());
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, []);
 

  const openCamera = async () => {
    setModalVisible(false);
    const permissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const isPermission = await request(permissions);
    // const isPermissionGranted = await takeUserPermission();
    if (isPermission === 'granted') {
      try {
        const imageData: any = await launchCamera({
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: true,
        });

        const type = imageData.assets[0].type;
        let fileName = imageData.assets[0].fileName;
        let uri = imageData.assets[0].uri;
        setLoader(true);
        // setImageUri(uri);
        const url = await uploadImage(
          imageData.assets[0].uri,
          imageData.assets[0].fileName,
        );
        // setLoader(false);
        //upload
        console.log(url);
        return url;
      } catch (e) {
        console.log(e);
        return '';
      }
    }
  };
  const takeGalleryPermission = async () => {
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ];
    let isPermission = false;
    if (Platform.OS === 'android') {
      const x = await request(permissions[0]);
      const y = await request(permissions[1]);
      if (x === 'granted' && y === 'granted') {
        isPermission = true;
      }
    } else {
      const x = await request(permissions[0]);
      if (x === 'granted') {
        isPermission = true;
      }
    }
    console.log('Gallery', isPermission);
    if (isPermission) {
      return true;
    } else {
      Alert.alert(
        messages.permissionDenied,
        messages.galleryPermissionDenied,
        [
          {
            text: 'Go to Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
    return false;
  };
  const openGallery = async () => {
    setModalVisible(false);
    const isPermissionGranted = await takeGalleryPermission();
    console.log(isPermissionGranted);
    if (isPermissionGranted) {
      try {
        const imageData: any = await launchImageLibrary({
          mediaType: 'photo',
          includeBase64: true,
        });

        const type = imageData.assets[0].type;
        let fileName = imageData.assets[0].fileName;
        let uri = imageData.assets[0].uri;
        setLoader(true);
        const url = await uploadImage(
          imageData.assets[0].uri,
          imageData.assets[0].fileName,
        );
        // setLoader(false);
        console.log(url);
        // setImageUri(uri);
        //upload
        return url;
      } catch (e) {
        console.log(e);
        return '';
      }
    }
  };
  const renderItem = (item: IData) => {
    return (
      <View style={styles.item}>
        <FastImage
          style={styles.image}
          source={{uri: item.photo, priority: FastImage.priority.normal}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <AppHeader title="Photos" />
      <View mx={5}>
        <FlatList
          height={heightToDp(73)}
          paddingBottom={20}
          // inverted
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.photo}
          data={data}
          renderItem={item => renderItem(item.item)}
        />
      </View>
      <Pressable
        mx={5}
        style={styles.btn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.btnTitle}>Add Photo</Text>
      </Pressable>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg">
        <Modal.Content style={styles.modalBodyContainer}>
          <Divider mt={3} thickness="5" w={20} />
          <Pressable
            mt={3}
            style={styles.modalBtn}
            onPress={async () => {
              const url = await openGallery();
              if (url) {
                addToFireStore(url);
              }
              setLoader(false);
            }}>
            <Text style={styles.modalBtnTxt}>Upload from galery</Text>
          </Pressable>
          <Pressable
            mb={3}
            style={styles.modalBtn}
            onPress={async () => {
              const url = await openCamera();
              if (url) {
                addToFireStore(url);
              }
              setLoader(false);
            }}>
            <Text style={styles.modalBtnTxt}>Take picture</Text>
          </Pressable>
        </Modal.Content>
      </Modal>
      {loader && <AppLoader />}
    </SafeAreaView>
  );
};
export default PhotoScreen;
const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    padding: 20,
    height: heightToDp(40),
    width: widthToDp(90),
    backgroundColor: Colors.background,
    shadowColor: Colors.secondary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
  },
  image: {
    height: heightToDp(35),
    width: widthToDp(80),
    borderRadius: 10,
  },
  fullScreen: {
    width: widthToDp(100),
    height: heightToDp(90),
    backgroundColor: Colors.lineColor,
  },
  modalBodyContainer: {
    width: widthToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: Colors.lineColor,
    height: heightToDp(7),
  },
  modalBtnTxt: {
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    fontSize: responsiveFontSize(18),
    color: Colors.primary,
  },
  btn: {
    width: widthToDp(90),
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: responsiveFontSize(16),
    color: Colors.background,
    fontWeight: '400',
    fontFamily: Fonts.Regular,
  },
});
