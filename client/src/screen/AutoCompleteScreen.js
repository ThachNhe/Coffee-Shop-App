import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { FontAwesome } from '@expo/vector-icons';
import { AddressDataset } from '../theme/theme';

const AutocompleteExample = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        if (query.length > 0) {
            const filteredData = AddressDataset.filter((city) => city.name.toLowerCase().includes(query.toLowerCase()));
            setData(filteredData);
        } else {
            setData([]);
        }
    }, [query]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                setSelectedCity(item);
                setQuery(item.name);
                setData([]);
                Keyboard.dismiss();
            }}
        >
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Chọn thành phố của bạn</Text>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={data}
                    defaultValue={query}
                    onChangeText={(text) => setQuery(text)}
                    placeholder="Gõ tên thành phố..."
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        renderItem: renderItem,
                        style: styles.flatList,
                    }}
                    inputContainerStyle={styles.inputContainer}
                    listContainerStyle={styles.listContainer}
                    style={styles.input}
                    hideResults={data.length === 0}
                />
                {selectedCity && (
                    <View style={styles.selectedContainer}>
                        <FontAwesome name="map-marker" size={20} color="#0096FF" />
                        <Text style={styles.selectedText}>Bạn đã chọn: {selectedCity.name}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 60,
        zIndex: 1,
        padding: 16,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    input: {
        height: 40,
        fontSize: 16,
    },
    listContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        maxHeight: 200,
    },
    flatList: {
        paddingHorizontal: 5,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 250,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#0096FF',
    },
});

export default AutocompleteExample;
