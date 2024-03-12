import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../theme/theme';
const HomeScreen = () => {
    return (
        <View style={styles.ScreenContainer}>
            <Text>HomeScreen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
});
export default HomeScreen;
