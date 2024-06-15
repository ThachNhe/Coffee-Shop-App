import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Keyboard,
} from 'react-native';
import { Colors, FontSize, Spacing } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AddressModal from '../components/modals/AddressModal';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
import { useFocusEffect } from '@react-navigation/native';
import * as services from '../services/index';
import { FontAwesome } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';
import Modal from 'react-native-modal';
import { AddressDataset } from '../theme/theme';
const AddAddressScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getProvincesAction());
    }, []);

    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        if (query.length > 0) {
            const filteredData = AddressDataset.filter((city) =>
                city?.name.toLowerCase().includes(query.toLowerCase()),
            );
            setData(filteredData);
        } else {
            setData([]);
        }
    }, [query]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                setSelectedCity(item);
                setQuery(item.name);
                setData([]);
                Keyboard.dismiss();
            }}
        >
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const [address, setAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [detailsAddress, setDetailsAddress] = useState('');
    const [street, setStreet] = useState('');

    // redu
    const formAddress = useSelector((state) => state.formAddress);
    const provinces = useSelector((state) => state.ProvincesList);
    const districts = useSelector((state) => state.DistrictList);
    const wards = useSelector((state) => state.WardList);
    const userInfo = useSelector((state) => state.userInfo);

    // ============================================
    useEffect(() => {
        let data = formAddress.province + '/' + formAddress.district + '/' + formAddress.ward;
        setAddress(data);
    }, [formAddress]);
    useFocusEffect(
        useCallback(() => {
            setAddress('');
        }, []),
    );
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [isStreetModal, setStreetModalVisible] = useState(false);

    // const toggleStreetModal = () => {
    //     setModalVisible(!isStreetModal);
    // };
    openModal = () => {
        setModalVisible(true);
    };
    const handlerBackPage = () => {
        setAddress('');
        navigation.pop();
    };
    const handlerBackModalDetailAddress = () => {
        setStreetModalVisible(false);
        setSelectedCity(null);
    };
    const handlerOKDetailAddress = () => {
        setStreetModalVisible(false);
        setStreet(selectedCity.name);
    };
    const handlerOpenStreetModal = () => {
        setStreetModalVisible(true);
        setSelectedCity('');
    };
    const handlerSubmitAddress = async () => {
        let data = {
            userName: userName,
            phone: phone,
            province: formAddress.province,
            district: formAddress.district,
            ward: formAddress.ward,
            details: selectedCity.name,
        };
        console.log('====================================');
        console.log('check add submit : ', data);
        console.log('====================================');
        try {
            let res = await services.addAddressService(userInfo.user?._id, data);
            console.log('====================================');
            console.log('check res : ', res);
            console.log('====================================');
            if (res && res.errorCode === 0) {
                dispatch(actions.getAddressListAction(userInfo.user?._id));
                setAddress('');
                setUserName('');
                setPhone('');
                setDetailsAddress('');
                setStreet('');
                navigation.navigate('Address');
                ToastAndroid.showWithGravity(`Add address success!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View style={styles.ScreenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity onPress={() => handlerBackPage()}>
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
                        onChangeText={setUserName}
                    />
                    <Input
                        placeholder="Phone"
                        leftIcon={<Icon name="phone" size={24} color={Colors.primaryOrangeHex} />}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setPhone}
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
                        leftIcon={
                            <Icon
                                name="road"
                                size={24}
                                color={Colors.primaryOrangeHex}
                                onPress={() => handlerOpenStreetModal()}
                            />
                        }
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setDetailsAddress}
                        value={street}
                    />

                    <Modal isVisible={isStreetModal} style={styles.bottomModal}>
                        <View style={styles.modalContent}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <View style={styles.container}>
                                    <Text style={styles.title}>Chọn thành phố của bạn</Text>
                                    <Autocomplete
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        containerStyle={styles.autocompleteContainer}
                                        data={data}
                                        defaultValue={query}
                                        onChangeText={(text) => setQuery(text)}
                                        placeholder="Gõ tên thành phố..."
                                        flatListProps={{
                                            keyboardShouldPersistTaps: 'always',
                                            renderItem: renderItem,
                                            style: styles.flatList,
                                        }}
                                        inputContainerStyle={styles.inputContainer}
                                        listContainerStyle={styles.listContainer}
                                        style={styles.StreetInput}
                                        hideResults={data.length === 0}
                                    />

                                    <View style={styles.selectedContainer}>
                                        <FontAwesome name="map-marker" size={20} color="#0096FF" />
                                        <Text style={styles.selectedText}>Bạn đã chọn: {selectedCity?.name}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    gap: Spacing.space_18,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonBack}
                                    onPress={() => handlerBackModalDetailAddress()}
                                >
                                    <Text style={[styles.ButtonText, { color: Colors.primaryBlackHex }]}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonSubmitReview}
                                    onPress={() => {
                                        handlerOKDetailAddress();
                                    }}
                                >
                                    <Text style={styles.ButtonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.buttonSubmitAddress} onPress={() => handlerSubmitAddress()}>
                        <Text style={styles.ButtonText}>Submit</Text>
                    </TouchableOpacity>
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
        flex: 1,
        marginHorizontal: Spacing.space_10,
        alignItems: 'center',
        // justifyContent: 'center',
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
    buttonSubmitAddress: {
        backgroundColor: Colors.primaryOrangeHex,
        borderRadius: 10,
        height: Spacing.space_20 * 3,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },

    // Modal
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
    ButtonText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
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
    // =========================
    container: {
        backgroundColor: '#F5FCFF',
        // flex: 1,
        padding: 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    autocompleteContainer: {
        // flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        // top: 60,
        zIndex: 1,
        padding: 16,
    },

    StreetInput: {
        height: 40,
        fontSize: 16,
    },
    listContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        maxHeight: 200,
    },
    flatList: {
        paddingHorizontal: 5,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 250,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#0096FF',
    },
});

export default AddAddressScreen;
