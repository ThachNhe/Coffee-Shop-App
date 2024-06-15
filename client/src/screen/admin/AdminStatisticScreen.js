import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../theme/theme';
import GradientBGIcon from '../../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import * as services from '../../services/index';
import { BarChart } from 'react-native-chart-kit';
const data = {
    labels: ['Pending', 'Delivering', 'Completed', 'Cancelled'],
    datasets: [
        {
            data: [10, 20, 45, 28],
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: Colors.primaryBlackRGBA,
    backgroundGradientTo: Colors.primaryBlackRGBA,
    color: (opacity = 1) => `rgba(209, 120, 66, ${opacity})`, // tăng giá trị opacity lên 1
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
};

const screenWidth = Dimensions.get('window').width;

const AdminStatisticScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getProvincesAction());
    }, []);

    return (
        <View style={styles.ScreenContainer}>
            <View style={styles.HeaderContainer}>
                <Text style={styles.HeaderText}> Statistic Orders</Text>
                <View style={styles.EmptyView} />
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    borderWidth: 2,
                    color: Colors.primaryOrangeHex,
                    // backgroundColor: 'red',
                }}
            >
                <BarChart
                    data={data}
                    width={screenWidth - 20}
                    height={400}
                    // yAxisLabel="$"
                    chartConfig={chartConfig}
                    fromZero={true}

                    // verticalLabelRotation={}
                />
                <Text></Text>
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
        justifyContent: 'center',
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
    graphStyle: {
        marginVertical: 8,
        borderRadius: BorderRadius.radius_10,
    },
});

export default AdminStatisticScreen;
