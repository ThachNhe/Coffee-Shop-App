import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import { LinearGradient } from 'expo-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import PopUpAnimation from '../components/PopUpAnimation';
import { useFonts } from 'expo-font';
import ItemPayment from '../components/ItemPayment';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
const PaymentList = [
    {
        name: 'Wallet',
        icon: 'icon',
        isIcon: true,
    },
    {
        name: 'Google Pay',
        icon: require('../assets/app_images/gpay.png'),
        isIcon: false,
    },
    {
        name: 'Apple Pay',
        icon: require('../assets/app_images/applepay.png'),
        isIcon: false,
    },
];

const PaymentScreen = ({ navigation, route }) => {
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
    const [paymentMode, setPaymentMode] = useState('Credit Card');
    const [showAnimation, setShowAnimation] = useState(false);
    const [addressList, setAddressList] = useState('');
    const [paymentProduct, setPaymentProduct] = useState('');

    const [defaultAddress, setDefaultAddress] = useState('');
    const CartList = useSelector((state) => state.CartList);
    const CartPrice = useSelector((state) => state.CartPrice);
    const OrderDate = useSelector((state) => state.orderDateNow);
    const dispatch = useDispatch();
    const PaymentInfo = useSelector((state) => state.PaymentInfo);
    const userInfo = useSelector((state) => state.userInfo);
    const AddressListRedux = useSelector((state) => state.AddressList);

    useEffect(() => {
        dispatch(actions.getAddressListAction(userInfo.user?._id));
        dispatch(actions.getCartListAction(userInfo.user?._id));
    }, []);
    useEffect(() => {
        console.log('====================================');
        console.log('Pay cart list : ', CartList[0]);
        console.log('====================================');
        if (CartList && CartList.length > 0) {
            const transformedData = CartList.map((product) => {
                return {
                    product_id: product.product_id,
                    size: product.size.size,
                    quantity: product.quantity,
                };
            });

            setPaymentProduct(transformedData);
        }
    }, [CartList]);
    useEffect(() => {
        if (PaymentInfo.qrCode) {
            navigation.navigate('QRCode');
        }
    }, [PaymentInfo]);
    useEffect(() => {
        if (AddressListRedux) setAddressList(AddressListRedux.address);
    }, [AddressListRedux]);
    useEffect(() => {
        if (addressList && addressList.length > 0) {
            const defaultAddress = addressList?.find((address) => address.isDefault === true);
            setDefaultAddress(defaultAddress);
        }
        // const defaultAddress = addressList?.find((address) => address.isDefault === true);
        // setDefaultAddress(defaultAddress);
    }, [addressList]);

    const buttonPressHandler = (data) => {
        console.log('====================================');
        console.log('payment data  :', data);
        console.log('====================================');
        dispatch(actions.createLinkPaymentAction(data));
        console.log('payment info : ', PaymentInfo);
        console.log('====================================');
        console.log('====================================');
        // if (PaymentInfo.qrCode) {
        //     navigation.navigate('QRCode');
        // }
    };

    navigationHandler = () => {};
    return (
        <View style={styles.ScreenContainer}>
            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} />
            ) : (
                <></>
            )}
            {/* <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} /> */}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop();
                        }}
                    >
                        <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>Payments</Text>
                    <View style={styles.EmptyView} />
                </View>
                <View style={styles.orderItemContainer}>
                    <ItemPayment
                        key={1}
                        navigationHandler={navigationHandler}
                        CartList={CartList}
                        CartListPrice={CartPrice}
                        OrderDate={OrderDate}
                    />
                </View>
                <View style={styles.orderItemContainer}>
                    <Text style={styles.AddressTitle}>Shipping address</Text>
                    <TouchableOpacity style={styles.addressBox}>
                        <View style={styles.checkBoxAndNameContainer}>
                            <Text style={styles.userName}>Đinh Văn Thạch</Text>
                        </View>
                        <Text style={styles.userPhone}>Phone: 0846236478</Text>
                        <Text style={styles.userAddress}>{defaultAddress ? defaultAddress.details : 'No address'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderItemContainer}>
                    <View style={styles.FeeContainer}>
                        <Text style={styles.FeeTitle}>Subtotal</Text>
                        <Text style={styles.FeeValue}>${CartPrice}</Text>
                    </View>
                    <View style={styles.FeeContainer}>
                        <Text style={styles.FeeTitle}>Shipping fee</Text>
                        <Text style={styles.FeeValue}>$5</Text>
                    </View>
                    <View style={styles.FeeContainer}>
                        <Text style={styles.FeeTitle}>Voucher discount</Text>
                        <Text style={styles.FeeValue}>$0</Text>
                    </View>
                    <View style={styles.FeeContainer}>
                        <Text style={styles.TotalFeeTitle}>Oder Total</Text>
                        <Text style={styles.TotalFeeValue}>${CartPrice + 5}</Text>
                    </View>
                </View>
                <View style={styles.PaymentOptionsContainer}>
                    <View style={styles.MethodContainer}>
                        <Text style={styles.MethodTitle}>Payment Method</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMode('Credit Card');
                        }}
                    >
                        <View
                            style={[
                                styles.CreditCardContainer,
                                {
                                    borderColor:
                                        paymentMode == 'Credit Card' ? Colors.primaryOrangeHex : Colors.primaryGreyHex,
                                },
                            ]}
                        >
                            <Text style={styles.CreditCardTitle}>Credit Card</Text>
                            <View style={styles.CreditCardBG}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.LinearGradientStyle}
                                    colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                                >
                                    <View style={styles.CreditCardRow}>
                                        <CustomIcon
                                            name="chip"
                                            size={FontSize.size_20 * 2}
                                            color={Colors.primaryOrangeHex}
                                        />
                                        <CustomIcon
                                            name="visa"
                                            size={FontSize.size_30 * 2}
                                            color={Colors.primaryWhiteHex}
                                        />
                                    </View>
                                    <View style={styles.CreditCardNumberContainer}>
                                        <Text style={styles.CreditCardNumber}>3879</Text>
                                        <Text style={styles.CreditCardNumber}>8923</Text>
                                        <Text style={styles.CreditCardNumber}>6745</Text>
                                        <Text style={styles.CreditCardNumber}>4638</Text>
                                    </View>
                                    <View style={styles.CreditCardRow}>
                                        <View style={styles.CreditCardNameContainer}>
                                            <Text style={styles.CreditCardNameSubitle}>Card Holder Name</Text>
                                            <Text style={styles.CreditCardNameTitle}>Robert Evans</Text>
                                        </View>
                                        <View style={styles.CreditCardDateContainer}>
                                            <Text style={styles.CreditCardNameSubitle}>Expiry Date</Text>
                                            <Text style={styles.CreditCardNameTitle}>02/30</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {PaymentList.map((data) => (
                        <TouchableOpacity
                            key={data.name}
                            onPress={() => {
                                setPaymentMode(data.name);
                            }}
                        >
                            <PaymentMethod
                                paymentMode={paymentMode}
                                name={data.name}
                                icon={data.icon}
                                isIcon={data.isIcon}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <PaymentFooter
                buttonTitle={`Pay with ${paymentMode}`}
                price={{ price: route.params.amount + 5, currency: '$' }}
                buttonPressHandler={buttonPressHandler}
                amount={Math.floor(CartPrice * 100)}
                products={paymentProduct}
                description={'Payment for your order'}
                returnUrl={'https://www.google.com.vn'}
                cancelUrl={'https://www.facebook.com'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        paddingTop: StatusBar.currentHeight + 2,
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    FeeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    LottieAnimation: {
        flex: 1,
    },
    AddressTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },

    MethodTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    FeeTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    FeeValue: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
    },
    orderItemContainer: {
        marginHorizontal: Spacing.space_20,
        marginVertical: Spacing.space_10,
        padding: Spacing.space_10,
        flexDirection: 'column',
        borderRadius: BorderRadius.radius_10 * 2,
        borderWidth: 1,
        borderColor: Colors.primaryLightGreyHex,
    },
    TotalFeeTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    TotalFeeValue: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    ListContainer: {
        gap: Spacing.space_20,
    },
    addressBox: {
        borderRadius: BorderRadius.radius_25,
        padding: Spacing.space_15,
        backgroundColor: Colors.primaryDarkGreyHex,
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
    checkBoxAndNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userName: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    addressContainer: {
        marginHorizontal: Spacing.space_20,
        flexDirection: 'column',
        gap: Spacing.space_12,
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
    PaymentOptionsContainer: {
        marginHorizontal: Spacing.space_20,
        marginVertical: Spacing.space_10,
        padding: Spacing.space_10,
        borderRadius: BorderRadius.radius_10 * 2,
        borderWidth: 1,
        borderColor: Colors.primaryLightGreyHex,
        gap: Spacing.space_10,
    },
    CreditCardContainer: {
        padding: Spacing.space_10,
        gap: Spacing.space_10,
        borderRadius: BorderRadius.radius_15 * 2,
        borderWidth: 3,
    },
    CreditCardTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
        marginLeft: Spacing.space_10,
    },
    CreditCardBG: {
        backgroundColor: Colors.primaryGreyHex,
        borderRadius: BorderRadius.radius_25,
    },
    LinearGradientStyle: {
        borderRadius: BorderRadius.radius_25,
        gap: Spacing.space_36,
        paddingHorizontal: Spacing.space_15,
        paddingVertical: Spacing.space_10,
    },
    CreditCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CreditCardNumberContainer: {
        flexDirection: 'row',
        gap: Spacing.space_10,
        alignItems: 'center',
    },
    CreditCardNumber: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
        letterSpacing: Spacing.space_4 + Spacing.space_2,
    },
    CreditCardNameSubitle: {
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_12,
        color: Colors.secondaryLightGreyHex,
    },
    CreditCardNameTitle: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    CreditCardNameContainer: {
        alignItems: 'flex-start',
    },
    CreditCardDateContainer: {
        alignItems: 'flex-end',
    },
});

export default PaymentScreen;
