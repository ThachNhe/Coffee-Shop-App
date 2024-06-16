import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';
import { useFonts } from 'expo-font';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard = ({
    productId,
    quantity,
    type,
    size,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
    role,
    cardType,
}) => {
    // console.log('check props proID  :', productId);

    // console.log('check props quantity  :', quantity);
    // console.log('check props size  :', size);

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

    const image = {
        uri: imagelink_square ? String(imagelink_square) : 'OKOK',
    };
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardLinearGradientContainer}
            colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
        >
            {cardType === 'BEAN' && (
                <ImageBackground source={imagelink_square} style={styles.cardImageBG} resizeMode="cover">
                    <View style={styles.cardRatingContainer}>
                        <CustomIcon name="star" color={Colors.primaryOrangeHex} size={FontSize.size_16} />
                        <Text style={styles.cardRatingText}>{average_rating}</Text>
                    </View>
                </ImageBackground>
            )}

            {cardType === 'COFFEE' && (
                <ImageBackground source={image} style={styles.cardImageBG} resizeMode="cover">
                    <View style={styles.cardRatingContainer}>
                        <CustomIcon name="star" color={Colors.primaryOrangeHex} size={FontSize.size_16} />
                        <Text style={styles.cardRatingText}>{average_rating}</Text>
                    </View>
                </ImageBackground>
            )}

            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
            <View style={styles.cardFooterRow}>
                <Text style={styles.cardPriceCurrency}>
                    $<Text style={styles.cardPrice}>{price.price}</Text>
                </Text>
                {role !== 'admin' && (
                    <TouchableOpacity
                        onPress={() => {
                            buttonPressHandler(productId, quantity, size, name);
                        }}
                    >
                        <BGIcon
                            color={Colors.primaryWhiteHex}
                            name="add"
                            BGColor={Colors.primaryOrangeHex}
                            size={FontSize.size_10}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cardLinearGradientContainer: {
        padding: Spacing.space_15,
        borderRadius: BorderRadius.radius_25,
    },
    cardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BorderRadius.radius_20,
        marginBottom: Spacing.space_15,
        overflow: 'hidden',
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.space_10,
        paddingHorizontal: Spacing.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BorderRadius.radius_20,
        borderTopRightRadius: BorderRadius.radius_20,
        top: 0,
        right: 0,
    },
    cardRatingText: {
        fontFamily: 'poppins_medium',
        color: Colors.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FontSize.size_14,
    },
    cardTitle: {
        fontFamily: 'poppins_medium',
        color: Colors.primaryWhiteHex,
        fontSize: FontSize.size_16,
    },
    cardSubTitle: {
        fontFamily: 'poppins_light',
        color: Colors.primaryWhiteHex,
        fontSize: FontSize.size_10,
    },
    cardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.space_15,
    },
    cardPriceCurrency: {
        fontFamily: 'poppins_medium',
        color: Colors.primaryOrangeHex,
        fontSize: FontSize.size_18,
    },
    cardPrice: {
        color: Colors.primaryWhiteHex,
        fontFamily: ' poppins_medium',
    },
});

export default CoffeeCard;
