import AnimatedLottieView from 'lottie-react-native';
import {View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../helpers/responsive';

const AppLoader = () => {
  return (
    <View style={styles.loader}>
      <AnimatedLottieView
        style={{
          height: heightToDp(17),
          width: widthToDp(17),
        }}
        source={require('../assets/spinner.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});

export default AppLoader;
