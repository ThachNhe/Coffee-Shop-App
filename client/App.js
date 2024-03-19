import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './src/navigators/TabNavigator';
import SplashScreen from 'react-native-splash-screen';
import { Colors, FontSize } from './src/theme/theme';
import DetailsScreen from './src/screen/DetailsScreen';
import PaymentScreen from './src/screen/PaymentScreen';
import CustomIcon from './src/components/CustomIcon';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();
export default function App() {
    
    useEffect(() => {
        // SplashScreen.hide();
    }, []);
    return (
        <>
            {/* <CustomIcon name="search" size={25}></CustomIcon> */}
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Tab"
                        component={TabNavigator}
                        options={{ animation: 'slide_from_bottom' }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={{ animation: 'slide_from_bottom' }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Payment"
                        component={PaymentScreen}
                        options={{ animation: 'slide_from_bottom' }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({});
