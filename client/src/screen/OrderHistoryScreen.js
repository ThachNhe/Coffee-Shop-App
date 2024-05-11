import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import useStore from '../store/store';
import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = () => {
    const OrderHistoryList = useStore((state) => state.OrderHistoryList);
    // console.warn('History: ', OrderHistoryList.length);
    const tabBarHeight = useBottomTabBarHeight();
    const [showAnimation, setShowAnimation] = useState(false);

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={Colors.primaryBlackHex} />

            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} />
            ) : (
                <></>
            )}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Order History" />

                        {OrderHistoryList.length == 0 ? (
                            <EmptyListAnimation title="No Order History"></EmptyListAnimation>
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {OrderHistoryList.map((data, index) => (
                                    <OrderHistoryCard />
                                    // to be continue....
                                ))}
                            </View>
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
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    LottieAnimation: {
        height: 250,
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
        gap: Spacing.space_20,
        // backgroundColor: 'blue',
    },
});
export default OrderHistoryScreen;
