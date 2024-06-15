import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PopUpAnimation from '../components/PopUpAnimation';
import { useFonts } from 'expo-font';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';
import * as services from '../services/index';
import * as actions from '../redux/actions/index';
const QrCodeScreen = ({ navigation, route }) => {
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
    const [statusPayment, setStatusPayment] = useState('');
    const PaymentInfo = useSelector((state) => state.PaymentInfo);

    useEffect(() => {
        // Hàm gọi API
        const fetchData = async () => {
            try {
                let paymentStatus = await services.getStatusPaymentService(PaymentInfo.orderCode);
                setStatusPayment(paymentStatus.data);
            } catch (error) {
                console.error(error);
            }
        };
        setShowAnimation(false);
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let paymentStatus = await services.getStatusPaymentService(PaymentInfo.orderCode);
                // console.log('check payment info OKOKOKO  :', paymentStatus);
                setStatusPayment(paymentStatus.data);
                if (statusPayment && statusPayment.status === 'PAID') {
                    setShowAnimation(true);
                    dispatch(actions.clearPaymentInfo());
                    setTimeout(() => {
                        setShowAnimation(false);
                        navigation.navigate('Cart');
                    }, 2000);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const intervalId = setInterval(fetchData, 3000);

        return () => {
            // dispatch(actions.clearPaymentInfo());
            clearInterval(intervalId);
        };
    }, [statusPayment]);
    return (
        <View style={styles.ScreenContainer}>
            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} />
            ) : (
                <></>
            )}
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
            <View style={styles.QRCodeContainer}>
                <Text style={styles.testText}>{PaymentInfo.orderCode}</Text>
                {PaymentInfo && PaymentInfo.qrCode && (
                    <View style={styles.QRCodeBox}>
                        <QRCode value={PaymentInfo.qrCode} size={200} />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        //paddingTop: StatusBar.currentHeight + 2,
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    LottieAnimation: {
        flex: 1,
    },
    testText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_20,
        color: Colors.primaryBlackHex,
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
    QRCodeContainer: {
        flex: 1,
        backgroundColor: Colors.primaryWhiteHex,
        alignContent: 'center',
        justifyContent: 'center',
    },
    QRCodeBox: {
        // backgroundColor: 'red',
        marginLeft: Spacing.space_30 * 3,
    },
});

export default QrCodeScreen;
