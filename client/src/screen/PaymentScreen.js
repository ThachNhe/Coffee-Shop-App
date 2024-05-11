import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import { LinearGradient } from 'expo-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import useStore from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

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
    {
        name: 'Amazon Pay',
        icon: require('../assets/app_images/amazonpay.png'),
        isIcon: false,
    },
];

const PaymentScreen = ({ navigation, route }) => {
    const calculateCartPrice = useStore((state) => state.calculateCartPrice);
    const addToOrderHistoryListFromCart = useStore((state) => state.addToOrderHistoryListFromCart);

    const [paymentMode, setPaymentMode] = useState('Credit Card');
    const [showAnimation, setShowAnimation] = useState(false);

    const buttonPressHandler = () => {
        setShowAnimation(true);
        addToOrderHistoryListFromCart();
        calculateCartPrice();
        setTimeout(() => {
            setShowAnimation(false);
            navigation.navigate('History');
        }, 2000);
    };

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
                    <Text style={styles.HeaderText}>Payments</Text>
                    <View style={styles.EmptyView} />
                </View>

                <View style={styles.PaymentOptionsContainer}>
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
                price={{ price: route.params.amount, currency: '$' }}
                buttonPressHandler={buttonPressHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        paddingTop: StatusBar.currentHeight + 2,
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
        paddingTop: 35,
    },
    LottieAnimation: {
        flex: 1,
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
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_20,
        color: Colors.primaryWhiteHex,
    },
    EmptyView: {
        height: Spacing.space_36,
        width: Spacing.space_36,
    },
    PaymentOptionsContainer: {
        padding: Spacing.space_15,
        gap: Spacing.space_15,
    },
    CreditCardContainer: {
        padding: Spacing.space_10,
        gap: Spacing.space_10,
        borderRadius: BorderRadius.radius_15 * 2,
        borderWidth: 3,
    },
    CreditCardTitle: {
        fontFamily: FontFamily.poppins_semibold,
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
        fontFamily: FontFamily.poppins_semibold,
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
        letterSpacing: Spacing.space_4 + Spacing.space_2,
    },
    CreditCardNameSubitle: {
        fontFamily: FontFamily.poppins_regular,
        fontSize: FontSize.size_12,
        color: Colors.secondaryLightGreyHex,
    },
    CreditCardNameTitle: {
        fontFamily: FontFamily.poppins_medium,
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
