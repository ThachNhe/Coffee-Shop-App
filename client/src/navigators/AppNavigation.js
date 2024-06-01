import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar } from 'react-native';
import DetailsScreen from '../screen/DetailsScreen';
import PaymentScreen from '../screen/PaymentScreen';
import ProfileScreen from '../screen/ProfileScreen';
import AddressScreen from '../screen/AddressScreen';
import OrderHistoryScreen from '../screen/OrderHistoryScreen';
import DeliveringScreen from '../screen/DeliveringScreen';
import CanceledSCreen from '../screen/CanceledSCreen';
import QrCodeScreen from '../screen/QrCodeScreen';
import LoginScreen from '../screen/LoginScreen';
import ReviewScreen from '../screen/ReviewScreen';
import AddAddressScreen from '../screen/AddAddressScreen';
import AddProduct from '../screen/admin/AddProduct';
import { useSelector, useDispatch } from 'react-redux';
import UserTabNavigator from './UserTabNavigator';
import AdminTabNavigator from './AdminTabNavigator';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    const [isLogin, setIsLogin] = useState(false);
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    console.log('check user Tab user role : ', userInfo.user?.role);

    // useEffect(() => {

    // }, [userInfo]);
    var TabNavigator =
        userInfo && userInfo.user && userInfo.user.role === 'admin' ? AdminTabNavigator : UserTabNavigator;
    console.log('check tabNavigator  :', TabNavigator);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Tab"
                    component={TabNavigator}
                    options={{ animation: 'slide_from_bottom' }}
                ></Stack.Screen>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
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
                    name="Review"
                    component={ReviewScreen}
                    options={{ animation: 'slide_from_bottom' }}
                ></Stack.Screen>
                <Stack.Screen
                    name="AddAddress"
                    component={AddAddressScreen}
                    options={{ animation: 'slide_from_bottom' }}
                ></Stack.Screen>
                {/* admin */}
                <Stack.Screen
                    name="AddProduct"
                    component={AddProduct}
                    options={{ animation: 'slide_from_bottom' }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});
export default AppNavigation;
