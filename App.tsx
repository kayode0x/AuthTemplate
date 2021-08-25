import RootStack from './src/navigators/RootStack';
import AuthStore from './src/stores/AuthStore';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { Alert } from 'react-native';
axios.defaults.withCredentials = true;

export default function App() {
    const [appReady, setAppReady] = useState(false);
    const url = `http://192.168.1.136:9000/v1/auth/refresh`;

    const handleStart = async () => {
        await AsyncStorage.getItem('refreshToken')
            .then(async (result) => {
                if (result) {
                    refreshTokens(result);
                } else {
                    await AsyncStorage.removeItem('refreshToken')
                        .then(() => AuthStore.accessToken = null)
                }
            })
    };

    const getNewAccessToken = async () => {
        await AsyncStorage.getItem('refreshToken')
            .then((result) => {
                if (result) {
                    refreshTokens(result);
                    Alert.alert('Done added new token!')
                }
            })
    };

    const TenMinutes = 600000;

    useEffect(() => {
        const interval = setInterval(() => {
            getNewAccessToken();
        }, TenMinutes);

        return () => clearInterval(interval); // prevent memory leak.
    }, [])

    const refreshTokens = async (refreshToken: string) => {
        await axios.post(url, refreshToken)
            .then(async res => {
                const result = res.data.data;
                await SecureStore.setItemAsync('accessToken', result.accessToken);
                AuthStore.accessToken = result.accessToken;
                AuthStore.refreshToken = refreshToken;
            })
            .catch(async error => {
                //if any error occurs, go back to the login screen.
                if (!appReady) {
                    setAppReady(true)
                }

                await AsyncStorage.removeItem('refreshToken')
                    .then(() => AuthStore.accessToken = null)
            })
    };

    if (!appReady) {
        return (
            <AppLoading
                startAsync={handleStart}
                onFinish={() => setAppReady(true)}
                onError={(e) => Alert.alert(e.message)}
            />
        );
    }

    return (
        <RootStack />
    );
};