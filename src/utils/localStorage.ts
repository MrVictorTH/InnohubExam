import AsyncStorage from '@react-native-async-storage/async-storage';

const accessToken: string = 'access_token';

export const getToken = () =>
  AsyncStorage.getItem(accessToken || '');

export const setToken = (token: string) => 
  AsyncStorage.setItem(accessToken,token);