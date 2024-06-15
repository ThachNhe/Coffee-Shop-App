import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Colors, FontSize, Spacing } from '../../theme/theme';
import GradientBGIcon from '../../components/GradientBGIcon';
import { Input } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as services from '../../services/index';
const data = [
    { icon: 'package-variant', title: 'Coffee' },
    { icon: 'package-variant', title: 'Bean' },
];
const AddProduct = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productIngredients, setProductIngredients] = useState('');
    const [productRoasted, setProductRoasted] = useState('');
    const [productPrice1, setProductPrice1] = useState('');
    const [productPrice2, setProductPrice2] = useState('');
    const [productSize, setProductSize] = useState('');
    const [productImage, setProductImage] = useState('');
    useEffect(() => {
        dispatch(actions.getProvincesAction());
    }, []);
    const [value, setValue] = useState(null);
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && <Icon style={styles.icon} color="black" name="Safety" size={20} />}
            </View>
        );
    };
    const [document, setDocument] = useState(null);
    // console.log('check du lieu', document);
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        if (!result.cancelled) {
            setDocument(result);
        }
    };
    const selectProductType = (selectedItem, index) => {
        setProductType(selectedItem.title);
    };
    const buttonHandlerAddProduct = async () => {
        const priceOpt1 = productPrice1.split(', ');
        const priceOpt2 = productPrice2.split(', ');
        const imagelink_square =
            'https://firebasestorage.googleapis.com/v0/b/coffee-a02ad.appspot.com/o/b%E1%BA%A1c%20x%E1%BB%89u%2Fbac-xiu1.webp?alt=media&token=7834c29e-d427-463f-80b5-43b24d816fb1';
        const imagelink_portrait =
            'https://firebasestorage.googleapis.com/v0/b/coffee-a02ad.appspot.com/o/b%E1%BA%A1c%20x%E1%BB%89u%2Fbac-xiu1.webp?alt=media&token=7834c29e-d427-463f-80b5-43b24d816fb1';
        const productData = {
            name: productName,
            type: productType,
            ingredients: productIngredients.split(', '),
            roasted: productRoasted,
            price: [
                { price: priceOpt1[0], size: priceOpt1[1] },
                { price: priceOpt2[0], size: priceOpt2[1] },
            ],
            imagelink_square,
            imagelink_portrait,
        };
        try {
            let res = await services.postNewProductService(productData);
            console.log('====================================');
            console.log('check res add new produt ', res);
            console.log('====================================');
            if (res && res.errorCode === 0) {
                ToastAndroid.showWithGravity(
                    `Add ${productName} ${productType} success!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            } else {
                ToastAndroid.showWithGravity(
                    `Add ${productName} ${productType} fail!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {}
        console.log('productData', productData);
    };

    return (
        <View style={styles.ScreenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop();
                            // setAddress('');
                        }}
                    >
                        <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}> Add New Product</Text>
                    <View style={styles.EmptyView} />
                </View>
                <View style={styles.TextInputContainer}>
                    <View>
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

                    <Input
                        placeholder="Product Name"
                        leftIcon={<Icon name="account" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setProductName}
                    />
                    <Input
                        placeholder="Ingredients"
                        leftIcon={<Icon name="phone" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setProductIngredients}
                    />
                    <Input
                        placeholder="Roasted"
                        leftIcon={
                            <Icon
                                name="map-marker"
                                size={24}
                                color={Colors.primaryOrangeHex}
                                onPress={() => openModal()}
                            />
                        }
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setProductRoasted}
                    />
                    <Input
                        placeholder="Price, size"
                        leftIcon={
                            <Icon
                                name="currency-usd"
                                size={24}
                                color={Colors.primaryOrangeHex}
                                onPress={() => openModal()}
                            />
                        }
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setProductPrice1}
                    />
                    <Input
                        placeholder="Price, size"
                        leftIcon={
                            <Icon
                                name="currency-usd"
                                size={24}
                                color={Colors.primaryOrangeHex}
                                onPress={() => openModal()}
                            />
                        }
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setProductPrice2}
                    />

                    <TouchableOpacity
                        onPress={pickDocument}
                        style={[
                            styles.buttonChooseImg,
                            {
                                backgroundColor: !document ? Colors.primaryBlackHex : Colors.secondaryGreyHex,
                            },
                        ]}
                    >
                        <View style={{ flexDirection: 'row', gap: Spacing.space_10 }}>
                            <Icon
                                name="file"
                                size={30}
                                style={{
                                    color: Colors.primaryOrangeHex,
                                }}
                            />
                            <Text style={styles.ButtonStyle}>Choose File</Text>
                        </View>

                        <Icon
                            name="check-circle"
                            size={30}
                            style={{
                                color: document ? Colors.primaryOrangeHex : Colors.secondaryGreyHex,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            buttonHandlerAddProduct();
                        }}
                        style={[
                            styles.buttonChooseImg,
                            {
                                backgroundColor: Colors.primaryOrangeHex,
                                marginTop: Spacing.space_20,
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <Text style={styles.ButtonStyleSubmit}>Add New Product</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        paddingTop: StatusBar.currentHeight + 2,
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
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
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_20,
        color: Colors.primaryWhiteHex,
    },
    EmptyView: {
        height: Spacing.space_36,
        width: Spacing.space_36,
    },
    TextInputContainer: {
        marginHorizontal: Spacing.space_10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: Spacing.space_5,
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
        // height: 60, // Chiều cao của input
        alignItems: 'center',
    },
    input: {
        textAlign: 'left',
        color: Colors.textInputColor, // Căn giữa văn bản
        paddingLeft: Spacing.space_10,
    },

    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.textInputColor,
        paddingLeft: Spacing.space_12,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: Colors.textInputColor,
        paddingLeft: Spacing.space_12,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    buttonChooseImg: {
        borderWidth: 1,
        borderColor: Colors.secondaryLightGreyHex,
        borderRadius: 10,
        paddingHorizontal: Spacing.space_10,
        alignItems: 'center',
        height: 50,
        width: '95%',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ButtonStyleSubmit: {
        fontWeight: '500',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    ButtonStyle: { color: Colors.secondaryLightGreyHex, fontWeight: '500', fontSize: FontSize.size_18 },
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
});

export default AddProduct;
