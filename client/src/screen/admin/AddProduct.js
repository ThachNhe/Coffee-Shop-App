import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../theme/theme';
import { TextInput } from 'react-native-paper';
import GradientBGIcon from '../../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
const data = [
    { label: 'Coffee', value: 'Coffee' },
    { label: 'Bean', value: 'Bean' },
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
    return (
        <View style={styles.ScreenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop();
                            setAddress('');
                        }}
                    >
                        <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}> Add Address</Text>
                    <View style={styles.EmptyView} />
                </View>
                <View style={styles.TextInputContainer}>
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
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Product Type"
                        value={value}
                        onChange={(item) => {
                            setValue(item.value);
                        }}
                        renderLeftIcon={() => (
                            <Icon
                                name="product-hunt"
                                size={24}
                                color={Colors.primaryOrangeHex}
                                onPress={() => openModal()}
                            />
                        )}
                        renderItem={renderItem}
                    />
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
    dropdown: {
        margin: 16,
        height: 60,
        backgroundColor: Colors.primaryGreyHex,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
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
});

export default AddProduct;
