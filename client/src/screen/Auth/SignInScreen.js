import { useFonts } from 'expo-font';
import {
    Image,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Colors, FontSize } from '../../theme/theme';
import LottieView from 'lottie-react-native';
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { useForm, Controller } from 'react-hook-form';

const SignInScreen = ({ navigation, route }) => {
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
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const { control, handleSubmit, formState: {errors}, } = useForm({});
    console.log("errors: ", errors);

    const handleSignInPress = (data) => {
        console.log('data: ', data);
        console.warn('Sign in');
        
    };

    const handleForgotPasswordPress = () => {
        console.warn('Forgot Password');
    };

    const handleSignUpPress = () => {
        navigation.push('SignUp');
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.screenContainer}>
                <View style={styles.imageLogo}>
                   <Text style={styles.signInTitle}>Sign in</Text>
                </View>

                <CustomInput rules={{required: 'Username is required'}} control={control} name="username" placeholder="Username" />
                
                <CustomInput rules={{required: 'Password is required'}} control={control} name="password" placeholder="Password" secureTextEntry />
                

                <CustomButton text="Sign In" onPress={handleSubmit(handleSignInPress)} />
                {/* <CustomButton text="Forgot Password ?" onPress={handleForgotPasswordPress} type="SECONDARY" /> */}
                <GoogleSignInButton />

                <CustomButton text="Don't have an account ? Create one" onPress={handleSignUpPress} type="SECONDARY" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.primaryWhiteHex,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 80
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
    signInTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 20,
        paddingTop: 40,

    }
});

export default SignInScreen;
