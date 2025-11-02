import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { Typo } from '../../../../../../components';
import { ArrowIcon } from '../../../../../../utils/imagesrc';


interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options?: Option[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value,
  placeholder = 'Select',
  onValueChange,
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
    <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
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
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(prev => !prev)}
      >
        <Typo color='#030204' label={selectedLabel} variant='bodyMediumTertiary' />
        <ArrowIcon
          color="#000000"
          style={{
            transform: [{ rotate: visible ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 10,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 40,
    alignItems: 'center',
    borderColor: '#D4CEDA',
    backgroundColor: '#ffffff',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 8,
    width: 160,
    marginTop: 6,
    position: 'absolute',
    top: 30,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  option: {
    paddingHorizontal: 4,
  },
  optionText: {
    fontSize: 14,
    color: '#030204',
    fontFamily: 'GeneralSans-Regular',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
});

export default Dropdown;
