import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeEmail = async (email: string) => {
  await AsyncStorage.setItem('USER-EMAIL', JSON.stringify(email));
};

export const getEmail = async () => {
  const email = await AsyncStorage.getItem('USER-EMAIL');
  return email ? JSON.parse(email) : null;
};
