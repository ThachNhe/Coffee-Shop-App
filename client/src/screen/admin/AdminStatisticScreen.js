import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import { BorderRadius, Colors, FontSize, Spacing } from '../../theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { BarChart } from 'react-native-chart-kit';
const data = {
    labels: ['Pending', 'Delivering', 'Completed', 'Cancelled'],
    datasets: [
        {
            data: [2, 3, 5, 1],
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#333',
    backgroundGradientTo: '#333',
    color: (opacity = 1) => `rgba(209, 120, 66, ${opacity})`, // Đặt opacity về 1
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
                    // backgroundColor: '#959090',
                    marginBottom: Spacing.space_20 * 4,
                }}
            >
                <BarChart
                    data={data}
                    width={screenWidth - 20}
                    height={400}
                    // yAxisLabel="$"
                    chartConfig={chartConfig}
                    fromZero={true}
                    style={{
                        borderRadius: 16,
                        shadowColor: Colors.primaryLightGreyHex,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5,
                    }}
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
        // backgroundColor: '#959090',
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
