import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar } from 'react-native';
import UserTabNavigator from './src/navigators/UserTabNavigator';
import DetailsScreen from './src/screen/DetailsScreen';
import PaymentScreen from './src/screen/PaymentScreen';
import { Colors } from './src/theme/theme';
import ProfileScreen from './src/screen/ProfileScreen';
import AddressScreen from './src/screen/AddressScreen';
import OrderHistoryScreen from './src/screen/OrderHistoryScreen';
import DeliveringScreen from './src/screen/DeliveringScreen';
import CanceledSCreen from './src/screen/CanceledSCreen';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/redux/store';
import QrCodeScreen from './src/screen/QrCodeScreen';
import LoginScreen from './src/screen/LoginScreen';
import { useSelector } from 'react-redux';
import ReviewScreen from './src/screen/ReviewScreen';
import AddAddressScreen from './src/screen/AddAddressScreen';
import AppNavigation from './src/navigators/AppNavigation';
const Stack = createNativeStackNavigator();
const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    // const userInfo = useSelector((state) => state.userInfo);
    // useEffect(() => {
    //     if (userInfo && userInfo.errCode === 0) {
    //         setIsLogin(true);
    //     }
    // }, [userInfo]);
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <StatusBar backgroundColor={Colors.primaryBlackHex} barStyle="white" />
                <AppNavigation />
                {/* <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="Tab"
                            component={UserTabNavigator}
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
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Address"
                            component={AddressScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="History"
                            component={OrderHistoryScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Delivering"
                            component={DeliveringScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Canceled"
                            component={CanceledSCreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="QRCode"
                            component={QrCodeScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>

                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="Review"
                            component={ReviewScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name="AddAddress"
                            component={AddAddressScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        ></Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer> */}
            </PaperProvider>
        </StoreProvider>
    );
};

const styles = StyleSheet.create({});
export default App;
