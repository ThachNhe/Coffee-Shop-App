import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useFonts } from 'expo-font';
import GradientBGIcon from '../components/GradientBGIcon';
import RatingBar from '../components/RatingBar ';
import * as Progress from 'react-native-progress';
import { useSelector, useDispatch } from 'react-redux';
import * as services from '../services/index';
import * as actions from '../redux/actions/index';
const ReviewScreen = ({ navigation, route }) => {
    const [fontsLoad] = useFonts({
        poppins_semibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        poppins_medium: require('../assets/fonts/Poppins-Medium.ttf'),
        poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
        poppins_black: require('../assets/fonts/Poppins-Black.ttf'),
        poppins_bold: require('../assets/fonts/Poppins-Bold.ttf'),
        poppins_extrabold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
        poppins_extralight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
        poppins_regular: require('../assets/fonts/Poppins-Regular.ttf'),
        poppins_thin: require('../assets/fonts/Poppins-Thin.ttf'),
    });
    useEffect(() => {}, [dispatch]);
    const dispatch = useDispatch();
    const progressBar = [
        { process: 0.3, with: 250 },
        { process: 0.3, with: 250 },
        { process: 0.3, with: 250 },
        { process: 0.3, with: 250 },
        { process: 0.3, with: 250 },
    ];
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
                <Text style={styles.HeaderText}>Review & Rating</Text>
                <View style={styles.EmptyView} />
            </View>
            <View style={styles.ReviewContent}>
                <Text style={styles.titleReview}>
                    Rating and reviews are verified from people who use the same type of device that you use
                </Text>

                <View style={styles.Reviews}>
                    <View style={styles.AverageRatingContainer}>
                        <View style={styles.AverageRatingLeft}>
                            <Text style={styles.AverageRatingText}>3.2</Text>
                            <AirbnbRating
                                count={5}
                                isDisabled={true}
                                showRating={false}
                                selectedColor={Colors.primaryOrangeHex}
                                defaultRating={3}
                                size={10}
                            />
                        </View>
                        <View style={styles.progressContainer}>
                            {progressBar &&
                                progressBar.length > 0 &&
                                progressBar.map((item, index) => {
                                    return (
                                        <View style={styles.progressDetail}>
                                            <Text style={styles.numberOfStart}>{index + 1}</Text>
                                            <View style={styles.progressBar}>
                                                <Progress.Bar
                                                    progress={item.process}
                                                    width={item.with}
                                                    color={Colors.primaryOrangeHex}
                                                    borderColor={Colors.primaryLightGreyHex}
                                                />
                                            </View>
                                        </View>
                                    );
                                })}

                            {/* <View style={styles.progressDetail}>
                                <Text style={styles.numberOfStart}>2</Text>
                                <View style={styles.progressBar}>
                                    <Progress.Bar progress={0.3} width={200} />
                                </View>
                            </View>
                            <View style={styles.progressDetail}>
                                <Text style={styles.numberOfStart}>3</Text>
                                <View style={styles.progressBar}>
                                    <Progress.Bar progress={0.3} width={200} />
                                </View>
                            </View>
                            <View style={styles.progressDetail}>
                                <Text style={styles.numberOfStart}>4</Text>
                                <View style={styles.progressBar}>
                                    <Progress.Bar progress={0.3} width={200} />
                                </View>
                            </View>
                            <View style={styles.progressDetail}>
                                <Text style={styles.numberOfStart}>5</Text>
                                <View style={styles.progressBar}>
                                    <Progress.Bar progress={0.3} width={250} />
                                </View>
                            </View> */}
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.ReviewDetail}>
                            <Text style={styles.ReviewerName}>Nguyen Haang Duy</Text>
                            <AirbnbRating
                                count={5}
                                isDisabled={true}
                                showRating={false}
                                defaultRating={3}
                                selectedColor={Colors.primaryOrangeHex}
                                size={13}
                            />
                            <Text style={styles.ReviewerComment}>The product is goood!</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
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
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    EmptyView: {
        height: Spacing.space_36,
        width: Spacing.space_36,
    },
    AverageRatingText: {
        color: Colors.primaryWhiteHex,
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_16 * 4,
    },
    ReviewContent: {
        flex: 1,
        padding: Spacing.space_15,
    },
    titleReview: {
        color: Colors.primaryWhiteHex,
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_16,
    },
    AverageRatingLeft: {
        flexDirection: 'column',
    },

    Reviews: {
        flexDirection: 'column',
        gap: Spacing.space_15,
    },
    ReviewDetail: {
        marginTop: Spacing.space_10,
        alignItems: 'flex-start', // Căn về bên trái
        justifyContent: 'center',
        flexDirection: 'column',
        padding: Spacing.space_10,
        gap: Spacing.space_15,
        borderBottomColor: Colors.primaryDarkGreyHex,
        borderBottomWidth: Spacing.space_2,
    },
    progressContainer: {
        flexDirection: 'column',
        gap: Spacing.space_3,
        justifyContent: 'center',
        alignContent: 'center',
    },
    ReviewerName: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    AverageRatingContainer: {
        flexDirection: 'row',
        gap: Spacing.space_10,
    },
    ReviewerComment: {
        color: Colors.primaryWhiteHex,
    },
    text: {
        color: Colors.primaryWhiteHex,
    },
    numberOfStart: {
        fontFamily: 'poppins_medium',
        // fontSize: FontSize.size_16,
        color: Colors.primaryWhiteHex,
    },
    progressDetail: {
        flexDirection: 'row',
        gap: Spacing.space_10,
    },
    progressBar: {
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default ReviewScreen;
