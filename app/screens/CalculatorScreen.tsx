import {HStack, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppHeader from '../components/AppHeader';
import InputComponent from '../components/Input';
import {heightToDp, responsiveFontSize, widthToDp} from '../helpers/responsive';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from '../utils/color';
import {Fonts} from '../utils/fonts';
import DownArrow from '../assets/svgs/DownArrow';
import PrimaryButton from '../components/PrimaryButton';
import UpArrow from '../assets/svgs/UpArrow';

const CalculatorScreen = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  return (
    <SafeAreaView style={styles.fillScreen}>
      <AppHeader title={'Calculator'} />
      <VStack mt={10}>
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
          defaultButtonText={'Select Type'}
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
        <PrimaryButton
          title={'Calculate'}
          onPress={() => null}
          marginTop={40}
          marginHorizontal={0}
        />
      </VStack>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fillScreen: {
    width: widthToDp(100),
    height: heightToDp(90),
    marginHorizontal: 20,
  },
  dropdownBtnTxtStyle: {
    // marginTop: 10,
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
});
export default CalculatorScreen;
