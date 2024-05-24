import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import { Colors, Spacing } from '../theme/theme';
import { StyleSheet } from 'react-native';
import useStore from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import FavouriteItemCard from '../components/FavouriteItemCard';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index';
import * as services from '../services/index';
const FavouritesScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getFavouriteListAction());
    }, [dispatch]);
    const FavouritesList = useSelector((state) => state.FavourList.favorite);
    const tabBarHeight = useBottomTabBarHeight();

    const ToggleFavourite = async (productId, favorite) => {
        let data = { productId: productId };
        try {
            let res = await services.deleteItemToFavourService(data);
            console.log('check res : ', res);
            if (res && res.errorCode === 0) {
                dispatch(actions.getFavouriteListAction());
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.ScreenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Favourites" />

                        {FavouritesList && FavouritesList.length == 0 ? (
                            <EmptyListAnimation title={'No Favourites'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {FavouritesList &&
                                    FavouritesList.map((data) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.push('Details', {
                                                    index: data.index,
                                                    id: data._id,
                                                    type: data.type,
                                                });
                                            }}
                                            key={data.id}
                                        >
                                            <FavouriteItemCard
                                                id={data._id}
                                                imagelink_portrait={data.imagelink_portrait}
                                                name={data.name}
                                                special_ingredient={data.special_ingredient}
                                                type={data.type}
                                                ingredients={data.ingredients}
                                                average_rating={data.average_rating}
                                                ratings_count={0}
                                                roasted={data.roasted}
                                                description={data.description}
                                                favourite={true}
                                                productId={data._id}
                                                ToggleFavouriteItem={ToggleFavourite}
                                            />
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: Spacing.space_20,

        gap: Spacing.space_20,
    },
});

export default FavouritesScreen;
