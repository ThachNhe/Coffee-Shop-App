import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import { TextInput } from 'react-native-paper';
import GradientBGIcon from '../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AddressModal from '../components/modals/AddressModal';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
const AddAddressScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getProvincesAction());
    }, []);
    const [address, setAddress] = useState();
    const formAddress = useSelector((state) => state.formAddress);
    useEffect(() => {
        let data = formAddress.province + '/' + formAddress.district + '/' + formAddress.ward;
        setAddress(data);
    }, [formAddress]);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const provinces = useSelector((state) => state.ProvincesList);
    const districts = useSelector((state) => state.DistrictList);
    const wards = useSelector((state) => state.WardList);
    openModal = () => {
        setModalVisible(true);
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
                        placeholder="Username"
                        leftIcon={<Icon name="user" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                    />
                    <Input
                        placeholder="Phone"
                        leftIcon={<Icon name="phone" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                    />
                    <Input
                        placeholder="Province/District/Ward"
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
                        value={address}
                    />
                    <Input
                        placeholder="Street"
                        leftIcon={<Icon name="road" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                    />
                </View>
            </ScrollView>
            <AddressModal
                ProvincesList={provinces}
                DistrictList={districts}
                WardList={wards}
                toggleModal={toggleModal}
                isModalVisible={isModalVisible}
            />
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
        height: 60, // Chiều cao của input
        alignItems: 'center',
    },
    input: {
        textAlign: 'left',
        color: Colors.textInputColor, // Căn giữa văn bản
        paddingLeft: Spacing.space_10,
    },
});

export default AddAddressScreen;
