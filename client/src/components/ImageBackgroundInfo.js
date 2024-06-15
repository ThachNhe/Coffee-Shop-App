import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import { BorderRadius, Colors, FontSize, Spacing } from '../theme/theme';
import CustomIcon from './CustomIcon';

const ImageBackgroundInfo = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    productId,
    BackHandler,
    ToggleFavourite,
    role,
}) => {
    const image = {
        uri: imagelink_portrait ? String(imagelink_portrait) : 'OKOK',
    };

    return (
        <View>
            <ImageBackground source={image} style={styles.ItemBackgroundImage}>
                {EnableBackHandler ? (
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity
                            onPress={() => {
                                BackHandler();
                            }}
                        >
                            <GradientBGIcon name="left" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
                        </TouchableOpacity>
                        {role !== 'admin' && (
                            <TouchableOpacity
                                onPress={() => {
                                    ToggleFavourite(productId, favourite);
                                }}
                            >
                                <GradientBGIcon
                                    name="like"
                                    color={favourite ? Colors.primaryRedHex : Colors.primaryLightGreyHex}
                                    size={FontSize.size_16}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <View style={styles.ImageHeaderBarContainerWithoutBack}>
                        {role !== 'admin' && (
                            <TouchableOpacity
                                onPress={() => {
                                    ToggleFavourite(productId, favourite);
                                }}
                            >
                                <GradientBGIcon
                                    name="like"
                                    color={favourite ? Colors.primaryRedHex : Colors.primaryLightGreyHex}
                                    size={FontSize.size_16}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>{name}</Text>
                                <Text style={styles.ItemSubtitleText}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'bean' : 'beans'}
                                        size={type == 'Bean' ? FontSize.size_18 : FontSize.size_24}
                                        color={Colors.primaryOrangeHex}
                                    />
                                    <Text
                                        style={[
                                            styles.PropertyTextFirst,
                                            {
                                                marginTop: type == 'Bean' ? Spacing.space_4 + Spacing.space_2 : 0,
                                            },
                                        ]}
                                    >
                                        {type}
                                    </Text>
                                </View>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'location' : 'drop'}
                                        size={FontSize.size_16}
                                        color={Colors.primaryOrangeHex}
                                    />
                                    <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.InfoContainerRow}>
                            <View style={styles.RatingContainer}>
                                <CustomIcon name={'star'} color={Colors.primaryOrangeHex} size={FontSize.size_20} />
                                <Text style={styles.RatingText}>{average_rating}</Text>
                                <Text style={styles.RatingCountText}>({ratings_count})</Text>
                            </View>
                            <View style={styles.RoastedContainer}>
                                <Text style={styles.RoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack: {
        padding: Spacing.space_30,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: Spacing.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ImageInfoOuterContainer: {
        paddingVertical: Spacing.space_24,
        paddingHorizontal: Spacing.space_30,
        backgroundColor: Colors.primaryBlackRGBA,
        borderTopLeftRadius: BorderRadius.radius_20 * 2,
        borderTopRightRadius: BorderRadius.radius_20 * 2,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: Spacing.space_15,
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_24,
        color: Colors.primaryWhiteHex,
    },
    ItemSubtitleText: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_12,
        color: Colors.primaryWhiteHex,
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.space_20,
    },
    ProperFirst: {
        height: 55,
        width: 55,
        BorderRadius: BorderRadius.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryBlackHex,
    },
    PropertyTextFirst: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_10,
        color: Colors.primaryWhiteHex,
    },
    PropertyTextLast: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_10,
        color: Colors.primaryWhiteHex,
        marginTop: Spacing.space_2 + Spacing.space_4,
    },
    RatingContainer: {
        flexDirection: 'row',
        gap: Spacing.space_10,
        alignItems: 'center',
    },
    RatingText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_18,
        color: Colors.primaryWhiteHex,
    },
    RatingCountText: {
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_12,
        color: Colors.primaryWhiteHex,
    },
    RoastedContainer: {
        height: 55,
        width: 55 * 2 + Spacing.space_20,
        BorderRadius: BorderRadius.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryBlackHex,
    },
    RoastedText: {
        fontFamily: 'poppins_regular',
        fontSize: FontSize.size_10,
        color: Colors.primaryWhiteHex,
    },
});
export default ImageBackgroundInfo;
