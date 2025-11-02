import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const CustomCheckBox: React.FC<Props> = ({ label, value, onValueChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onValueChange(!value)} activeOpacity={0.8}>
      <View style={[styles.box, value && styles.checkedBox]}>
        {value && (
          <Icon name="check" size={16} color="#26805E" />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    // marginBottom: 20,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#fff', // A dark blue color
    borderColor: '#26805E',
  },
  checkmark: {
    color: '#26805E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#555',
    // Allow the label to take up remaining space
    flex: 1, 
  },
});

export default CustomCheckBox;