import React, {useState} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert, Linking, Platform, } from 'react-native';

import {messages} from '../helpers/messages';
import { View } from 'native-base';
const PhotoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
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
        // const url = await uploadImage(
        //   imageData.assets[0].uri,
        //   imageData.assets[0].fileName,
        // );
        setLoader(false);
        //upload
      } catch (e) {
        console.log(e);
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
        // const url = await uploadImage(
        //   imageData.assets[0].uri,
        //   imageData.assets[0].fileName,
        // );
        setLoader(false);
        // setImageUri(uri);
        //upload
      } catch (e) {
        console.log(e);
      }
    }
  };
  return <View></View>;
};
export default PhotoScreen;
