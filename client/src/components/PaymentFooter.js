import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import { useFonts } from 'expo-font';

const PaymentFooter = ({
    price,
    buttonPressHandler,
    buttonTitle,
    amount,
    description,
    returnUrl,
    cancelUrl,
    products,
}) => {
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
    // let amountTotal = amount * 100;
    // console.log('====================================');
    // console.log('check PPPPPPPP : ', products);
    // console.log('====================================');
    return (
        <View style={styles.PriceFooter}>
            <View style={styles.PriceContainer}>
                <Text style={styles.PriceTitle}>Price</Text>
                <Text style={styles.PriceText}>
                    {price.currency} <Text style={styles.Price}>{price.price}</Text>
                </Text>
            </View>
            <TouchableOpacity
                style={styles.PayButton}
                onPress={() => buttonPressHandler({ amount, description, returnUrl, cancelUrl, products })}
            >
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.space_20,
        padding: Spacing.space_20,
        marginBottom: 15,
    },
    PriceContainer: {
        alignItems: 'center',
        width: 100,
    },
    PriceTitle: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_14,
        color: Colors.secondaryLightGreyHex,
    },
    PriceText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_24,
        color: Colors.primaryOrangeHex,
    },
    Price: {
        color: Colors.primaryWhiteHex,
    },
    PayButton: {
        backgroundColor: Colors.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing.space_36 * 2,
        borderRadius: BorderRadius.radius_20,
    },
    ButtonText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
});

export default PaymentFooter;
