import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Home from '../screens/home/Home';
import NotesDetails from '../screens/NotesDetails';
import NoteProvider from '../contexts/NoteProvider';

const Routes = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer >
            <NoteProvider>
                <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="NotesDetails" component={NotesDetails} />
                </Stack.Navigator>
            </NoteProvider>
        </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})