import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({ navigation }) => {
    const OrderHistoryList = useStore((state) => state.OrderHistoryList);
    const tabBarHeight = useBottomTabBarHeight();
    const [showAnimation, setShowAnimation] = useState(false);

    const navigationHandler = ({ index, id, type }) => {
        navigation.push('Details', {
            index,
            id,
            type,
        });
    };

    const buttonPressHandler = () => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 2000);
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={Colors.primaryBlackHex} />

            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/download.json')} />
            ) : (
                <></>
            )}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Order History" />

                        {OrderHistoryList.length == 0 ? (
                            <EmptyListAnimation title={'No Order History'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {OrderHistoryList.map((data, index) => (
                                    <OrderHistoryCard
                                        key={index.toString()}
                                        navigationHandler={navigationHandler}
                                        CartList={data.CartList}
                                        CartListPrice={data.CartListPrice}
                                        OrderDate={data.OrderDate}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                    {OrderHistoryList.length > 0 ? (
                        <TouchableOpacity
                            style={styles.DownloadButton}
                            onPress={() => {
                                buttonPressHandler();
                            }}
                        >
                            <Text style={styles.ButtonText}>Download</Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    LottieAnimation: {
        height: 250,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: Spacing.space_20,
        gap: Spacing.space_30,
    },
    DownloadButton: {
        margin: Spacing.space_20,
        backgroundColor: Colors.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing.space_36 * 2,
        borderRadius: BorderRadius.radius_20,
    },
    ButtonText: {
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
});

export default OrderHistoryScreen;
