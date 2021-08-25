import React, { useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Colors } from '../../styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import persistTokens from '../../components/PersistTokens'

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
    ForgotPassword,
    ErrorMessage,
    Line,
    SocialAuthContainer,
} from './SignInStyle';
import axios from 'axios';
const qs = require('qs');

import GoogleAuth from '../../components/SocialAuth/GoogleAuth';
import AppleAuth from '../../components/SocialAuth/AppleAuth';
import FacebookAuth from '../../components/SocialAuth/FacebookAuth';

export interface IInputProps {
    isFocused?: boolean | null;
    isBlur?: boolean | null;
};

const SignIn = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
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

    const handleLogin = async () => {
        const params = { username, password };
        const url = `http://your-api/login`;

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
                    <MainTitle>Welcome back</MainTitle>
                    <SubTitle>Account Login</SubTitle>

                    <InputBg
                        focused={usrOptions.isFocused}
                    >
                        <InputLabel focused={username.length > 0 || usrOptions.isFocused}>Username</InputLabel>
                        <Input
                            value={username}
                            onChangeText={text => {
                                setUsername(text)
                                clearError();
                            }}
                            onBlur={() => setUsrOptions({ isBlur: true })}
                            onFocus={() => setUsrOptions({ isFocused: true })}
                            placeholder={usrOptions.isFocused ? "" : "Username"}
                            placeholderTextColor={Colors.darkLight}
                            textContentType="username"
                            keyboardAppearance={'dark'}
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
                            keyboardAppearance={'dark'}
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
                    <ForgotPassword>Forgot Password?</ForgotPassword>

                    {
                        errorMessage && (
                            <ErrorMessage
                                isLogin={true}
                            >{errorMessage}</ErrorMessage>
                        )
                    }

                    <SubmitBtn
                        isLogin={true}
                        filled={username.length > 1 && password.length > 5}
                        disabled={username.length < 2 || password.length < 6}
                        onPress={handleLogin}
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
                        Don't have an account?
                        <BottomText
                            onPress={() => {
                                navigation.navigate('SignUp');
                            }}
                            link={true}
                        >
                            {' '}Sign Up
                        </BottomText>
                    </BottomText>
                </SubContainer>
            </MainContainer>
        </>
    )
}

export default SignIn;

