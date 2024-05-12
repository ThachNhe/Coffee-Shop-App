import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar } from 'react-native';
import TabNavigator from './src/navigators/TabNavigator';
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
const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <StatusBar backgroundColor={Colors.primaryBlackHex} barStyle="white" />
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
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </StoreProvider>
    );
}

const styles = StyleSheet.create({});
