import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { Colors, FontFamily, FontSize } from '../theme/theme';
import { useFonts } from 'expo-font';

const EmptyListAnimation = ({ title }) => {
    const [fontsLoad] = useFonts({
        poppins_semibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        poppins_medium: require('../assets/fonts/Poppins-Medium.ttf'),
        poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
        poppins_black: require('../assets/fonts/Poppins-Black.ttf'),
        poppins_bold: require('../assets/fonts/Poppins-Bold.ttf'),
        poppins_extrabold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
        poppins_extralight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
        poppins_regular: require('../assets/fonts/Poppins-Regular.ttf'),
        poppins_thin: require('../assets/fonts/Poppins-Thin.ttf'),
    });
    
    return (
        <View style={styles.EmptyCartContainer}>
            <LottieView style={styles.LottieStyle} source={require('../lottie/coffeecup.json')} autoPlay loop />
            <Text style={styles.LottieText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    LottieStyle: {
        height: 300,
    },
    LottieText: {
        fontFamily: "poppins_medium",
        fontSize: FontSize.size_16,
        color: Colors.primaryOrangeHex,
        textAlign: 'center',
    },
});

export default EmptyListAnimation;
