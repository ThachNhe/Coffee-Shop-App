import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import OrderItemCard from './OrderItemCard';
import { useFonts } from 'expo-font';
import { BorderRadius } from '../theme/theme';
const ItemPayment = ({ navigationHandler, CartList, CartListPrice, OrderDate, type }) => {
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
    // console.log('====================================');
    // console.log('Check cartlist in orderhostorycart  :', CartList);
    // console.log('====================================');
    const prices = [
        { price: 5, size: 'M', quantity: 1, currency: '$' },
        { price: 2, size: 'S', quantity: 3, currency: '$' },
    ];
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View>
                    <Text style={styles.HeaderTitle}>Order Item</Text>
                    {/* <Text style={styles.HeaderSubtitle}>{OrderDate}</Text> */}
                </View>
                {/* <View style={styles.PriceContainer}>
                    <Text style={styles.HeaderTitle}>Total Amount</Text>
                    <Text style={styles.HeaderPrice}>$ {CartListPrice}</Text>
                </View> */}
            </View>
            <View style={styles.ListContainer}>
                {CartList.map((data, index) => (
                    <TouchableOpacity
                        key={index.toString() + data.id}
                        onPress={() => {
                            navigationHandler({
                                index: 1,
                                id: data.product_id,
                                type: data.type,
                            });
                        }}
                    >
                        <OrderItemCard
                            type={data.type}
                            name={data.name}
                            imagelink_square={data.imagelink_square}
                            special_ingredient={data.special_ingredient}
                            prices={[
                                { price: 5, size: 'M', quantity: 1, currency: '$' },
                                { price: 2, size: 'S', quantity: 3, currency: '$' },
                            ]}
                            price={data.size.price}
                            quantity={data.quantity}
                            size={data.size.size}
                            ItemPrice={data.ItemPrice}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            {type === 'ORDER_SCREEN' && (
                <TouchableOpacity
                    style={styles.DownloadButton}
                    onPress={() => {
                        buttonPressHandler();
                    }}
                >
                    <Text style={styles.ButtonText}>Cancel Order</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        gap: Spacing.space_10,
    },
    ButtonText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    DownloadButton: {
        margin: Spacing.space_20,
        backgroundColor: Colors.primaryRedHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing.space_24 * 2,
        borderRadius: BorderRadius.radius_20,
    },
    CardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.space_20,
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    HeaderSubtitle: {
        fontFamily: 'poppins_light',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    PriceContainer: {
        alignItems: 'flex-end',
    },
    HeaderPrice: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
    ListContainer: {
        gap: Spacing.space_20,
    },
});

export default ItemPayment;
