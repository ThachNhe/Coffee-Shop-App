import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screen/HomeScreen';
import FavoritesScreen from '../screen/FavoritesScreen';
import CartScreen from '../screen/CartScreen';
import OrderHistoryScreen from '../screen/OrderHistoryScreen';
import CustomIcon from '../components/CustomIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                // tabBarBackground: () => <BlurView overlayColor="" blurAmount={15} style={styles.BlurViewStyles} />,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{}}></Tab.Screen>
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                // options={{
                //     tabBarIcon: ({ focused, color, size }) => (
                //         <Icon.Button name="facebook" backgroundColor="#3b5998"></Icon.Button>
                //     ),
                // }}
            ></Tab.Screen>
            <Tab.Screen name="History" component={FavoritesScreen} options={{}}></Tab.Screen>
            <Tab.Screen name="Favorite" component={OrderHistoryScreen} options={{}}></Tab.Screen>
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

export default TabNavigator;
