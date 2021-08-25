import React, { useEffect } from 'react'
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
import * as Google from 'expo-auth-session/providers/google';
import persistTokens from '../PersistTokens';
import { SocialAuthBtn, SocialAuthLogo } from '../../screens/SignIn/SignInStyle';
import { Alert } from 'react-native';
const qs = require('qs');

const GoogleAuth = () => {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'your-web-client-id',
        iosClientId: 'your-ios-client-id',
        androidClientId: 'your-android-client-id',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            //@ts-ignore
            const { accessToken } = authentication;

            const getData = async () => {
                await axios.get(`https:www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
                    .then(async res => {
                        const result = res.data;
                        const { email, picture, name } = result;

                        const url = `http://your-api/social-auth`;
                        await axios.post(url, qs.stringify({ email, picture, name }), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        })
                            .then(async res => {
                                const result = res.data.data;
                                const { accessToken, refreshToken } = result;

                                persistTokens(accessToken, refreshToken);
                            })
                            .catch((error: any) => {
                                if (error.response) {
                                    Alert.alert(error.response.data.error.message);
                                } else {
                                    Alert.alert(error.message);
                                }
                            })

                    })
                    .catch(error => {
                        Alert.alert(error.message);
                    });
            }

            getData();
        }
    }, [response]);


    return (
        <SocialAuthBtn
            disabled={!request}
            onPress={() => {
                promptAsync()
            }}
        >
            <SocialAuthLogo source={require('../../../assets/google-logo.png')} />
        </SocialAuthBtn>
    )
}

export default GoogleAuth;

