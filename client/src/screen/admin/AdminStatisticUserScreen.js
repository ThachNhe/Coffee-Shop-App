import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../theme/theme';
import GradientBGIcon from '../../components/GradientBGIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import * as services from '../../services/index';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
const data = {
    tableHead: ['', 'Full name', 'Phone', 'Email'],
    tableTitle: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tableData: [
        ['Thach Dinh', '0846236478', 'thachdinh@gmail.com'],
        ['Duy Nguyen', '0893473423', 'duynguyen@gmail.com'],
        ['Phong Nguyen', '0882348349', 'phongnguyen123@gmail'],
        ['Khanh Tran', '0812328323', 'duykhanh@gmail.com'],
        ['Thach Dinh', '0846236478', 'thachdinh@gmail.com'],
        ['Duy Nguyen', '0893473423', 'duynguyen@gmail.com'],
        ['Phong Nguyen', '0882348349', 'phongnguyen123@gmail'],
        ['Khanh Tran', '0812328323', 'duykhanh@gmail.com'],
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
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                </TouchableOpacity>
                <Text style={styles.HeaderText}> Users</Text>
            </View>
            <View style={styles.container}>
                <Table borderStyle={{ borderWidth: 1, borderColor: Colors.primaryLightGreyHex }}>
                    <Row data={data.tableHead} flexArr={[, 2, 2, 4]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={data.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                        <Rows
                            data={data.tableData}
                            flexArr={[2, 2, 4]}
                            style={styles.row}
                            textStyle={styles.text}
                            // heightArr={[50]}
                            // heightArr={Array(data.tableData.length).fill(40)}
                        />
                    </TableWrapper>
                </Table>
            </View>
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
