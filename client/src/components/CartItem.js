import React from 'react';
import { StyleSheet, Text, View, ImageProps, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
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
        id,
        name,
        imagelink_square,
        special_ingredient,
        roasted,
        prices,
        type,
        incrementCartItemQuantityHandler,
        decrementCartItemQuantityHandler,
    } = props;
    return (
        <View>
            {prices.length != 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                    style={styles.CartItemLinearGradient}
                >
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data, index) => (
                        <View key={index.toString()} style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text
                                        style={[
                                            styles.SizeText,
                                            {
                                                fontSize: type == 'Bean' ? FontSize.size_12 : FontSize.size_16,
                                            },
                                        ]}
                                    >
                                        {data.size}
                                    </Text>
                                </View>
                                <Text style={styles.SizeCurrency}>
                                    {data.currency}
                                    <Text style={styles.SizePrice}> {data.price}</Text>
                                </Text>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => {
                                        decrementCartItemQuantityHandler(id, data.size);
                                    }}
                                >
                                    <CustomIcon name="minus" color={Colors.primaryWhiteHex} size={FontSize.size_10} />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>{data.quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => {
                                        incrementCartItemQuantityHandler(id, data.size);
                                    }}
                                >
                                    <CustomIcon name="add" color={Colors.primaryWhiteHex} size={FontSize.size_10} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                    style={styles.CartItemSingleLinearGradient}
                >
                    <View>
                        <Image source={imagelink_square} style={styles.CartItemSingleImage} />
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
                                    {prices[0].size}
                                </Text>
                            </View>
                            <Text style={styles.SizeCurrency}>
                                {prices[0].currency}
                                <Text style={styles.SizePrice}> {prices[0].price}</Text>
                            </Text>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    decrementCartItemQuantityHandler(id, prices[0].size);
                                }}
                            >
                                <CustomIcon name="minus" color={Colors.primaryWhiteHex} size={FontSize.size_10} />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>{prices[0].quantity}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    incrementCartItemQuantityHandler(id, prices[0].size);
                                }}
                            >
                                <CustomIcon name="add" color={Colors.primaryWhiteHex} size={FontSize.size_10} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
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
        fontFamily: "poppins_medium",
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    CartItemSubtitle: {
        fontFamily: "poppins_regular",
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
        fontFamily: "poppins_regular",
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
        fontFamily: "poppins_medium",
        color: Colors.secondaryLightGreyHex,
    },
    SizeCurrency: {
        fontFamily: "poppins_semibold",
        FontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
    SizePrice: {
        color: Colors.primaryWhiteHex,
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
        fontFamily: "poppins_semibold",
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
