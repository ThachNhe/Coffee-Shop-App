import { useFonts } from 'expo-font';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import { Colors, FontSize } from '../../theme/theme';
import LottieView from 'lottie-react-native';
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { useForm, Controller } from 'react-hook-form';

const SignUpScreen = ({ navigation, route }) => {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const [fontsLoad] = useFonts({
        poppins_semibold: require('../../../assets/fonts/Poppins-SemiBold.ttf'),
        poppins_medium: require('../../../assets/fonts/Poppins-Medium.ttf'),
        poppins_light: require('../../../assets/fonts/Poppins-Light.ttf'),
        poppins_black: require('../../../assets/fonts/Poppins-Black.ttf'),
        poppins_bold: require('../../../assets/fonts/Poppins-Bold.ttf'),
        poppins_extrabold: require('../../../assets/fonts/Poppins-ExtraBold.ttf'),
        poppins_extralight: require('../../../assets/fonts/Poppins-ExtraLight.ttf'),
        poppins_regular: require('../../../assets/fonts/Poppins-Regular.ttf'),
        poppins_thin: require('../../../assets/fonts/Poppins-Thin.ttf'),
    });

    const { height } = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleBackSignInPress = () => {
        navigation.push('SignIn');
    };

    const handleGoogleSignInPress = () => {
        console.warn('Google Sign In');
    };

    const handleRegisterPress = () => {
        console.warn('Register');
    };

    const { control, handleSubmit, watch } = useForm({});
    const pwd = watch('password');

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.screenContainer}>
                <Text style={styles.signUpTitle}>Create an account</Text>

                <CustomInput
                    placeholder="Email"
                    rules={{ required: 'Email is required', pattern: {value: EMAIL_REGEX, message: "Email is invalid"} }}
                    control={control}
                    name="email"
                />
                <CustomInput
                    placeholder="Username"
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: "The username's length must be equal or longer than 3 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "The username's length must be equal or shorter than 20 characters",
                        },
                    }}
                    control={control}
                    name="username"
                />
                <CustomInput
                    placeholder="Password"
                    rules={{ required: 'Password is required', pattern: {value: PASSWORD_REGEX, message: "Password must contains at least 1 digit and 1 special character"} }}
                    control={control}
                    name="password"
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Confirm Password"
                    rules={{ required: 'Confirm Password is required', validate: value => value === pwd || "Password do not match"}}
                    control={control}
                    name="rePassword"
                    secureTextEntry
                />

                <Text style={styles.policyTermsText}>
                    By Registering, you confirm that you accept our <Text style={styles.link}>Terms of Use</Text> and{' '}
                    <Text style={styles.link}>Privacy Policy</Text>.
                </Text>

                <CustomButton text="Register" onPress={handleSubmit(handleRegisterPress)} />
                <GoogleSignInButton />
                <CustomButton text="Have an account? Sign in" onPress={handleBackSignInPress} type="SECONDARY" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryWhiteHex,
        alignItems: 'center',
        padding: 20,
        marginTop: 80,
    },
    imageLogo: {
        paddingBottom: 80,
    },
    LottieStyle: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LottieText: {
        fontFamily: 'poppins_medium',
        fontSize: FontSize.size_16,
        color: Colors.primaryOrangeHex,
        textAlign: 'center',
    },
    policyTermsText: {
        color: 'grey',
        marginVertical: 10,
    },
    link: {
        color: '#fdb075',
    },
    signUpTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 20,
    },
});

export default SignUpScreen;
