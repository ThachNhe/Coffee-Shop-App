import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageProps, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import CustomIcon from './CustomIcon';
import { useFonts } from 'expo-font';
const CartItem = (props) => {
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

    const {
        name,
        imagelink_square,
        special_ingredient,
        size,
        quantity,
        roasted,
        type,
        incrementCartItemQuantityHandler,
        productId,
        decrementCartItemQuantityHandler,
        price,
        currency,
    } = props;

    const image = {
        uri: imagelink_square ? String(imagelink_square) : 'OKOK',
    };
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                style={styles.CartItemSingleLinearGradient}
            >
                <View>
                    <Image source={image} style={styles.CartItemSingleImage} />
                </View>
                <View style={styles.CartItemSingleInfoContainer}>
                    <View>
                        <Text style={styles.CartItemTitle}>{name}</Text>
                        <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                    </View>
                    <View style={styles.CartItemSingleSizeValueContainer}>
                        <View style={styles.SizeBox}>
                            <Text
                                style={[
                                    styles.SizeText,
                                    {
                                        fontSize: type == 'Bean' ? FontSize.size_12 : FontSize.size_16,
                                    },
                                ]}
                            >
                                {size}
                            </Text>
                        </View>
                        <Text style={styles.SizeCurrency}>
                            {currency}
                            <Text style={styles.SizePrice}> {price}</Text>
                        </Text>
                    </View>
                    <View style={styles.CartItemSingleQuantityContainer}>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                decrementCartItemQuantityHandler(productId, quantity, size, name);
                            }}
                        >
                            <CustomIcon name="minus" color={Colors.primaryWhiteHex} size={FontSize.size_10} />
                        </TouchableOpacity>
                        <View style={styles.CartItemQuantityContainer}>
                            <Text style={styles.CartItemQuantityText}>{quantity}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                incrementCartItemQuantityHandler(productId, quantity, size, name);
                            }}
                        >
                            <CustomIcon name="add" color={Colors.primaryWhiteHex} size={FontSize.size_10} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: Spacing.space_12,
        padding: Spacing.space_12,
        borderRadius: BorderRadius.radius_25,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: Spacing.space_30,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BorderRadius.radius_20,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: Spacing.space_4,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    CartItemSubtitle: {
        fontFamily: 'poppins_regular',
        FontSize: FontSize.size_12,
        color: Colors.secondaryLightGreyHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + Spacing.space_20,
        borderRadius: BorderRadius.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_10,
        color: Colors.primaryWhiteHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: Spacing.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: Colors.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BorderRadius.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: 'poppins_medium',
        color: Colors.secondaryLightGreyHex,
    },
    SizeCurrency: {
        fontFamily: 'poppins_semibold',
        FontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
    SizePrice: {
        fontFamily: 'poppins_medium',
        color: Colors.primaryWhiteHex,
        fontSize: FontSize.size_16,
    },
    CartItemIcon: {
        backgroundColor: Colors.primaryOrangeHex,
        padding: Spacing.space_12,
        borderRadius: BorderRadius.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: Colors.primaryBlackHex,
        width: 80,
        borderRadius: BorderRadius.radius_10,
        borderWidth: 2,
        borderColor: Colors.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: Spacing.space_4,
    },
    CartItemQuantityText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.space_12,
        gap: Spacing.space_12,
        borderRadius: BorderRadius.radius_25,
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BorderRadius.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default CartItem;
