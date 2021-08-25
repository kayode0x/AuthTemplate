import React, { useEffect } from 'react'
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
import * as Facebook from 'expo-auth-session/providers/facebook';
import persistTokens from '../PersistTokens';
import { SocialAuthBtn, SocialAuthLogo } from '../../screens/SignIn/SignInStyle';
import { Alert } from 'react-native';
const qs = require('qs');

const FacebookAuth = () => {

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: 'your-client-id',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;

            const url = `https://graph.facebook.com/me?fields=name,email&access_token=${authentication!.accessToken}`;

            const getData = async () => {
                await axios.get(url)
                    .then(async res => {
                        const result = res.data;
                        const { email, name } = result;
                        const url = `http://your-api/social-auth`;
                        await axios.post(url, qs.stringify({ email, name }), {
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
                                    Alert.alert(error.response.data.message);
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
            <SocialAuthLogo source={require('../../../assets/fb.png')} />
        </SocialAuthBtn>
    )
}

export default FacebookAuth;

