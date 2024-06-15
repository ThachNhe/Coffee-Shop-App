import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import GradientBGIcon from '../components/GradientBGIcon';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as services from '../services/index';
import Modal from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown';
import { AirbnbRating } from 'react-native-ratings';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
const CompletedOrderScreen = ({ navigation }) => {
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

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [showAnimation, setShowAnimation] = useState(false);
    const [rating, setRating] = useState();
    const [reviewProduct, setReviewProduct] = useState();
    const CartList = useSelector((state) => state.CartList);
    const userInfo = useSelector((state) => state.userInfo);
    const CartPrice = useSelector((state) => state.CartPrice);
    const [ReviewText, setReviewText] = useState('');
    const OrderDate = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();

    const newCoffeeTypes = CartList.map((coffeeType) => ({
        icon: 'emoticon-happy-outline',
        title: coffeeType.name,
        product_id: coffeeType.product_id,
    }));
    const navigationHandler = ({ index, id, type }) => {
        navigation.push('Details', {
            index,
            id,
            type,
        });
    };
    const selectProductToReview = (selectedItem, index) => {
        console.log(selectedItem, index);
        setReviewProduct(selectedItem);
    };
    const handlerSubmitReview = async () => {
        let data = { rating: rating, comment: ReviewText };
        let productId = reviewProduct.product_id;
        let userId = userInfo.user?._id;
        console.log('check review  :', data);
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
                            <Text style={styles.HeaderText}>Order History</Text>
                            <View style={styles.EmptyView} />
                        </View>
                        <OrderHistoryCard
                            key={1}
                            navigationHandler={navigationHandler}
                            CartList={CartList}
                            CartListPrice={CartPrice}
                            OrderDate={OrderDate}
                            type={'COMPLETE_SCREEN'}
                            onReviewPressReviewModal={toggleModal} // Truyền hàm toggleModal như một prop
                        />
                    </View>
                </View>
            </ScrollView>
            <Modal isVisible={isModalVisible} style={styles.bottomModal}>
                <View style={styles.modalContent}>
                    <Text
                        style={{ backgroundColor: 'white', fontSize: FontSize.size_16, fontFamily: 'poppins_medium' }}
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
                                            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
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
                        <TouchableOpacity style={styles.buttonSubmitReview} onPress={() => handlerSubmitReview()}>
                            <Text style={styles.ButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
        paddingHorizontal: Spacing.space_20,
    },
    HeaderContainer: {
        paddingHorizontal: Spacing.space_10,
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

export default CompletedOrderScreen;
