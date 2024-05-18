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
import { useFonts } from 'expo-font';
import { Canvas, Path } from 'react-native-canvas';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';

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
    const [showAnimation, setShowAnimation] = useState(false);
    const PaymentInfo = useSelector((state) => state.PaymentInfo);

    console.log('check paymentInfo :', PaymentInfo);
    navigationHandler = () => {};
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
                {PaymentInfo && PaymentInfo.qrCode && (
                    <View style={styles.QRCodeBox}>
                        <QRCode value={PaymentInfo.qrCode} size={200} />
                    </View>
                )}

                {/* <Canvas
                    context={{
                        size: 100,
                        value: 'value',
                        bgColor: 'white',
                        fgColor: 'black',
                        cells: qr('value').modules,
                    }}
                    render={renderCanvas}
                    // onLoad={this.props.onLoad}
                    // onLoadEnd={this.props.onLoadEnd}
                    style={{ height: 100, width: 100 }}
                /> */}
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
