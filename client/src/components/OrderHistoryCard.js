import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import OrderItemCard from './OrderItemCard';
import { useFonts } from 'expo-font';
const OrderHistoryCard = ({ navigationHandler, CartList, CartListPrice, OrderDate }) => {
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
    console.log('====================================');
    console.log('Check cartlist in orderhostorycart  :', CartList);
    console.log('====================================');
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View>
                    <Text style={styles.HeaderTitle}>Order Time</Text>
                    <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
                </View>
                <View style={styles.PriceContainer}>
                    <Text style={styles.HeaderTitle}>Total Amount</Text>
                    <Text style={styles.HeaderPrice}>$ {CartListPrice}</Text>
                </View>
            </View>
            <View style={styles.ListContainer}>
                {CartList.map((data, index) => (
                    <TouchableOpacity
                        key={index.toString() + data.id}
                        onPress={() => {
                            navigationHandler({
                                index: data.index,
                                id: data.id,
                                type: data.type,
                            });
                        }}
                    >
                        <OrderItemCard
                            type={data.type}
                            name={data.name}
                            imagelink_square={data.imagelink_square}
                            special_ingredient={data.special_ingredient}
                            prices={data.prices}
                            ItemPrice={data.ItemPrice}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        gap: Spacing.space_10,
    },
    CardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.space_20,
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
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

export default OrderHistoryCard;
