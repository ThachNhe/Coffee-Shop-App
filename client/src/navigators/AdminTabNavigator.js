import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/theme';
import { BlurView } from 'expo-blur';
import HomeScreen from '../screen/HomeScreen';
import FavouritesScreen from '../screen/FavouritesScreen';
import CartScreen from '../screen/CartScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomIcon from '../components/CustomIcon';
import ProfileScreen from '../screen/ProfileScreen';
import AdminHomeScreen from '../screen/admin/AdminHomeScreen';
import AdminProfileScreen from '../screen/admin/AdminProfileScreen';
const Tab = createBottomTabNavigator();
import AdminStatisticScreen from '../screen/admin/AdminStatisticScreen';
const AdminTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarBackground: () => <BlurView overlayColor="" blurAmount={15} style={styles.BlurViewStyles} />,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name="AdminHome"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon
                            name="home"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Statistic"
                component={AdminStatisticScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="anchor"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>

            <Tab.Screen
                name="Favourite"
                component={FavouritesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon
                            name="like"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>

            <Tab.Screen
                name="Profile"
                component={AdminProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="user"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: Colors.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default AdminTabNavigator;
