import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import OrderItemCard from './OrderItemCard';

const OrderHistoryCard = ({ navigationHandler, CartList, CartListPrice, OrderDate }) => {
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
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    HeaderSubtitle: {
        fontFamily: FontFamily.poppins_light,
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    PriceContainer: {
        alignItems: 'flex-end',
    },
    HeaderPrice: {
        fontFamily: FontFamily.poppins_medium,
        fontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
    ListContainer: {
        gap: Spacing.space_20,
    },
});

export default OrderHistoryCard;
