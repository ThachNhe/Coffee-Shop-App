import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from '../../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';
const AdminProfileScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const buttonPressHandler = () => {
        navigation.push('Address');
    };
    const userInfo = useSelector((state) => state.userInfo);

    const pressHandlerRedirectCompletedScreen = () => {
        navigation.navigate('completedOrder');
        navigation.navigate('CompletedOrder');
    };
    const pressHandlerRedirectDeliveringScreen = () => {
        navigation.navigate('Delivering');
    };
    const pressHandlerRedirectStaticUser = () => {
        navigation.navigate('StaticUser');
    };
    const handlerLogout = () => {
        dispatch(actions.userLogoutAction());
        navigation.navigate('Login');
    };
    const pressHandlerRedirectConfirScreen = () => {
        navigation.navigate('AdminConfirmationOrder');
    };
    return (
        <View style={styles.screenContainer}>
            <View style={styles.personalInfoContainer}>
                <Text style={styles.tileAccount}>ACCOUNT</Text>
                <View style={styles.personalInfoContent}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/app_images/user.png')} style={styles.image} />
                    </View>
                    <View style={styles.personalInfo}>
                        <Text style={styles.fullNameText}>{userInfo.user?.name}</Text>
                        <Text style={styles.gmailText}>{userInfo.user?.email}</Text>
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
                            <TouchableOpacity
                                style={[styles.orderItem]}
                                onPress={() => navigation.navigate('AddProduct')}
                            >
                                <Icon name="plus" size={30} style={styles.iconHistoryStyle} />
                                <View>
                                    <Text style={styles.descriptionText}>New Product</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderItem}
                                onPress={() => pressHandlerRedirectConfirScreen()}
                            >
                                <Icon name="thumbs-up" size={30} style={styles.iconHistoryStyle} />
                                <View>
                                    <Text style={styles.descriptionText}>Confirmation</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.orderItem} onPress={() => pressHandlerRedirectStaticUser()}>
                                <Icon name="user" size={30} style={styles.iconHistoryStyle} />
                                <View>
                                    <Text style={styles.descriptionText}>Users</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.accountSettingContainer}>
                        <Text style={styles.orderHistoryText}>Account Settings</Text>
                        <View style={styles.accountSettingContent}>
                            <TouchableOpacity
                                style={styles.accountSettingItemContainer}
                                onPress={() => buttonPressHandler()}
                            >
                                <View style={styles.accountSettingItem}>
                                    <Icon name="map-marker" size={25} style={styles.iconSettingAccountStyle} />
                                </View>
                                <View style={styles.descriptionSettings}>
                                    <Text style={styles.SettingName}>My address</Text>
                                    <Text style={styles.descriptionText}>Set shopping delivery address</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.LogoutContainer}>
                    <TouchableOpacity style={styles.PayButton} onPress={() => handlerLogout()}>
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
        flex: 1,
        gap: Spacing.space_36,
        paddingVertical: Spacing.space_10,
        borderTopLeftRadius: Spacing.space_20,
        borderTopRightRadius: Spacing.space_20,
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
    orderItem: {
        alignItems: 'center',
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

    accountSettingItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.space_15,
    },
    accountSettingItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Spacing.space_36,
        width: Spacing.space_36,
        // backgroundColor: 'gray',
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
    descriptionSettings: {
        flexDirection: 'column',
    },
    iconSettingAccountStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        color: Colors.primaryOrangeHex,
    },

    iconHistoryStyle: {
        // paddingLeft: 30,
        color: Colors.primaryOrangeHex,
    },
});

export default AdminProfileScreen;
