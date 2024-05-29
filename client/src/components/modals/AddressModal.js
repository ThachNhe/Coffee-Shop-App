import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Tab, TabView } from 'react-native-elements';
import { Colors, Spacing } from '../../theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddressModal = ({ ProvincesList, DistrictList, WardList, isModalVisible, toggleModal }) => {
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState(0);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    useEffect(() => {
        // console.log('userOKOKOOOo');
        if (province && province.ProvinceID) {
            dispatch(actions.getDistrictAction(province.ProvinceID));
        }
        if (district && district.DistrictID) {
            dispatch(actions.getWardAction(district.DistrictID));
        }
        if (province && district && ward) {
            let data = { province: province.ProvinceName, district: district.DistrictName, ward: ward.WardName };
            dispatch(actions.pushAddressToFormAction(data));
            closeModal();
        }
    }, [province, district, ward]);

    const handleProvinceSelect = (item) => {
        setSelectedTab(1);
        setProvince(item);
    };

    const handleDistrictSelect = (item) => {
        setSelectedTab(2);
        setDistrict(item);
    };

    const renderItem = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => handleProvinceSelect(item)}>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', color: 'white' }}>
                    <Text style={{ color: 'white' }}>{item.ProvinceName}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
    const renderItemDistrict = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => handleDistrictSelect(item)}>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', color: 'white' }}>
                    <Text style={{ color: 'white' }}>{item.DistrictName}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
    const renderItemWard = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => setWard(item)}>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', color: 'white' }}>
                    <Text style={{ color: 'white' }}>{item.WardName}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
    closeModal = () => {
        setProvince('');
        setDistrict('');
        setWard('');
        toggleModal();
        dispatch(actions.clearAddressAction());
        setSelectedTab(0);
    };
    console.log('check province :', province);
    console.log('check district :', district);
    console.log('check ward :', province);
    return (
        <View contentContainerStyle={styles.container}>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => closeModal()}
                >
                    <Icon name="minus" size={24} color={Colors.primaryOrangeHex} />
                </TouchableOpacity>
                <Tab value={selectedTab} onChange={setSelectedTab}>
                    <Tab.Item title="Province" titleStyle={styles.TitleStyle} containerStyle={styles.ContainerStyle} />
                    <Tab.Item title="District" titleStyle={styles.TitleStyle} containerStyle={styles.ContainerStyle} />
                    <Tab.Item title="Ward" titleStyle={styles.TitleStyle} containerStyle={styles.ContainerStyle} />
                </Tab>
                <View style={styles.modalContent}>
                    <TabView
                        value={selectedTab}
                        onChange={setSelectedTab}
                        // containerStyle={{ flex: 1, backgroundColor: 'red' }}
                        style={{ flex: 1 }}
                    >
                        <TabView.Item style={styles.tabView}>
                            <FlatList
                                data={ProvincesList}
                                keyExtractor={(item) => item.ProvinceID.toString()}
                                renderItem={renderItem}
                                showsHorizontalScrollIndicator={false}
                            />
                        </TabView.Item>
                        <TabView.Item style={styles.tabView}>
                            <FlatList
                                data={DistrictList}
                                keyExtractor={(item) => item.DistrictID.toString()}
                                renderItem={renderItemDistrict}
                            />
                        </TabView.Item>
                        <TabView.Item style={styles.tabView}>
                            <FlatList
                                data={WardList}
                                keyExtractor={(item) => item.WardName.toString()}
                                renderItem={renderItemWard}
                            />
                        </TabView.Item>
                    </TabView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Colors.primaryDarkGreyHex,
    },

    ContainerStyle: {
        backgroundColor: Colors.primaryDarkGreyHex,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContent: {
        // backgroundColor: 'red',
        flex: 1,
    },
    TitleStyle: {
        color: Colors.textInputColor,
        fontSize: Spacing.space_12,
    },
    tabView: {
        flex: 1,
        width: '80%',
        // height: 200,
    },
    item: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: Colors.primaryWhiteHex,
    },
});

export default AddressModal;
