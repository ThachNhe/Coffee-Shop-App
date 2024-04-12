import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import CustomIcon from './CustomIcon';

const PaymentMethod = ({ paymentMode, name, icon, isIcon }) => {
    return (
        <View
            style={[
                styles.PaymentCardContainer,
                {
                    borderColor: paymentMode == name ? Colors.primaryOrangeHex : Colors.primaryGreyHex,
                },
            ]}
        >
            {isIcon ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                    style={styles.LinearGradientWallet}
                >
                    <View style={styles.WalletRow}>
                        <CustomIcon name={'wallet'} color={Colors.primaryOrangeHex} size={FontSize.size_30} />
                        <Text style={styles.PaymentTitle}>{name}</Text>
                    </View>
                    <Text style={styles.PaymentPrice}>$ 100.50</Text>
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                    style={styles.LinearGradientRegular}
                >
                    <Image source={icon} style={styles.PaymentImage} />
                    <Text style={styles.PaymentTitle}>{name}</Text>
                </LinearGradient>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    PaymentCardContainer: {
        borderRadius: BorderRadius.radius_15 * 2,
        backgroundColor: Colors.primaryGreyHex,
        borderWidth: 3,
    },
    LinearGradientWallet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.space_12,
        paddingHorizontal: Spacing.space_24,
        gap: Spacing.space_24,
        borderRadius: BorderRadius.radius_15 * 2,
    },
    WalletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.space_24,
    },
    LinearGradientRegular: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.space_12,
        paddingHorizontal: Spacing.space_24,
        gap: Spacing.space_24,
        borderRadius: BorderRadius.radius_15 * 2,
    },
    PaymentTitle: {
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    PaymentPrice: {
        fontFamily: FontFamily.poppins_regular,
        fontSize: FontSize.size_16,
        color: Colors.secondaryLightGreyHex,
    },
    PaymentImage: {
        height: Spacing.space_30,
        width: Spacing.space_30,
    },
});

export default PaymentMethod;
