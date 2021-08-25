import React from 'react'
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
import * as AppleAuthentication from 'expo-apple-authentication';
import persistTokens from '../PersistTokens';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Alert } from 'react-native';
const qs = require('qs');

const AppleAuth = () => {

    const authenticate = async (email: string, name: string | null) => {
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
    }

    return (

        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{ width: 200, height: 44 }}
            onPress={async () => {
                try {
                    const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });

                    const { email, fullName, identityToken } = credential;
                    // @ts-ignore
                    const { givenName } = fullName;

                    const token: string | null = identityToken;
                    const decoded = jwtDecode<JwtPayload>(token!);

                    // @ts-ignore
                    const email_jwt = decoded.email;

                    if (email) {
                        await authenticate(email, givenName);
                    } else {
                        await authenticate(email_jwt, null);
                    }

                } catch (e: any) {
                    if (e.code === 'ERR_CANCELED') {
                        Alert.alert("Canceled");
                    } else {
                        Alert.alert(e.message);
                    }
                }
            }}
        />
    )
}

export default AppleAuth;

