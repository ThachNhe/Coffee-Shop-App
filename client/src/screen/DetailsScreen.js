import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import useStore from '../store/store';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import PaymentFooter from '../components/PaymentFooter';
import { useFonts } from 'expo-font';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

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
    // console.log('route.params', route.params);

    const CoffeeList = useStore((state) => state.CoffeeList);

    const itemOfIndex = useStore((state) => (route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList))[
        route.params.index
    ];
    console.log('itemOfIndex', itemOfIndex);
    const addToFavouriteList = useStore((state) => state.addToFavouriteList);
    const deleteFromFavouriteList = useStore((state) => state.deleteFromFavouriteList);
    const addToCart = useStore((state) => state.addToCart);
    const calculateCartPrice = useStore((state) => state.calculateCartPrice);

    const [price, setPrice] = useState(itemOfIndex.prices[0]);
    const [fullDesc, setFullDesc] = useState(false);

    const ToggleFavourite = (favourite, type, id) => {
        favourite ? deleteFromFavouriteList(type, id) : addToFavouriteList(type, id);
    };

    const backHandler = () => {
        navigation.pop();
    };

    const addToCartHandler = ({ id, index, name, roasted, imagelink_square, special_ingredient, type, price }) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices: [{ ...price, quantity: 1 }],
        });
        calculateCartPrice();
        navigation.navigate('Cart');
    };
    return (
        <View style={styles.screenContainer}>
            {/* <StatusBar backgroundColor={Colors.primaryBlackHex} barStyle="white" /> */}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>
                <ImageBackgroundInfo
                    EnableBackHandler={true}
                    imagelink_portrait={itemOfIndex.imagelink_portrait}
                    type={itemOfIndex.type}
                    id={itemOfIndex.id}
                    favourite={itemOfIndex.favourite}
                    name={itemOfIndex.name}
                    special_ingredient={itemOfIndex.special_ingredient}
                    ingredients={itemOfIndex.ingredients}
                    average_rating={itemOfIndex.average_rating}
                    ratings_count={itemOfIndex.ratings_count}
                    roasted={itemOfIndex.roasted}
                    BackHandler={backHandler}
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
                        {itemOfIndex.prices.map((data) => (
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
                                            fontSize: itemOfIndex.type == 'Bean' ? FontSize.size_14 : FontSize.size_16,
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
                            id: itemOfIndex.id,
                            index: itemOfIndex.index,
                            name: itemOfIndex.name,
                            roasted: itemOfIndex.roasted,
                            imagelink_square: itemOfIndex.imagelink_square,
                            special_ingredient: itemOfIndex.special_ingredient,
                            type: itemOfIndex.type,
                            price: price,
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
