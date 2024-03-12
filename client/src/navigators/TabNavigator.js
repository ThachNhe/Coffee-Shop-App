import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/theme';
import { BlurView } from 'expo-blur';
// import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screen/HomeScreen';
import FavoritesScreen from '../screen/FavoritesScreen';
import CartScreen from '../screen/CartScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrderHistoryScreen from '../screen/OrderHistoryScreen';
import { Fontisto } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="home"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="opencart"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="History"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="bell"
                            size={25}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Favorite"
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Fontisto
                            name="person"
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
        flex: 1,
        // padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
        // backgroundColor: 'white',
    },
});

export default TabNavigator;
