import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RatingBar = ({ rating, percentage }) => (
    <View style={styles.ratingBarContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
        <View style={styles.barContainer}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={[styles.bar, { width: `${percentage}%` }]}
            />
            <View style={[styles.barBackground, { width: `${100 - percentage}%` }]} />
        </View>
    </View>
);
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    ratingBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    ratingText: {
        width: 20,
        fontSize: 16,
        textAlign: 'right',
        marginRight: 8,
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    bar: {
        height: 10,
        borderRadius: 5,
    },
    barBackground: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
});
export default RatingBar;
