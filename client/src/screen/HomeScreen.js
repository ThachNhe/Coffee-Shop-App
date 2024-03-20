import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import useStore from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import { useFonts } from 'expo-font';

const HomeScreen = ({ navigation }) => {
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
    const getCategoryFromData = (data) => {
        let temp = {};
        for (let i = 0; i < data.length; i++) {
            if (temp[data[i].name] === undefined) {
                temp[data[i].name] = 1;
            } else {
                temp[data[i].name]++;
            }
        }
        let categories = Object.keys(temp);
        categories.unshift('All');
        return categories;
    };

    const getCoffeeList = (category, data) => {
        if (category === 'All') {
            return data;
        } else {
            const coffeeList = data.filter((item) => item.name === category);
            return coffeeList;
        }
    };
    const CoffeeList = useStore((state) => state.CoffeeList);
    const BeanList = useStore((state) => state.BeanList);
    const [categories, setCategories] = useState(getCategoryFromData(CoffeeList));
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,

        category: categories[0],
    });
    const CartList = useStore((state) => state.CartList);
    const addToCart = useStore((state) => state.addToCart);
    const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));
    const ListRef = useRef();
    console.log('check sorted coffee : ', sortedCoffee[0]);

    const tabBarHeight = useBottomTabBarHeight();
    const searchCoffee = (search) => {
        if (search !== '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({
                index: 0,
                category: categories[0],
            });
            setSortedCoffee([...CoffeeList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))]);
        }
    };
    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: 0,
            offset: 0,
        });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedCoffee([...CoffeeList]);
        setSearchText('');
    };
    const calculateCartPrice = useStore((state) => state.calculateCartPrice);
    const CoffeCardAddToCart = ({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices }) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices,
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(`${name} is Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>
                {/* App Header */}
                <HeaderBar />

                <Text style={styles.screenTitle}>Find the best{'\n'}coffee for you</Text>

                {/* Search bar*/}
                <View style={styles.inputContainerComponent}>
                    <TouchableOpacity
                        onPress={() => {
                            searchCoffee(searchText);
                        }}
                        style={styles.inputIcon}
                    >
                        <CustomIcon
                            name="search"
                            size={FontSize.size_18}
                            color={searchText.length > 0 ? Colors.primaryOrangeHex : Colors.primaryLightGreyHex}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Find Your Coffee ..."
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            searchCoffee(text);
                        }}
                        placeholderTextColor={Colors.primaryLightGreyHex}
                        style={styles.textInputContainer}
                    ></TextInput>
                    {searchText.length > 0 ? (
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                resetSearchCoffee();
                            }}
                        >
                            <CustomIcon name="close" size={FontSize.size_16} color={Colors.primaryLightGreyHex} />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>

                {/* Category Scroller*/}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScrollViewStyle}
                >
                    {categories.map((data, index) => (
                        <View key={index.toString()} style={styles.categoryScrollViewContainer}>
                            <TouchableOpacity
                                style={styles.categoryScrollViewItem}
                                onPress={() => {
                                    ListRef?.current.scrollToOffset({
                                        animated: true,
                                        offset: 0,
                                    });
                                    setCategoryIndex({
                                        index: index,
                                        category: categories[index],
                                    });
                                    setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)]);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        categoryIndex.index == index ? { color: Colors.primaryOrangeHex } : {},
                                    ]}
                                >
                                    {data}
                                </Text>
                                {categoryIndex.index == index ? <View style={styles.activeCategory}></View> : <></>}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                {/* Coffee Flatlist*/}
                <FlatList
                    ref={ListRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.categoryText}>No Coffee Available!</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={sortedCoffee}
                    contentContainerStyle={styles.flatListContainer}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('Details');
                            }}
                        >
                            <CoffeeCard
                                name={item.name}
                                id={item.id}
                                index={item.index}
                                type={item.type}
                                roasted={item.roasted}
                                imagelink_square={item.imagelink_square}
                                special_ingredient={item.special_ingredient}
                                average_rating={item.average_rating}
                                price={item.prices[2]}
                                buttonPressHandler={CoffeCardAddToCart}
                            />
                        </TouchableOpacity>
                    )}
                />

                {/* Coffee Beans*/}
                <Text style={styles.coffeeBeanTitle}>Coffee Beans</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    contentContainerStyle={[styles.flatListContainer, { marginBottom: tabBarHeight }]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('Details');
                            }}
                        >
                            <CoffeeCard
                                name={item.name}
                                id={item.id}
                                index={item.index}
                                type={item.type}
                                roasted={item.roasted}
                                imagelink_square={item.imagelink_square}
                                special_ingredient={item.special_ingredient}
                                average_rating={item.average_rating}
                                price={item.prices[2]}
                                buttonPressHandler={CoffeCardAddToCart}
                            />
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
    },
    screenTitle: {
        fontSize: FontSize.size_28,
        fontFamily: 'poppins_semibold',
        color: Colors.primaryWhiteHex,
        paddingLeft: Spacing.space_30,
    },
    textInputContainer: {
        flex: 1,
        height: Spacing.space_20 * 3,
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
    },
    inputContainerComponent: {
        flexDirection: 'row',
        margin: Spacing.space_20,
        borderRadius: BorderRadius.radius_20,
        backgroundColor: Colors.primaryDarkGreyHex,
        alignItems: 'center',
    },
    inputIcon: {
        marginHorizontal: Spacing.space_20,
    },
    categoryScrollViewStyle: {
        paddingHorizontal: Spacing.space_20,
        marginBottom: Spacing.space_20,
    },
    categoryScrollViewContainer: {
        paddingHorizontal: Spacing.space_15,
    },
    categoryScrollViewItem: {
        alignItems: 'center',
    },
    categoryText: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryLightGreyHex,
        marginBottom: Spacing.space_4,
    },
    activeCategory: {
        height: Spacing.space_10,
        width: Spacing.space_10,
        borderRadius: BorderRadius.radius_10,
        backgroundColor: Colors.primaryOrangeHex,
    },
    flatListContainer: {
        gap: Spacing.space_20,
        paddingHorizontal: Spacing.space_20,
        paddingVertical: Spacing.space_20,
    },
    emptyListContainer: {
        width: Dimensions.get('window').width - Spacing.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.space_36 * 3.6,
    },
    coffeeBeanTitle: {
        fontSize: FontSize.size_18,
        marginLeft: Spacing.space_30,
        marginTop: Spacing.space_20,
        fontFamily: 'poppins_medium',
        color: Colors.secondaryLightGreyHex,
    },
});
export default HomeScreen;
