import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useStore from '../store/store';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import GradientBGIcon from '../components/GradientBGIcon';
import { useFonts } from 'expo-font';
const CanceledSCreen = ({ navigation }) => {
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
    const OrderHistoryList = useStore((state) => state.OrderHistoryList);

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
                            <Text style={styles.HeaderText}>Canceled</Text>
                            <View style={styles.EmptyView} />
                        </View>

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

export default CanceledSCreen;
