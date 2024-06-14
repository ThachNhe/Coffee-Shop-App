import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../theme/theme';
import GradientBGIcon from '../../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from '../../components/SelectDropdownComponent';
import * as actions from '../../redux/actions/index';
const data = [
    { icon: 'emoticon-happy-outline', title: 'Coffee' },
    { icon: 'emoticon-happy-outline', title: 'Bean' },
];
const AddProduct = ({ navigation, route }) => {
    const dispatch = useDispatch();
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
    console.log('check du lieu', document);
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        if (!result.cancelled) {
            setDocument(result);
        }
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
                    <Text style={styles.HeaderText}> Add Address</Text>
                    <View style={styles.EmptyView} />
                </View>
                <View style={styles.TextInputContainer}>
                    <SelectDropdown data={data}></SelectDropdown>

                    <Input
                        placeholder="Product Name"
                        leftIcon={<Icon name="user" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                    />
                    <Input
                        placeholder="Ingredients"
                        leftIcon={<Icon name="phone" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
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
                    />
                    <Input
                        placeholder="Price, size"
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
                    />
                    <Input
                        placeholder="Price, size"
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
                        <Text style={styles.ButtonStyle}>Choose File</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={pickDocument}
                        style={[
                            styles.buttonChooseImg,
                            { backgroundColor: Colors.primaryOrangeHex, marginTop: Spacing.space_20 },
                        ]}
                    >
                        <Text style={styles.ButtonStyle}>Add New Product</Text>
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
    },
    ButtonStyle: { color: Colors.textInputColor, fontWeight: '700', fontSize: FontSize.size_16 },
});

export default AddProduct;
