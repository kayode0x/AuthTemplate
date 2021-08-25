import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStore from '../stores/AuthStore';
import { useSnapshot } from 'valtio';
import Home from '../screens/Home/Home';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/Signup/SignUp';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const snapshot = useSnapshot(AuthStore);
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='SignIn'
            >
                {
                    snapshot.accessToken ? (
                        <>
                            <Stack.Screen options={{
                                headerShown: false
                            }} name="Home" component={Home} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen options={{
                                headerShown: false
                            }} name="SignIn" component={SignIn} />
                            <Stack.Screen options={{
                                headerShown: false
                            }} name="SignUp" component={SignUp} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack
