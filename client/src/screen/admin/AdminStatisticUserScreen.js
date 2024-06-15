import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../theme/theme';
import GradientBGIcon from '../../components/GradientBGIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import * as services from '../../services/index';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
let number = Array.from({ length: 32 }, (_, i) => (i + 1).toString());
const data = {
    tableHead: ['', 'Full name', 'Phone', 'Total Orders'],
    tableTitle: number,
    tableData: [
        ['Thach Dinh', '0846236478', '1'],
        ['Duy Nguyen', '0893473423', '2'],
        ['Phong Nguyen', '0882348349', '1'],
        ['Khanh Tran', '0812328323', '1'],
        ['Hieu Le', '0856778956', '1'],
        ['Trung Pham', '0865432890', '1'],
        ['Nam Vo', '0876543210', '1'],
        ['Anh Hoang', '0890789456', '1'],
        ['Tuan Nguyen', '0812345678', '1'],
        ['Viet Nguyen', '0823456789', '2'],
        ['Hoa Nguyen', '0834567890', '1'],
        ['Lan Tran', '0845678901', '1'],
        ['Dat Le', '0856789012', '1'],
        ['Nhung Pham', '0867890123', '1'],
        ['Minh Tran', '0878901234', '1'],
        ['Khoa Hoang', '0889012345', '1'],
        ['Tam Phan', '0890123456', '1'],
        ['Long Nguyen', '0811234567', '2'],
        ['An Nguyen', '0822345678', '1'],
        ['Linh Tran', '0833456789', '1'],
        ['Quan Le', '0844567890', '1'],
        ['Bao Pham', '0855678901', '1'],
        ['Hien Nguyen', '0866789012', '2'],
        ['Tai Tran', '0877890123', '1'],
        ['Phuong Vo', '0888901234', '1'],
        ['Thao Hoang', '0899012345', '1'],
        ['Giang Nguyen', '0810123456', '1'],
        ['Son Tran', '0821234567', '1'],
        ['Yen Nguyen', '0832345678', '1'],
        ['Anh Vu', '0843456789', '1'],
        ['Thanh Nguyen', '0854567890', '1'],
        ['Hoang Le', '0865678901', '1'],
    ],
};

const AdminStatisticUserScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getProvincesAction());
    }, []);

    return (
        <View style={styles.ScreenContainer}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.pop();
                    }}
                >
                    <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                </TouchableOpacity>
                <Text style={styles.HeaderText}>Customers</Text>
                <View style={styles.EmptyView} />
            </View>
            <ScrollView style={styles.container}>
                <Table borderStyle={{ borderWidth: 1, borderColor: Colors.primaryLightGreyHex }}>
                    <Row data={data.tableHead} flexArr={[, 2, 2, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                        <Rows
                            data={data.tableData}
                            flexArr={[2, 2, 1]}
                            style={styles.row}
                            textStyle={styles.text}
                            // heightArr={[50]}
                            // heightArr={Array(data.tableData.length).fill(40)}
                        />
                    </TableWrapper>
                </Table>
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

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: Colors.primaryBlackHex },
    head: { height: 40, backgroundColor: Colors.secondaryBlackRGBA },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1 },
    row: { height: 28 },
    text: { textAlign: 'center', color: Colors.primaryWhiteHex },
});

export default AdminStatisticUserScreen;
