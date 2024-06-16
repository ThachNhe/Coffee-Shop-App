import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import GradientBGIcon from '../components/GradientBGIcon';
import { useFonts } from 'expo-font';
import * as actions from '../redux/actions/index';
import { useSelector, useDispatch } from 'react-redux';
const OrderHistoryScreen = ({ navigation }) => {
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
    const dispatch = useDispatch();
    const CartList = useSelector((state) => state.CartList);
    const [CarlistPropPendingOrder, setCarlistPropPendingOrder] = useState(CartList);
    const CartPrice = useSelector((state) => state.CartPrice);
    const isCancel = useSelector((state) => state.isCancelOrder);
    useEffect(() => {
        dispatch(actions.notCancelOrderAction());
    }, []);
    useEffect(() => {
        if (isCancel) {
            console.log('====================================');
            console.log('Cancel Order', isCancel);
            console.log('====================================');
            setCarlistPropPendingOrder([]);
        } else {
            setCarlistPropPendingOrder(CartList);
        }
    }, [isCancel]);
    const OrderDate = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();

    const navigationHandler = ({ index, id, type }) => {
        navigation.push('Details', {
            index,
            id,
            type,
        });
    };
    return (
        <View style={styles.ScreenContainer}>
            {/* {isCancel ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/download.json')} />
            ) : (
                <></>
            )} */}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView]}>
                    <View style={styles.ItemContainer}>
                        <View style={styles.HeaderContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.pop();
                                }}
                            >
                                <GradientBGIcon
                                    name="left"
                                    color={Colors.primaryLightGreyHex}
                                    size={FontSize.size_16}
                                />
                            </TouchableOpacity>
                            <Text style={styles.HeaderText}>Orders</Text>
                            <View style={styles.EmptyView} />
                        </View>
                        {!isCancel && (
                            <OrderHistoryCard
                                key={1}
                                navigationHandler={navigationHandler}
                                CartList={CarlistPropPendingOrder}
                                CartListPrice={CartPrice}
                                OrderDate={OrderDate}
                                type={'ORDER_SCREEN'}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
        paddingHorizontal: Spacing.space_20,
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
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
});

export default OrderHistoryScreen;
