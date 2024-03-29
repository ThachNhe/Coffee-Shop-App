import { StyleSheet, Text, View } from 'react-native';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import { useFonts } from 'expo-font';

const FavouriteItemCard = ({
    id,
    imagelink_portrait,
    name,
    type,
    average_rating,
    special_ingredient,
    ingredients,
    ratings_count,
    roasted,
    description,
    favourite,
    ToggleFavouriteItem,
}) => {
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
    return (
        <View style={styles.CardContainer}>
            <ImageBackgroundInfo
                EnableBackHandler={false}
                imagelink_portrait={imagelink_portrait}
                type={type}
                id={id}
                favourite={favourite}
                name={name}
                special_ingredient={special_ingredient}
                ingredients={ingredients}
                average_rating={average_rating}
                ratings_count={ratings_count}
                roasted={roasted}
                ToggleFavourite={ToggleFavouriteItem}
            />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                style={styles.ContainerLinearGradient}
            >
                <Text style={styles.DescriptionTitle}>Description</Text>
                <Text style={styles.DescriptionText}>{description}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        borderRadius: BorderRadius.radius_25,
        overflow: 'hidden',
    },
    ContainerLinearGradient: {
        gap: Spacing.space_10,
        padding: Spacing.space_20,
    },
    DescriptionTitle: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_16,
        color: Colors.secondaryLightGreyHex,
    },
    DescriptionText: {
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_14,
        color: Colors.primaryWhiteHex,
    },
});

export default FavouriteItemCard;
