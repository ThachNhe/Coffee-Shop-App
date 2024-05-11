import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

const GoogleSignInButton = () => {
    const handleGoogleSignInPress = () => {
        console.warn("Google sign in")
    }
    return (
        <CustomButton
            text="Sign in with Google"
            onPress={handleGoogleSignInPress}
            bgColor="#fae9ea"
            textColor="#dd4d44"
        />
    );
};

const styles = StyleSheet.create({});

export default GoogleSignInButton;
