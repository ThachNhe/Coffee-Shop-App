import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../theme/theme';
import { Controller } from 'react-hook-form';

const CustomInput = ({ rules = {}, control, name, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                rules={rules}
                name={name}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                        <View style={[styles.inputContainer, { borderColor: error ? 'red' : '#e8e8e8' }]}>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                style={styles.input}
                                secureTextEntry={secureTextEntry}
                            ></TextInput>
                        </View>
                        {error && <Text style={styles.errorMessage}>*{error.message || 'Error'}</Text>}
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.primaryWhiteHex,
        width: '100%',
        height: 55,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        marginBottom: 20,
    },
    errorMessage: {
        marginBottom: 20,
        color: 'red',
        alignSelf: 'stretch',
    },
});

export default CustomInput;
