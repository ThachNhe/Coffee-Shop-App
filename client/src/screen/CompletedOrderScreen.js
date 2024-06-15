import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import GradientBGIcon from '../components/GradientBGIcon';
import { useFonts } from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
const CompletedOrderScreen = ({ navigation }) => {
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

    const [showAnimation, setShowAnimation] = useState(false);
    const CartList = useSelector((state) => state.CartList);
    const userInfo = useSelector((state) => state.userInfo);
    const CartPrice = useSelector((state) => state.CartPrice);

    const OrderDate = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();

    /// select product to review
    const [CompletedPayment, setCompletedPayment] = useState([]);
    const AllPaymentListRedux = useSelector((state) => state.AllPaymentList);
    const [AllPaymentList, setAllPaymentList] = useState([]);

    useEffect(() => {
        dispatch(actions.getAllPaymentByUserIdAction(userInfo.user?._id));
    }, [dispatch]);
    useEffect(() => {
        if (AllPaymentListRedux && AllPaymentListRedux.payments && AllPaymentListRedux.payments.length > 0) {
            setAllPaymentList(AllPaymentListRedux.payments);
        }
    }, [AllPaymentListRedux]);
    /////
    useEffect(() => {
        if (AllPaymentList && AllPaymentList.length > 0) {
            const DeliveringPaymentFilter = AllPaymentList.filter((payment) => payment.status === 'completed');
            setCompletedPayment(DeliveringPaymentFilter);
            console.log('check DeliveringPaymentFilter : ', DeliveringPaymentFilter);
        }
    }, [AllPaymentList]);
    ///
    console.log('check CompletedPayment : ', CompletedPayment);

    const navigationHandler = ({ index, id, type }) => {
        navigation.push('Details', {
            index,
            id,
            type,
        });
    };

    return (
        <View style={styles.ScreenContainer}>
            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/download.json')} />
            ) : (
                <></>
            )}

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
                            <Text style={styles.HeaderText}> Completed Orders</Text>
                            <View style={styles.EmptyView} />
                        </View>
                        {CompletedPayment &&
                            CompletedPayment.length > 0 &&
                            CompletedPayment.map((order, index) => {
                                return (
                                    <OrderHistoryCard
                                        key={index}
                                        navigationHandler={navigationHandler}
                                        CartList={order.products}
                                        CartListPrice={order.total_price}
                                        OrderDate={OrderDate}
                                        type={'COMPLETE_SCREEN'}
                                        dataDrop={order.products}
                                        SizeType={1}
                                    />
                                );
                            })}
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
        paddingHorizontal: Spacing.space_10,
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

export default CompletedOrderScreen;
