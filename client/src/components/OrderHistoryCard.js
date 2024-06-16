import { StyleSheet, Text, Touchable, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { Colors, FontSize, Spacing } from '../theme/theme';
import OrderItemCard from './OrderItemCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { BorderRadius } from '../theme/theme';
import Modal from 'react-native-modal';
import { AirbnbRating } from 'react-native-ratings';
import SelectDropdown from 'react-native-select-dropdown';
import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import * as services from '../services/index';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
const data = [
    { icon: 'truck', title: 'Delivering' },
    { icon: 'check-circle', title: 'Completed' },
];
const OrderHistoryCard = ({
    navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
    type,
    onReviewPressReviewModal,
    dataDrop,
    SizeType,
    paymentId,
}) => {
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
    const [isModalVisible, setModalVisible] = useState(false);
    const [reviewProduct, setReviewProduct] = useState();
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [rating, setRating] = useState();

    const newCoffeeTypes =
        dataDrop &&
        dataDrop.length > 0 &&
        dataDrop.map((coffeeType) => ({
            icon: 'shopping-cart',
            title: coffeeType.name,
            product_id: coffeeType.product_id,
        }));

    const [ReviewText, setReviewText] = useState('');
    const selectProductToReview = (selectedItem, index) => {
        console.log(selectedItem, index);
        setReviewProduct(selectedItem);
    };
    const handlerSubmitReview = async () => {
        let data = { rating: rating, comment: ReviewText };
        let productId = reviewProduct.product_id;
        let userId = userInfo.user?._id;
        console.log('check review  :', data, productId, userId);
        try {
            let res = await services.postReviewService(productId, userId, data);
            console.log('check res review  :', res);
            if (res && res.errorCode === 0) {
                dispatch(actions.getReviewByProductIdAction(productId));
                ToastAndroid.showWithGravity(`Success Review!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                setRating(0);
                setReviewProduct('');
                setReviewText('');
                setModalVisible(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const selectProductType = async (selectedItem, index) => {
        console.log('====================================');
        console.log('selectedItem : ', selectedItem);

        console.log('====================================');
        try {
            if (selectedItem && selectedItem.title === 'Delivering' && paymentId) {
                console.log('ÓKOKO');
                let res = await services.setPaymentStatusDeliveryService(paymentId);
                console.log('check res delevering : ', res);
                if (res && res.error === 0) {
                    ToastAndroid.showWithGravity(`Order is delivering!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    dispatch(actions.getAllPaymentAction());
                } else {
                    ToastAndroid.showWithGravity(
                        `Update status isn't success!`,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
            }
            if (selectedItem && selectedItem.title === 'Completed' && paymentId) {
                let res = await services.setPaymentStatusCompletedService(paymentId);
                console.log('check res completed : ', res);

                if (res && res.error === 0) {
                    ToastAndroid.showWithGravity(`Order is completed!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    dispatch(actions.getAllPaymentAction());
                } else {
                    ToastAndroid.showWithGravity(
                        `Update status isn't success!`,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
            }
        } catch (error) {
            console.log('update order status : ', error);
        }
    };
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View>
                    <Text style={styles.HeaderTitle}>Order Time</Text>
                    <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
                </View>
                <View style={styles.PriceContainer}>
                    <Text style={styles.HeaderTitle}>Total Amount</Text>
                    <Text style={styles.HeaderPrice}>$ {CartListPrice}</Text>
                </View>
            </View>
            <View style={styles.ListContainer}>
                {CartList &&
                    CartList.length > 0 &&
                    CartList.map((data, index) => (
                        <TouchableOpacity
                            key={index.toString() + data.id}
                            onPress={() => {
                                navigationHandler({
                                    index: 1,
                                    id: data.product_id,
                                    type: data.type,
                                });
                            }}
                        >
                            {SizeType === 1 ? (
                                <OrderItemCard
                                    data={data}
                                    type={data.type}
                                    name={data.name}
                                    imagelink_square={data.imagelink_square}
                                    special_ingredient={data.special_ingredient}
                                    quantity={data.quantity}
                                    size={data.size[0]?.size}
                                    price={data.size[0]?.price}
                                    // ItemPrice={data.ItemPrice}
                                />
                            ) : (
                                <OrderItemCard
                                    data={data}
                                    type={data.type}
                                    name={data.name}
                                    imagelink_square={data.imagelink_square}
                                    special_ingredient={data.special_ingredient}
                                    quantity={data.quantity}
                                    size={data.size.size}
                                    price={data.size.price}
                                    // ItemPrice={data.ItemPrice}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
            </View>
            {type === 'COMPLETE_SCREEN' && (
                <>
                    <TouchableOpacity
                        style={[styles.DownloadButton, { backgroundColor: Colors.primaryOrangeHex }]}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.ButtonText}>Review</Text>
                    </TouchableOpacity>

                    <Modal isVisible={isModalVisible} style={styles.bottomModal}>
                        <View style={styles.modalContent}>
                            <Text
                                style={{
                                    backgroundColor: 'white',
                                    fontSize: FontSize.size_16,
                                    fontFamily: 'poppins_medium',
                                }}
                            >
                                Product Name
                            </Text>
                            <View>
                                <SelectDropdown
                                    data={newCoffeeTypes}
                                    onSelect={(selectedItem, index) => selectProductToReview(selectedItem, index)}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                                {selectedItem && (
                                                    <Icon
                                                        name={selectedItem.icon}
                                                        style={styles.dropdownButtonIconStyle}
                                                    />
                                                )}
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(selectedItem && selectedItem.title) || 'Select your product'}
                                                </Text>
                                                <Icon
                                                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                                                    style={styles.dropdownButtonArrowStyle}
                                                />
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View
                                                style={{
                                                    ...styles.dropdownItemStyle,
                                                    ...(isSelected && { backgroundColor: '#D2D9DF' }),
                                                }}
                                            >
                                                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                />
                            </View>

                            <Input
                                placeholder="Review"
                                // leftIcon={<Icon name="star" size={24} color={Colors.primaryOrangeHex} />}
                                containerStyle={styles.inputContainer}
                                inputStyle={styles.input}
                                inputContainerStyle={styles.inputContainerStyle}
                                onChangeText={setReviewText}
                            />
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    margin: Spacing.space_10,
                                    paddingLeft: Spacing.space_10,
                                    gap: Spacing.space_20,
                                    // borderWidth: 1,
                                }}
                            >
                                <Text style={{}}>Rating: </Text>
                                <AirbnbRating
                                    count={5}
                                    // isDisabled={true}
                                    showRating={false}
                                    selectedColor={Colors.primaryOrangeHex}
                                    defaultRating={0}
                                    size={20}
                                    onFinishRating={(value) => setRating(value)}
                                />
                            </View>

                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    gap: Spacing.space_18,
                                    // borderWidth: 1,
                                }}
                            >
                                <TouchableOpacity style={styles.buttonBack} onPress={toggleModal}>
                                    <Text style={[styles.ButtonText, { color: Colors.primaryBlackHex }]}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonSubmitReview}
                                    onPress={() => handlerSubmitReview()}
                                >
                                    <Text style={styles.ButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
            {type === 'ORDER_SCREEN' && (
                <TouchableOpacity
                    style={[styles.DownloadButton, { backgroundColor: Colors.primaryRedHex }]}
                    onPress={() => {
                        ToastAndroid.showWithGravity(
                            `Your order has been canceled!`,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                        dispatch(actions.cancelOrderAction());
                    }}
                >
                    <Text style={styles.ButtonText}>Cancel Order</Text>
                </TouchableOpacity>
            )}

            {type === 'DELIVERING_SCREEN' && (
                <View
                    style={[
                        styles.DownloadButton,
                        { backgroundColor: Colors.secondaryDarkGreyHex, flexDirection: 'row', gap: Spacing.space_20 },
                    ]}
                    onPress={() => {
                        onReviewPressReviewModal();
                    }}
                >
                    <Icon name="motorcycle" size={30} style={{ color: '#008000' }} />

                    <Text style={styles.ButtonText}>In-Transit...</Text>
                </View>
            )}
            {type === 'CONFIR_SCREEN' && (
                <View style={{ marginTop: 10 }}>
                    <SelectDropdown
                        data={data}
                        onSelect={(selectedItem, index) => selectProductType(selectedItem, index)}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    {selectedItem && (
                                        <Icon
                                            name={selectedItem.icon}
                                            style={{ color: Colors.primaryOrangeHex }}
                                            size={20}
                                        />
                                    )}
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {(selectedItem && selectedItem.title) || 'Select your product'}
                                    </Text>
                                    <Icon
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        style={styles.dropdownButtonArrowStyle}
                                    />
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View
                                    style={{
                                        ...styles.dropdownItemStyle,
                                        ...(isSelected && { backgroundColor: '#D2D9DF' }),
                                    }}
                                >
                                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        gap: Spacing.space_10,
        borderRadius: BorderRadius.radius_10 * 2,
        borderWidth: 1,
        borderColor: Colors.primaryLightGreyHex,
        padding: Spacing.space_20,
        marginVertical: Spacing.space_10,
    },
    ButtonText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    DownloadButton: {
        margin: Spacing.space_20,

        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing.space_24 * 2,
        borderRadius: BorderRadius.radius_20,
    },
    CardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.space_20,
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    HeaderSubtitle: {
        fontFamily: 'poppins_light',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    PriceContainer: {
        alignItems: 'flex-end',
    },
    HeaderPrice: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_18,
        color: Colors.primaryOrangeHex,
    },
    ListContainer: {
        gap: Spacing.space_20,
    },
    dropdownButtonStyle: {
        width: '95%',
        height: 50,
        // backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: Spacing.space_20,
        borderWidth: 1,
        borderColor: Colors.secondaryLightGreyHex,
        gap: Spacing.space_10,
        // marginVertical: Spacing.space_10,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: Colors.secondaryLightGreyHex,
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
        color: Colors.secondaryLightGreyHex,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'red',
        marginTop: 10,
        padding: 10,
        borderRadius: 4,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        padding: 0,
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: Colors.secondaryLightGreyHex,
        borderRadius: 10,
        paddingHorizontal: Spacing.space_10,
        height: 60, // Chiều cao của input
        alignItems: 'center',
    },
    buttonSubmitReview: {
        backgroundColor: Colors.primaryOrangeHex,
        borderRadius: 10,
        height: Spacing.space_20 * 3,
        width: Spacing.space_20 * 5,
        height: Spacing.space_20 * 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBack: {
        backgroundColor: Colors.primaryWhiteHex,
        color: Colors.primaryBlackHex,
        borderRadius: 10,
        width: Spacing.space_20 * 4,
        height: Spacing.space_20 * 3,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownButtonStyle: {
        width: '95%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginVertical: Spacing.space_10,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    /// select dropdown
    dropdownButtonStyle: {
        width: '95%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: Spacing.space_20,
        // marginVertical: Spacing.space_10,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
});

export default OrderHistoryCard;
