import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontFamily, FontSize, Spacing } from '../theme/theme';
import ProfilePicture from './ProfilePicture';
import GradientBGIcon from './GradientBGIcon';
import { useFonts } from 'expo-font';

const HeaderBar = (props) => {
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
        <View style={styles.headerContainer}>
            <GradientBGIcon name="menu" color={Colors.primaryLightGreyHex} size={FontSize.size_16} />
            <Text style={styles.headerText}>{props.title}</Text>
            <ProfilePicture />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: Spacing.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    headerText: {
        fontFamily: 'poppins_semibold',
        fontSize: FontSize.size_20,
        color: Colors.primaryWhiteHex,
    },
});

export default HeaderBar;
