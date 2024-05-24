import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import { TouchableOpacity } from 'react-native';
import PaymentFooter from '../components/PaymentFooter';
import { useFonts } from 'expo-font';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import { useSelector, useDispatch } from 'react-redux';
import * as services from '../services/index';
import * as actions from '../redux/actions/index';
const DetailsScreen = ({ navigation, route }) => {
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
    useEffect(() => {
        dispatch(actions.isItemFavourAction(route.params.id));
    }, [dispatch]);
    const dispatch = useDispatch();

    const CoffeeList = useSelector((state) => state.CoffeeList);
    const isFavourite = useSelector((state) => state.isItemFavour.isFavorite);
    console.log('isFavourite : ', isFavourite);
    const itemOfIndex = CoffeeList.find((coffee) => coffee._id === route.params.id);
    const [price, setPrice] = useState(itemOfIndex.prices[0]);
    const [fullDesc, setFullDesc] = useState(false);

    const ToggleFavourite = async (productId, favourite) => {
        let data = { productId: productId };
        console.log('check body love  :', data);
        console.log('check favour  :', favourite);
        try {
            let res = '';
            if (favourite === false) {
                res = await services.addItemToFavourService(data);
                dispatch(actions.isItemFavourAction(route.params.id));
            } else {
                res = await services.deleteItemToFavourService(data);
                dispatch(actions.isItemFavourAction(route.params.id));
            }
            console.log('check res : ', res);
            if (res && res.errorCode === 0) {
                dispatch(actions.getFavouriteListAction());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const backHandler = () => {
        navigation.pop();
    };

    const addToCartHandler = async (data) => {
        // let data = { productId, quantity, size };
        try {
            let res = await services.AddCoffeeToCartService(data);
            dispatch(actions.getCartListAction());
            console.log('res.msg : ', res);
        } catch (e) {
            console.log(e);
        }
        console.log('check req : ', data);
    };
    return (
        <View style={styles.screenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>
                <ImageBackgroundInfo
                    EnableBackHandler={true}
                    imagelink_portrait={itemOfIndex.imagelink_portrait}
                    type={itemOfIndex.type}
                    id={itemOfIndex.id}
                    favourite={isFavourite}
                    name={itemOfIndex.name}
                    special_ingredient={itemOfIndex.special_ingredient}
                    ingredients={itemOfIndex.ingredients}
                    average_rating={itemOfIndex.average_rating}
                    ratings_count={itemOfIndex.ratings_count}
                    roasted={itemOfIndex.roasted}
                    BackHandler={backHandler}
                    productId={itemOfIndex._id}
                    ToggleFavourite={ToggleFavourite}
                />

                <View style={styles.footerInfoArea}>
                    <Text style={styles.infoTitle}>Description</Text>
                    {fullDesc ? (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc((prev) => !prev);
                            }}
                        >
                            <Text style={styles.descriptionText}>{itemOfIndex.description}</Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc((prev) => !prev);
                            }}
                        >
                            <Text numberOfLines={3} style={styles.descriptionText}>
                                {itemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    )}
                    <Text style={styles.infoTitle}>Size</Text>
                    <View style={styles.sizeOuterContainer}>
                        {itemOfIndex &&
                            itemOfIndex.prices &&
                            itemOfIndex.prices.map((data) => (
                                <TouchableOpacity
                                    key={data.size}
                                    onPress={() => {
                                        setPrice(data);
                                    }}
                                    style={[
                                        styles.sizeBox,
                                        {
                                            borderColor:
                                                data.size == price.size
                                                    ? Colors.primaryOrangeHex
                                                    : Colors.primaryDarkGreyHex,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            {
                                                fontSize:
                                                    itemOfIndex.type == 'Bean' ? FontSize.size_14 : FontSize.size_16,
                                                color:
                                                    data.size == price.size
                                                        ? Colors.primaryOrangeHex
                                                        : Colors.secondaryLightGreyHex,
                                            },
                                        ]}
                                    >
                                        {data.size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>
                <PaymentFooter
                    price={price}
                    buttonTitle="Add to Cart"
                    buttonPressHandler={() => {
                        addToCartHandler({
                            productId: itemOfIndex._id,
                            quantity: 1,
                            size: price.size,
                        });
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    footerInfoArea: {
        padding: Spacing.space_20,
    },
    infoTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_10,
    },
    descriptionText: {
        letterSpacing: 0.5,
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_30,
    },
    sizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.space_20,
    },
    sizeBox: {
        flex: 1,
        backgroundColor: Colors.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing.space_24 * 2,
        borderRadius: BorderRadius.radius_10,
        borderWidth: 2,
    },
    sizeText: {
        fontFamily: 'poppins_medium',
    },
});

export default DetailsScreen;
