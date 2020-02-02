/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';

export default class StorageHelper {
  storeJwt = async (jwtString) => {
    await AsyncStorage.setItem('jwt', jwtString);
  }

  getJwtFromStore = async () => {
    const jwt = await AsyncStorage.getItem('jwt');
    return jwt;
  }

  deleteJwtFromStore = async () => {
    await AsyncStorage.removeItem('jwt');
  }
}
