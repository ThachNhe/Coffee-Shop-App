import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { Spacing } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectDropdownComponent = ({ data }) => {
    return (
        <View>
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                            {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.title) || 'Select your product'}
                            </Text>
                            <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                style={styles.dropdownButtonArrowStyle}
                            />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View
                            style={{
                                ...styles.dropdownItemStyle,
                                ...(isSelected && { backgroundColor: '#D2D9DF' }),
                            }}
                        >
                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '95%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: Spacing.space_20,
        // marginVertical: Spacing.space_10,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
});
export default SelectDropdownComponent;
