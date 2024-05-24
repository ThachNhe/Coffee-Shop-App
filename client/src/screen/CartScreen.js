import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Colors, Spacing } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import * as services from '../services/index';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
const CartScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getCartListAction());
    }, [dispatch]);
    const CartList = useSelector((state) => state.CartList);
    console.log('check cartScreen : ', CartList);
    const CartPrice = useSelector((state) => state.CartPrice);
    const tabBarHeight = useBottomTabBarHeight();

    const buttonPressHandler = () => {
        navigation.push('Payment', { amount: CartPrice });
    };
    console.log('check cartlist[0] : ', CartList[0]);
    const incrementCartItemQuantityHandler = async (productId, quantity = 1, size, name) => {
        try {
            let data = { productId, quantity: 1, size };
            console.log('check req  :', data);
            let response = await services.AddCoffeeToCartService(data);
            if (response) {
                dispatch(actions.getCartListAction());
                //ToastAndroid.showWithGravity(`${name} is remove from Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const decrementCartItemQuantityHandler = async (productId, quantity, size, name) => {
        try {
            let data = { productId, quantity: -1, size };
            console.log('check req  :', data);
            let response = await services.AddCoffeeToCartService(data);
            if (response) {
                dispatch(actions.getCartListAction());
                //ToastAndroid.showWithGravity(`${name} is Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <View style={styles.ScreenContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                    <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                        <View style={styles.ItemContainer}>
                            <HeaderBar title="Cart" />

                            {CartList && CartList?.length == 0 ? (
                                <EmptyListAnimation title={'Cart is Empty'} />
                            ) : (
                                <View style={styles.ListItemContainer}>
                                    {CartList.map((data) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.push('Details', {
                                                    index: data.index,
                                                    id: data.product_id,
                                                    type: data.type,
                                                });
                                            }}
                                            key={data.id}
                                        >
                                            <CartItem
                                                productId={data.product_id}
                                                size={data.size.size}
                                                price={data.size.price}
                                                currency={data.size.currency}
                                                quantity={data.quantity}
                                                name={data.name}
                                                imagelink_square={data.imagelink_square}
                                                special_ingredient={data.special_ingredient}
                                                roasted={data.roasted}
                                                type={data.type}
                                                incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                                                decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {CartList.length != 0 ? (
                            <PaymentFooter
                                buttonPressHandler={buttonPressHandler}
                                buttonTitle="Pay"
                                price={{ price: CartPrice, currency: '$' }}
                            />
                        ) : (
                            <></>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
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

export default CartScreen;
