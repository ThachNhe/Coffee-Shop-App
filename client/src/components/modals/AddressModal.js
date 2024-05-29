import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput } from 'react-native';
import { Colors, BorderRadius, Spacing, FontSize } from '../../theme/theme';
const AddressModal = ({ modalVisible, pressHandler }) => {
    let [fullName, setFullName] = useState('');
    let [phone, setPhone] = useState(0);
    let [address, setAddress] = useState('');
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={false}
            onRequestClose={() => {
                pressHandler(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Address</Text>
                    <View style={styles.inputContainerComponent}>
                        <View>
                            <Text style={styles.textInputLabel}>Full Name</Text>
                            <TextInput
                                placeholder="Find Your Coffee ..."
                                value={'Đinh văn Thạch'}
                                onChangeText={(text) => {
                                    fullName(text);
                                }}
                                placeholderTextColor={Colors.primaryLightGreyHex}
                                style={styles.textInputContainer}
                            ></TextInput>
                        </View>
                        <View>
                            <Text style={styles.textInputLabel}>Your phone</Text>
                            <TextInput
                                placeholder="your phone ..."
                                value={'089834598345'}
                                onChangeText={(text) => {
                                    fullName(text);
                                }}
                                placeholderTextColor={Colors.primaryLightGreyHex}
                                style={styles.textInputContainer}
                            ></TextInput>
                        </View>
                        <View>
                            <Text style={styles.textInputLabel}>Your address</Text>
                            <TextInput
                                placeholder="Find Your Coffee ..."
                                value={'Kí túc xã ngoại ngữ, số 2 phạm văn đồng,cầu giấy, HN'}
                                onChangeText={(text) => {
                                    fullName(text);
                                }}
                                placeholderTextColor={Colors.primaryLightGreyHex}
                                style={styles.textInputContainer}
                            ></TextInput>
                        </View>
                        <TouchableOpacity
                            style={styles.DownloadButton}
                            // onPress={() => {
                            //     buttonPressHandler();
                            // }}
                        >
                            <Text style={styles.ButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

        backgroundColor: 'rgba(53, 51, 52, 0.05)',
    },
    DownloadButton: {
        margin: Spacing.space_20,
        backgroundColor: Colors.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing.space_24 * 2,
        borderRadius: BorderRadius.radius_20,
        width: Spacing.space_36 * 6,
    },
    ButtonText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    inputContainerComponent: {
        flexDirection: 'column',
        // margin: Spacing.space_20,
        borderRadius: BorderRadius.radius_20,
        alignItems: 'center',
        gap: Spacing.space_10,
    },
    textInputContainer: {
        height: Spacing.space_20 * 3,
        width: Spacing.space_36 * 8,
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
        backgroundColor: Colors.primaryDarkGreyHex,
        borderRadius: Spacing.space_10,
        paddingHorizontal: Spacing.space_10,
    },
    modalView: {
        width: Spacing.space_36 * 10,
        backgroundColor: Colors.primaryGreyHex,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',

        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
        marginBottom: Spacing.space_10,
    },
    textInputLabel: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_14,
        color: Colors.primaryDarkGreyHex,
        marginBottom: Spacing.space_10,
    },
});

export default AddressModal;
