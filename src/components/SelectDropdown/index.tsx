import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ListRenderItem,
    Text,
} from 'react-native';
import Typo from '../Typo';
import { ArrowIcon } from '../../utils/imagesrc';
import { TYPOGRAPHY } from '../../theme/typography';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    options?: Option[];
    value?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    label?: string;
    error?: string | boolean;
    isMandatory?: boolean
}

const SelectDropdown: React.FC<DropdownProps> = ({
    options = [],
    value,
    placeholder = 'Select',
    onValueChange,
    label,
    error,
    isMandatory
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(
        value || options?.[0]?.value || '',
    );

    useEffect(() => {
        if (value !== undefined) {
            setSelected(value);
        }
    }, [value]);

    const handleSelect = (option: Option) => {
        setSelected(option.value);
        setVisible(false);
        onValueChange?.(option.value);
    };

    const renderItem: ListRenderItem<Option> = ({ item }) => (
        <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => handleSelect(item)}>
            <Typo
                label={item.label}
                style={[
                    styles.optionText,
                    selected === item.value && { color: '#030204', backgroundColor: '#EDFAEE' },
                ]}
            />
        </TouchableOpacity>
    );

    const selectedLabel =
        options.find(o => o.value === selected)?.label || placeholder;

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
                        <Text style={{ color: '#FF0004', transform: [{ translateY: -2 }] }}>
                            *
                        </Text>
                    )}
                </View>
            )}
            <View style={[styles.wrapper, { borderColor: error ? '#FF0004' : '#D4CEDA', }]}>
                <TouchableOpacity style={styles.trigger} onPress={() => setVisible(prev => !prev)}>
                    <Typo color='#030204' label={selectedLabel} variant='bodyMediumTertiary' />
                    <ArrowIcon
                        color="#000000"
                        style={{ transform: [{ rotate: visible ? '180deg' : '0deg' }] }} />
                </TouchableOpacity>

                {visible && (
                    <View style={styles.dropdown}>
                        {options.length === 0 ? (
                            <Text style={{ padding: 12, color: '#999' }}>No data found</Text>
                        ) : (
                            <FlatList
                                data={options}
                                keyExtractor={item => item.value}
                                renderItem={renderItem}
                                nestedScrollEnabled={true}
                                keyboardShouldPersistTaps="handled"
                            />
                        )}
                    </View>
                )}
            </View>
            {error && <Typo color={'#FF0004'} label={error} variant='bodyMediumTertiary' />}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        borderWidth: 1,
        paddingVertical: 13,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    trigger: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdown: {
        backgroundColor: '#ffffff',
        borderRadius: 4,
        padding: 4,
        position: 'absolute',
        top: 50,
        right: 0,
        left: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 999
    },
    optionText: {
        fontSize: 14,
        color: '#030204',
        fontFamily: TYPOGRAPHY.fontRegular,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4
    },
});

export default SelectDropdown;
