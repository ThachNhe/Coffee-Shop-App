import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopUpAnimation from '../components/PopUpAnimation';
const AddressScreen = ({ navigation, route }) => {
    const [showAnimation, setShowAnimation] = useState(false);
    return (
        <View style={styles.ScreenContainer}>
            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} />
            ) : (
                <></>
            )}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop();
                        }}
                    >
                        <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>Address</Text>
                    <View style={styles.EmptyView} />
                </View>
                <View style={styles.addressContainer}>
                    <TouchableOpacity style={styles.addressBox}>
                        <View style={styles.checkBoxAndNameContainer}>
                            <Text style={styles.userName}>Đinh Văn Thạch</Text>
                            <Icon name="check-circle" size={30} style={styles.checkBoxStyle} />
                        </View>
                        <Text style={styles.userPhone}>0846236478</Text>
                        <Text style={styles.userAddress}>
                            Kí túc xã Ngoại Ngữ, số 2 Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addressBox}>
                        <View style={styles.checkBoxAndNameContainer}>
                            <Text style={styles.userName}>Đinh Văn Thạch</Text>
                            <Icon name="check-circle" size={30} style={styles.iconHistoryStyle} />
                        </View>
                        <Text style={styles.userPhone}>0846236478</Text>
                        <Text style={styles.userAddress}>
                            Kí túc xã Ngoại Ngữ, số 2 Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.addAddressContainer}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Icon name="plus" size={25} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        paddingTop: StatusBar.currentHeight + 2,
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    HeaderContainer: {
        paddingHorizontal: Spacing.space_24,
        paddingVertical: Spacing.space_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    HeaderText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_20,
        color: Colors.primaryWhiteHex,
    },
    EmptyView: {
        height: Spacing.space_36,
        width: Spacing.space_36,
    },
    addressContainer: {
        marginHorizontal: Spacing.space_20,
        flexDirection: 'column',
        gap: Spacing.space_12,
    },
    checkBoxAndNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userName: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    userPhone: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
    },
    userAddress: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_4,
    },
    addressBox: {
        borderRadius: BorderRadius.radius_25,
        padding: Spacing.space_15,
        backgroundColor: Colors.primaryDarkGreyHex,
    },
    checkBoxStyle: {
        color: Colors.primaryOrangeHex,
    },
    addAddressContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'relative',
        // backgroundColor: 'blue',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Spacing.space_28 * 2,
        width: Spacing.space_28 * 2,
        backgroundColor: Colors.primaryLightGreyHex,
        marginRight: Spacing.space_20,
        marginBottom: Spacing.space_20,
        borderRadius: BorderRadius.radius_10,
    },
    icon: {
        color: Colors.primaryWhiteHex,
    },
});

export default AddressScreen;
