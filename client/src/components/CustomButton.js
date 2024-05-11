import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/theme';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, textColor }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, styles[`container_${type}`], bgColor ? { backgroundColor: bgColor } : {}]}
        >
            <Text style={[styles.text, styles[`text_${type}`], textColor ? { color: textColor } : {}]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#3b71f3',
    },
    container_SECONDARY: {
        backgroundColor: 'transparent',
        alignItems: 'center',
    },

    text: {
        fontWeight: 'bold',
    },
    text_PRIMARY: {
        color: Colors.primaryWhiteHex,
    },
    text_SECONDARY: {
        color: 'grey',
    },
});

export default CustomButton;
