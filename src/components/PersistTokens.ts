import AuthStore from '../stores/AuthStore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';


const persistTokens = async (accessToken: string, refreshToken: string) => {
    AsyncStorage.setItem('refreshToken', JSON.stringify(refreshToken))
        .then(async () => {
            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', refreshToken);

            AuthStore.accessToken = accessToken;
            AuthStore.refreshToken = refreshToken;

        })
        .catch((error: Error) => {
            Alert.alert(error.message);
        });
}

export default persistTokens;