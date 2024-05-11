import { StyleSheet, Text, View, ImageProps, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';

//

const OrderItemCard = ({ type, name, imagelink_square, special_ingredient, prices, ItemPrice }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
            style={styles.CardLinearGradient}
        >
            <View style={styles.CardInfoContainer}>
                <View style={styles.CardImageInfoContainer}>
                    <Image source={imagelink_square} style={styles.Image} />
                    <View>
                        <Text style={styles.CardTitle}>{name}</Text>
                        <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.CardCurrency}>
                        $ <Text style={styles.CardPrice}>{ItemPrice}</Text>
                    </Text>
                </View>
            </View>
            {prices.map((data, index) => (
                <View key={index.toString()} style={styles.CardTableRow}>
                    <View style={styles.CardTableRow}>
                        <View style={styles.SizeBoxLeft}>
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
                        <View style={styles.PriceBoxRight}>
                            <Text style={styles.PriceCurrency}>
                                {data.currency}
                                <Text style={styles.Price}> {data.price}</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.CardTableRow}>
                        <Text style={styles.CardQuantityPriceText}>
                            X <Text style={styles.Price}>{data.quantity}</Text>
                        </Text>
                        <Text style={styles.CardQuantityPriceText}>
                            $ {(data.quantity * data.price).toFixed(2).toString()}
                        </Text>
                    </View>
                </View>
            ))}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    CardLinearGradient: {
        gap: Spacing.space_20,
        padding: Spacing.space_20,
        borderRadius: BorderRadius.radius_25,
    },
    CardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CardImageInfoContainer: {
        flexDirection: 'row',
        gap: Spacing.space_20,
        alignItems: 'center',
    },
    Image: {
        height: 90,
        width: 90,
        borderRadius: BorderRadius.radius_15,
    },
    CardTitle: {
        fontFamily: FontFamily.poppins_medium,
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    CardSubtitle: {
        fontFamily: FontFamily.poppins_regular,
        fontSize: FontSize.size_12,
        color: Colors.secondaryLightGreyHex,
    },
    CardCurrency: {
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_20,
        color: Colors.primaryOrangeHex,
    },
    CardPrice: {
        color: Colors.primaryWhiteHex,
    },
    CardTableRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBoxLeft: {
        backgroundColor: Colors.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopLeftRadius: BorderRadius.radius_10,
        borderBottomLeftRadius: BorderRadius.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: Colors.primaryGreyHex,
    },
    SizeText: {
        fontFamily: FontFamily.poppins_medium,
        color: Colors.secondaryLightGreyHex,
    },
    PriceBoxRight: {
        backgroundColor: Colors.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopRightRadius: BorderRadius.radius_10,
        borderBottomRightRadius: BorderRadius.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: Colors.primaryGreyHex,
    },
    PriceCurrency: {
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
    Price: {
        color: Colors.primaryWhiteHex,
    },
    CardQuantityPriceText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
});

export default OrderItemCard;
