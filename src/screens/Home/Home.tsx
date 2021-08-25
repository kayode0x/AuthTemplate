import React from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    HomeContainer,
    SubContainer,
    MainTitle,
    SubTitle,
    SubmitBtn,
    SubmitBtnText,
    DisplayPic
} from './HomeStyle';
import useFetch from '../../components/UseFetch';
import AuthStore from '../../stores/AuthStore';
import UserStore from '../../stores/UserStore';
import { snapshot } from 'valtio';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const snap = snapshot(UserStore);
    const { name, username, email, avatar } = snap;

    const url = `http://your-api/user`;
    const { data, loading, error, update } = useFetch(url);

    if (data) {
        UserStore.name = data['name'];
        UserStore.username = data['username'];
        UserStore.email = data['email'];
        UserStore.avatar = data['avatar'];
    }

    const updateApi = async () => {
        update()
    }

    if (loading) {
        return (
            <HomeContainer>
                <StatusBar style="dark" />
                <Text>Loading...</Text>
            </HomeContainer>
        );
    }

    if (error) {
        return (
            <HomeContainer>
                <StatusBar style="dark" />
                <SubContainer>
                    <MainTitle>Error: {error}</MainTitle>
                </SubContainer>
            </HomeContainer>
        );
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('refreshToken')
            .then(() => AuthStore.accessToken = null);
    }

    return (
        <HomeContainer>
            <StatusBar style="dark" />
            <SubContainer>
                <DisplayPic resizeMode="cover" source={{ uri: avatar ? avatar : 'https://pbs.twimg.com/profile_images/1405623416422555652/qtGPow6f_400x400.jpg' }} />
                <MainTitle>{name ? name : "@" + username}</MainTitle>
                <SubTitle>{username && username }</SubTitle>
                <SubmitBtn
                    onPress={updateApi}
                >
                    <SubmitBtnText>Refresh</SubmitBtnText>
                </SubmitBtn>
                <SubmitBtn
                    onPress={handleLogout}
                >
                    <SubmitBtnText>Log Out</SubmitBtnText>
                </SubmitBtn>
            </SubContainer>
        </HomeContainer>
    )
}

export default Home
