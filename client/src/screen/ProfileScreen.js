import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
const ProfileScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.personalInfoContainer}>
                <Text style={styles.tileAccount}>ACCOUNT</Text>
                <View style={styles.personalInfoContent}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/app_images/me.jpg')} style={styles.image} />
                    </View>
                    <View style={styles.personalInfo}>
                        <Text style={styles.fullNameText}>Đinh Văn Thạch</Text>
                        <Text style={styles.gmailText}>thachdinh110902@gmail.com</Text>
                    </View>
                </View>
            </View>

            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.LinearGradientStyleAccountSetting}
                colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
            >
                <View style={styles.OrderInfoContainer}>
                    <View>
                        <Text style={styles.orderHistoryText}>Order History</Text>
                        <View style={styles.orderHistoryContainer}>
                            <View style={styles.orderItem}></View>
                            <View style={styles.orderItem}></View>
                            <View style={styles.orderItem}></View>
                            <View style={styles.orderItem}></View>
                        </View>
                    </View>
                    <View style={styles.accountSettingContainer}>
                        <Text style={styles.orderHistoryText}>Account Settings</Text>
                        <View style={styles.accountSettingContent}>
                            <View style={styles.accountSettingItemContainer}>
                                <View style={styles.accountSettingItem}></View>
                                <View style={styles.descriptionSettings}>
                                    <Text style={styles.SettingName}>My address</Text>
                                    <Text style={styles.descriptionText}>Set shopping delivery address</Text>
                                </View>
                            </View>
                            <View style={styles.accountSettingItemContainer}>
                                <View style={styles.accountSettingItem}></View>
                                <View style={styles.descriptionSettings}>
                                    <Text style={styles.SettingName}>My address</Text>
                                    <Text style={styles.descriptionText}>Set shopping delivery address</Text>
                                </View>
                            </View>
                            <View style={styles.accountSettingItemContainer}>
                                <View style={styles.accountSettingItem}></View>
                                <View style={styles.descriptionSettings}>
                                    <Text style={styles.SettingName}>My Cart</Text>
                                    <Text style={styles.descriptionText}>Add remove products and move to checkout</Text>
                                </View>
                            </View>
                            <View style={styles.accountSettingItemContainer}>
                                <View style={styles.accountSettingItem}></View>
                                <View style={styles.descriptionSettings}>
                                    <Text style={styles.SettingName}>My Orders</Text>
                                    <Text style={styles.descriptionText}>In-progress and completed orders </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.LogoutContainer}>
                    <TouchableOpacity style={styles.PayButton}>
                        <Text style={styles.ButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        // paddingTop: StatusBar.currentHeight + 2,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    tileAccount: {
        paddingLeft: Spacing.space_20,
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_20,
        color: Colors.primaryWhiteHex,
    },
    personalInfoContent: {
        flexDirection: 'row',
        gap: Spacing.space_20,
        paddingTop: Spacing.space_4,
        paddingLeft: Spacing.space_20,
        justifyContent: 'Center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },

    LinearGradientStyleAccountSetting: {
        gap: Spacing.space_36,
        paddingVertical: Spacing.space_10,
        borderTopLeftRadius: Spacing.space_36,
        borderTopRightRadius: Spacing.space_36,
    },
    orderHistoryText: {
        fontFamily: 'poppins_medium',
        paddingLeft: Spacing.space_20,
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_4,
    },
    imageContainer: {
        height: Spacing.space_36 * 2,
        width: Spacing.space_36 * 2,
        borderRadius: Spacing.space_36,
        borderWidth: 2,
        borderColor: Colors.secondaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        height: Spacing.space_36 * 2,
        width: Spacing.space_36 * 2,
    },
    personalInfoContainer: {
        flexDirection: 'colum',
        paddingVertical: Spacing.space_10,
    },

    fullNameText: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_4,
    },
    gmailText: {
        color: Colors.primaryLightGreyHex,
    },
    OrderInfoContainer: {
        paddingVertical: Spacing.space_30,
        flexDirection: 'colum',
    },
    orderHistoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    accountSettingContainer: {
        flexDirection: 'column',
        paddingTop: Spacing.space_30,
    },
    accountSettingContent: {
        flexDirection: 'column',
        paddingHorizontal: Spacing.space_20,
        gap: Spacing.space_20,
    },
    orderItem: {
        height: Spacing.space_36,
        width: Spacing.space_36,
        backgroundColor: 'red',
    },
    accountSettingItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.space_15,
    },
    accountSettingItem: {
        height: Spacing.space_36,
        width: Spacing.space_36,
        backgroundColor: 'gray',
    },
    SettingName: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_4,
    },
    descriptionText: {
        fontFamily: 'poppins_medium',

        fontSize: FontSize.size_12,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_4,
    },
    LogoutContainer: {
        height: 92,
        // backgroundColor: 'blue',
        paddingHorizontal: Spacing.space_30,
    },
    PayButton: {
        backgroundColor: Colors.primaryGreyHex,
        // flex: 1,s
        paddingVertical: Spacing.space_20,
        alignItems: 'center',
        justifyContent: 'center',
        // height: Spacing.space_36,
        borderRadius: BorderRadius.radius_20,
    },
    ButtonText: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_4,
    },
    StyleBorderAccountSetting: {
        borderTopLeftRadius: Spacing.space_36,
        borderTopRightRadius: Spacing.space_36,
    },
});

export default ProfileScreen;
