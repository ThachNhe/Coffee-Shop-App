import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Button,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
    ToastAndroid,
} from 'react-native';
import { Colors, Spacing } from '../theme/theme';
import * as actions from '../redux/actions/index';
import { useSelector, useDispatch } from 'react-redux';
const logo = require('../assets/app_images/logo.png');
const facebook = require('../assets/app_images/facebook.png');
const linkedin = require('../assets/app_images/google.png');

const LoginScreen = ({ navigation }) => {
    const [click, setClick] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [correctInput, setIncorrectInput] = useState(true);
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    console.log('check correctInput', correctInput);
    useEffect(() => {
        if (userInfo && userInfo.errorCode === 0) {
            setIncorrectInput(true);
            ToastAndroid.showWithGravity(`Login success!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.navigate('Home');
        }
        if (userInfo && userInfo.errorCode !== 0) {
            setIncorrectInput(false);
        }
    }, [userInfo]);
    const handlerLogin = async () => {
        try {
            let body = { email: username, password: password };
            dispatch(actions.userLoginAction(body));
            console.log('check userInfo  :', userInfo);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL OR USERNAME"
                    value={username}
                    onChangeText={setUsername}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor={Colors.primaryGreyHex}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PASSWORD"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor={Colors.primaryGreyHex}
                />
            </View>
            {correctInput === false && <Text style={styles.inputIncorrect}>Username or password not correct!</Text>}
            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch value={click} onValueChange={setClick} trackColor={{ true: 'green', false: 'gray' }} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => Alert.alert('Forget Password!')}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => handlerLogin()}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Text style={styles.optionsText}>OR LOGIN WITH</Text>
            </View>

            <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons} />
                <Image source={linkedin} style={styles.icons} />
            </View>

            <Text style={styles.footerText}>
                Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70,
        backgroundColor: Colors.primaryBlackHex,
    },
    image: {
        height: 160,
        width: 170,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingVertical: 40,
        color: Colors.secondaryLightGreyHex,
    },
    inputView: {
        gap: 15,
        width: '100%',
        paddingHorizontal: 40,
        marginBottom: 5,
    },
    inputIncorrect: {
        color: Colors.primaryRedHex,
        fontSize: Spacing.space_15,
        alignItems: 'left',
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: Colors.primaryOrangeHex,
        borderWidth: 1,
        borderRadius: 7,
        color: Colors.primaryOrangeHex,
    },
    rememberView: {
        width: '100%',
        paddingHorizontal: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8,
    },
    switch: {
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberText: {
        fontSize: 13,
        color: Colors.secondaryLightGreyHex,
    },
    forgetText: {
        fontSize: 11,
        color: Colors.primaryOrangeHex,
    },
    button: {
        // backgroundColor: 'red',
        backgroundColor: Colors.primaryGreyHex,
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.primaryOrangeHex,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonView: {
        width: '100%',
        paddingHorizontal: 50,
    },
    optionsText: {
        textAlign: 'center',
        paddingVertical: 10,
        color: 'gray',
        fontSize: 13,
        marginBottom: 6,
    },
    mediaIcons: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
    },
    icons: {
        width: 40,
        height: 40,
    },
    footerText: {
        textAlign: 'center',
        color: 'gray',
    },
    signup: {
        color: Colors.primaryOrangeHex,
        fontSize: 13,
    },
});
export default LoginScreen;
