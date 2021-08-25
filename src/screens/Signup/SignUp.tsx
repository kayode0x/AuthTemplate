import React, { useState } from 'react';
import { Alert, Platform, ActivityIndicator } from 'react-native';
import { Colors } from '../../styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AuthStore from '../../stores/AuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {
    MainContainer,
    SubContainer,
    MainTitle,
    SubTitle,
    InputBg,
    InputLabel,
    Input,
    InputIcon,
    SubmitBtn,
    SubmitBtnText,
    BottomText,
    ErrorMessage,
    SocialAuthContainer,
    Line
} from '../SignIn/SignInStyle';
import axios from 'axios';
import AppleAuth from '../../components/SocialAuth/AppleAuth';
import FacebookAuth from '../../components/SocialAuth/FacebookAuth';
import GoogleAuth from '../../components/SocialAuth/GoogleAuth';
const qs = require('qs');

export interface IInputProps {
    isFocused?: boolean | null;
    isBlur?: boolean | null;
};

const SignUp = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [pwdOptions, setPwdOptions] = useState<IInputProps>({
        isFocused: false,
        isBlur: true,
    });
    const [usrOptions, setUsrOptions] = useState<IInputProps>({
        isFocused: false,
        isBlur: true,
    });

    const [hidePwd, setHidePwd] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSignUp = async () => {
        const params = { email, password };
        const url = `http://your-api/signup`;

        setIsLoading(true);
        await axios.post(url, qs.stringify(params), {
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
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(error.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

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

    const clearError = () => {
        setErrorMessage(null);
    };

    return (
        <>
            <StatusBar style="dark" />
            <MainContainer
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <SubContainer>
                    <MainTitle>Hey newbie :)</MainTitle>
                    <SubTitle>Account SignUp</SubTitle>

                    <InputBg
                        focused={usrOptions.isFocused}
                    >
                        <InputLabel focused={email.length > 0 || usrOptions.isFocused}>Email</InputLabel>
                        <Input
                            value={email}
                            onChangeText={text => {
                                setEmail(text)
                                clearError();
                            }}
                            onBlur={() => setUsrOptions({ isBlur: true })}
                            onFocus={() => setUsrOptions({ isFocused: true })}
                            placeholder={usrOptions.isFocused ? "" : "Email"}
                            placeholderTextColor={Colors.darkLight}
                            textContentType="emailAddress"
                        />
                    </InputBg>

                    <InputBg
                        focused={pwdOptions.isFocused}
                    >
                        <InputLabel focused={password.length > 0 || pwdOptions.isFocused}>Password</InputLabel>
                        <Input
                            value={password}
                            onChangeText={text => {
                                setPassword(text)
                                clearError();
                            }}
                            onBlur={() => setPwdOptions({ isBlur: true })}
                            onFocus={() => setPwdOptions({ isFocused: true })}
                            placeholder={pwdOptions.isFocused ? "" : "Password"}
                            placeholderTextColor={Colors.darkLight}
                            textContentType="password"
                            secureTextEntry={hidePwd}
                        />
                        <InputIcon>
                            <Ionicons
                                onPress={() => setHidePwd(!hidePwd)}
                                name={hidePwd ? 'ios-eye-off' : 'ios-eye'}
                                size={24}
                                color="black"
                            />
                        </InputIcon>
                    </InputBg>

                    {
                        errorMessage && (
                            <ErrorMessage
                                isLogin={false}
                            >{errorMessage}</ErrorMessage>
                        )
                    }

                    <SubmitBtn
                        isLogin={false}
                        filled={email.length > 1 && password.length > 5}
                        disabled={email.length < 2 || password.length < 6}
                        onPress={handleSignUp}
                    >
                        {
                            isLoading ? <ActivityIndicator color={Colors.primary} size="large" /> : <SubmitBtnText>Login</SubmitBtnText>
                        }
                    </SubmitBtn>

                    <Line />

                    <SocialAuthContainer>

                        <GoogleAuth />

                        {
                            Platform.OS == 'ios' ? <AppleAuth /> : null
                        }

                        <FacebookAuth />

                    </SocialAuthContainer>

                    <BottomText>
                        Already have an account?
                        <BottomText 
                            onPress={() => {
                                navigation.navigate('SignIn');
                            }} 
                            link={true}
                        >
                            {' '}Sign In
                        </BottomText>
                    </BottomText>
                </SubContainer>
            </MainContainer>
        </>
    )
}

export default SignUp;

