import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ListRenderItem,
    Pressable,
} from 'react-native';
import Typo from '../Typo';
import { ArrowIcon } from '../../utils/imagesrc';
import { TYPOGRAPHY } from '../../theme/typography';


interface Option {
    label: string;
    value: string;
}

interface SearchDropdownProps {
    options: Option[];
    value?: string;
    placeholder?: string;
    label?: string;
    isMandatory?: boolean;
    error?: string | boolean;
    onValueChange?: (value: string) => void;
    onSearch?: (text: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
    options,
    value,
    placeholder = 'Select',
    label,
    isMandatory,
    error,
    onValueChange,
    onSearch,
}) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState<string>(value || '');

    const handleInputChange = (text: string) => {
        setInputValue(text);
        onSearch?.(text);
        setVisible(true);

        if (text === '') {
            onValueChange?.('');
        }
    };

    const handleSelect = (option: Option) => {
        setInputValue(option.label);
        setVisible(false);
        onValueChange?.(option.value);
    };

    const renderItem: ListRenderItem<Option> = ({ item }) => {
        const isSelected = item.value === value;
        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[styles.option, isSelected && { backgroundColor: '#EDFAEE' }]}
            >
                <Typo label={item?.label} color="#030204" variant="bodyMediumTertiary" />
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ gap: 6 }}>
            {label && (
                <View style={{ flexDirection: 'row', gap: 2 }}>
                    <Typo
                        color={error ? '#FF0004' : '#030204'}
                        label={label}
                        variant="bodyMediumTertiary"
                    />
                    {isMandatory && (
                        <Text style={{ color: '#FF0004', transform: [{ translateY: -2 }] }}>*</Text>
                    )}
                </View>
            )}

            <View style={[styles.wrapper, { borderColor: error ? '#FF0004' : '#D4CEDA' }]}>
                <Pressable
                    onPress={() => setVisible(!visible)}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 }}
                >
                    <Typo color='#030204' label={inputValue || placeholder} variant='bodyMediumTertiary' style={{ flex: 1, paddingVertical: 10 }} />

                    {/* <TextInput
                        value={inputValue}
                        placeholder={placeholder}
                        onChangeText={handleInputChange}
                        style={{ flex: 1, paddingVertical: 10 }}
                    /> */}
                    <ArrowIcon
                        color="#000"
                        style={{ transform: [{ rotate: visible ? '180deg' : '0deg' }] }}
                    />
                </Pressable>

                {visible && (
                    <View style={styles.dropdown}>
                        {options.length === 0 ? (
                            <Text style={{ padding: 12, color: '#999' }}>No data found</Text>
                        ) : (
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value}
                                renderItem={renderItem}
                                nestedScrollEnabled={true}
                                keyboardShouldPersistTaps="handled"
                            />
                        )}
                    </View>
                )}
            </View>

            {error && <Typo color="#FF0004" label={error} variant="bodyMediumTertiary" />}
        </View>
    );
};


export default SearchDropdown;
const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        borderWidth: 1,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    input: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        maxHeight: 200,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 999,
    },
    option: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4,
    },
    optionText: {
        fontSize: 14,
        fontFamily: TYPOGRAPHY.fontRegular,
        color: '#030204',
    },
});
