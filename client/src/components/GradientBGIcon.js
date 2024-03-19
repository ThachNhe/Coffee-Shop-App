import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '../theme/theme';
import CustomIcon from './CustomIcon';

const GradientBGIcon = (props) => {
    return (
        <View style={styles.gradientBGIconContainer}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[Colors.primaryGreyHex, Colors.primaryBlackHex]}
                style={styles.linearGradientBG}
            >
                <CustomIcon name={props.name} color={props.color} size={props.size} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    gradientBGIconContainer: {
        borderWidth: 2,
        borderColor: Colors.secondaryDarkGreyHex,
        borderRadius: Spacing.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryDarkGreyHex,
        overflow: 'hidden',
    },
    linearGradientBG: {
        height: Spacing.space_36,
        width: Spacing.space_36,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GradientBGIcon;
