import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Platform, 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Icon from 'react-native-vector-icons/Feather';

// NOTE: Replace these with your actual component and utility imports
import { VerifiedIcon } from '../../utils/svgSrc';
import Typo from '../Typo';
// Mock hook data if useGetCountry is not available outside your project
const useGetCountry = () => ({ 
  data: [{ id: 1, dialCode: '91' }, { id: 2, dialCode: '1' }] 
});
// -----------------------------------------------------------

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  onSelect?: (value: string) => void;
  onBlur?: (e: any) => void;
  onDateSelect?: (date: Date) => void; 
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  onIconPress?: () => void;
  iconName?: string;
  error?: any;
  type?: 'text' | 'select' | 'mobile' | 'date'; 
  options?: string[];
  isMandatory?: boolean;
  countryCode?: string | number;
  onCountrySelect?: (code: string) => void;
  countryCodes?: string[];
  isVerify?: boolean;
  onVerifyPress?: () => () => void;
  disabled?: boolean;
}

const CustomTextInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onSelect,
  onBlur,
  onDateSelect,
  secureTextEntry = false,
  keyboardType = 'default',
  onIconPress,
  iconName,
  error,
  type = 'text',
  options = [],
  isMandatory,
  countryCode = '91',
  onCountrySelect,
  isVerify,
  onVerifyPress,
  disabled = false,
}) => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 

  const [newCountryCode, setNewCountryCode] = useState(countryCode);
  const { data: countryList } = useGetCountry();

  const handleSelectOption = (option: string) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsSelectModalOpen(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      onDateSelect?.(selectedDate);
    }
  };

  const currentDateTime = value && !isNaN(new Date(value).getTime()) ? new Date(value) : new Date();

  const showIosPicker = () => {
    setShowDatePicker(true);
  }

  const countryCodes = countryList?.map((el: any) => ({
    id: el?.id,
    val: el?.dialCode,
  }));

  const borderColor = error ? '#FF0004' : '#D4CEDA';

  return (
    <View style={{ flex: 1, gap: 6 }}>
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

      {/* --- START: Date Input Type --- */}
      {type === 'date' ? (
        <TouchableOpacity
          // Background color is now derived from default inputWrapper (white)
          style={[styles.inputWrapper, { borderColor: borderColor }]}
          onPress={Platform.OS === 'ios' ? showIosPicker : () => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text 
            style={[
              styles.input, 
              !value && styles.placeholderText, 
              // Set value text color to black
              value && styles.dateValueText 
            ]}
          >
            {value || placeholder}
          </Text>
          <View style={{ padding: 12 }}>
            {/* Changed icon color to suit white background */}
            <Icon name={'calendar'} size={24} color="#148057" />
          </View>
        </TouchableOpacity>
      ) :
      /* --- END: Date Input Type --- */

      /* --- START: Select Input Type (Modal Trigger) --- */
      type === 'select' ? (
        <TouchableOpacity
          style={[styles.inputWrapper, { borderColor }]}
          onPress={() => setIsSelectModalOpen(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.input, !value && styles.placeholderText]}>
            {value || placeholder}
          </Text>
          <View style={{ padding: 12 }}>
            <Icon name={'chevron-down'} size={22} color="#616161" />
          </View>
        </TouchableOpacity>
      ) : 
      /* --- END: Select Input Type --- */
      
      /* --- START: Mobile Input Type --- */
      type === 'mobile' ? (
        <View style={[styles.inputWrapper, { borderColor }]}>
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.countryText}>{`+${newCountryCode}`}</Text>
            <Icon
              name={isMobileDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#616161"
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            keyboardType="phone-pad"
          />
          {onVerifyPress &&
            (isVerify ? (
              <TouchableOpacity onPress={onVerifyPress} style={{ padding: 12 }}>
                <Typo
                  label={'Verify'}
                  color="#148057"
                  variant="bodyMediumPrimary"
                />
              </TouchableOpacity>
            ) : (
              <View style={{ padding: 12 }}>
                <VerifiedIcon />
              </View>
            ))}
        </View>
      ) : 
      /* --- END: Mobile Input Type --- */

      /* --- START: Standard Text Input Type --- */
      (
        <View
          style={[
            styles.inputWrapper,
            { borderColor },
            disabled && { backgroundColor: '#F5F5F5' },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
            editable={!disabled}
          />
          {iconName && (
            <TouchableOpacity onPress={onIconPress} style={{ padding: 12 }}>
              <Icon name={iconName} size={22} color="#616161" />
            </TouchableOpacity>
          )}
          {onVerifyPress &&
            (isVerify ? (
              <TouchableOpacity onPress={onVerifyPress} style={{ padding: 12 }}>
                <Typo
                  label={'Verify'}
                  color="#148057"
                  variant="bodyMediumPrimary"
                />
              </TouchableOpacity>
            ) : (
              <View style={{ padding: 12 }}>
                <VerifiedIcon />
              </View>
            ))}
        </View>
      )}


      {/* --- MODAL: SELECT OPTIONS (type='select') --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSelectModalOpen}
        onRequestClose={() => setIsSelectModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsSelectModalOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Typo label={label || placeholder} variant="bodyMediumPrimary" />
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => handleSelectOption(option)}
                >
                  <Typo
                    label={option}
                    variant="bodyMedium"
                    color={option === value ? '#009E69' : '#212121'}
                  />
                  {option === value && <Icon name="check" size={20} color="#009E69" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- DATE PICKER COMPONENT (Android) --- */}
      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={currentDateTime}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* --- DATE PICKER MODAL (iOS) --- */}
      {Platform.OS === 'ios' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          >
            <View style={styles.iOSPickerContainer}>
              <View style={styles.iOSPickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.iOSDoneButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={currentDateTime}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* --- INLINE DROPDOWN: MOBILE COUNTRY CODE (type='mobile') --- */}
      {type === 'mobile' && isMobileDropdownOpen && (
        <View style={styles.countryDropdownContainer}>
          <FlatList
            data={countryCodes}
            keyExtractor={(item) => item?.id?.toString()}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  onCountrySelect?.(item);
                  setNewCountryCode(item?.val);
                  setIsMobileDropdownOpen(false);
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#212121' }}
                >{`+${item?.val}`}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {error && (
        <Typo
          color={'#FF0004'}
          label={error}
          variant="bodyMediumTertiary"
        />
      )}
    </View>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // Default white background
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212121', // Default value text color (Black)
  },
  placeholderText: {
    color: '#9E9E9E', // Default placeholder text color (Grey)
  },
  // Specific style for the date value text (ensures it is black when a date is selected)
  dateValueText: {
    color: '#212121', 
  },
  countryDropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#FFFFFF',
    borderColor: '#D4CEDA',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 220,
    width: 120,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#D4CEDA',
  },
  countryText: {
    fontSize: 16,
    color: '#212121',
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '60%',
    width: '100%',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor:'#E5F8E6'
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  // --- iOS Picker Styles ---
  iOSPickerContainer: {
    backgroundColor: 'white',
    width: '100%',
  },
  iOSPickerHeader: {
    width: '100%',
    padding: 10,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iOSDoneButton: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default CustomTextInput;