import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../theme/theme';

const ProfilePicture = () => {
    return (
        <View style={styles.imageContainer}>
            <Image source={require('../assets/app_images/avatar.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: Spacing.space_36,
        width: Spacing.space_36,
        borderRadius: Spacing.space_12,
        borderWidth: 2,
        borderColor: Colors.secondaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        height: Spacing.space_36,
        width: Spacing.space_36,
    },
});

export default ProfilePicture;
