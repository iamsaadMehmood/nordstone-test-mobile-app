import {HStack, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppHeader from '../components/AppHeader';
import InputComponent from '../components/Input';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import DownArrow from '../assets/svg/DownArrow';
import PrimaryButton from '../components/PrimaryButton';
import UpArrow from '../assets/svg/UpArrow';
import AppLoader from '../components/AppLoader';
import {calculate} from '../services/api.service';
import {notifyToast} from '../utils/toast';

const CalculatorScreen = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [answer, setAnswer] = useState(0);
  const [loader, setLoader] = useState(false);
  const calculator = async () => {
    if (firstNumber && secondNumber) {
      if (operation) {
        setLoader(true);
        const a = await calculate(
          parseInt(firstNumber),
          parseInt(secondNumber),
          operation.toLowerCase(),
        );
        if (a) setAnswer(a);
        setLoader(false);
      } else {
        notifyToast('please select operation type');
      }
    } else {
      notifyToast('Please enter both number to calculate');
    }
  };
  return (
    <SafeAreaView style={styles.fullScreen}>
      <AppHeader title={'Calculator'} />
      <VStack mt={10} mx={5}>
        <HStack justifyContent={'space-between'} width={widthToDp(90)}>
          <InputComponent
            value={firstNumber}
            onChange={(text: string) => {
              if (text !== ',' && text !== '.') setFirstNumber(text);
            }}
            placeHolder={'First Number'}
            width={widthToDp(40)}
            marginLeft={0}
            marginTop={5}
            keyboardType={'number-pad'}
          />
          <InputComponent
            value={secondNumber}
            onChange={(text: string) => {
              if (text !== ',' && text !== '.') setSecondNumber(text);
            }}
            placeHolder={'Second Number'}
            width={widthToDp(40)}
            marginLeft={0}
            marginTop={5}
            keyboardType={'number-pad'}
          />
        </HStack>
        <SelectDropdown
          data={['Multiply', 'Addition', 'Subtraction']}
          onSelect={setOperation}
          defaultValue={operation}
          defaultButtonText={'Select Operation'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={styles.dropdownBtnTxtStyle}
          renderDropdownIcon={isOpened =>
            isOpened ? (
              <UpArrow width={5} height={5} />
            ) : (
              <DownArrow width={5} height={5} />
            )
          }
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdownDropdownStyle}
          rowStyle={styles.dropdownRowStyle}
          rowTextStyle={styles.dropdownRowTxtStyle}
        />
        <HStack mt={10} justifyContent={'center'} alignItems={'center'}>
          <Text style={styles.answer}>= {answer}</Text>
        </HStack>
        <PrimaryButton
          title={'Calculate'}
          onPress={() => calculator()}
          marginTop={10}
          marginHorizontal={0}
        />
      </VStack>
      {loader && <AppLoader />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fullScreen: {
    width: widthToDp(100),
    height: heightToDp(90),
    // marginHorizontal: 20,
  },
  dropdownBtnTxtStyle: {
    color: Colors.secondary,
    textAlign: 'left',
    fontSize: responsiveFontSize(16),
    fontFamily: Fonts.Regular,
  },
  dropdownDropdownStyle: {
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  dropdownRowStyle: {
    backgroundColor: Colors.background,
    borderBottomColor: Colors.placeHolderColor,
    height: 44,
  },
  dropdownRowTxtStyle: {
    color: Colors.secondary,
    textAlign: 'left',
    fontSize: responsiveFontSize(16),
    fontFamily: Fonts.Regular,
  },
  dropdownBtnStyle: {
    width: widthToDp(90),
    height: 55,
    marginTop: 25,
    backgroundColor: Colors.background,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.placeHolderColor,
  },
  answer: {
    fontWeight: '600',
    fontSize: responsiveFontSize(28),
    lineHeight: 25,
    fontFamily: Fonts.Regular,
    color: Colors.primary,
  },
});
export default CalculatorScreen;
