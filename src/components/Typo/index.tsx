import React, { useState } from 'react';
import { Text, View, TextStyle, StyleProp } from 'react-native';
import { styles } from './style';
import { COLORS } from '../../theme/colors';

interface TypoProps {
  variant?: keyof typeof styles;
  label?: string | number | null | boolean;
  tooltip?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  showMore?: boolean;
  maxCharacters?: number;
  style?: StyleProp<TextStyle>;
  color?: string;
}

const Typo: React.FC<TypoProps> = ({
  variant,
  label,
  tooltip,
  numberOfLines,
  ellipsizeMode,
  onPress,
  showMore,
  maxCharacters = 50,
  color,
  style,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLabelText = () => {
    if (!showMore || !label) return label;
    if (
      typeof label === 'string' &&
      label?.length > maxCharacters &&
      !isExpanded
    ) {
      return `${label?.substring(0, maxCharacters)}... `;
    }
    return label;
  };

  return (
    <View
      style={
        tooltip
          ? {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }
          : undefined
      }
    >
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={[variant && styles[variant], style, { color: color }]}
        onPress={onPress}
      >
        {getLabelText()}
      </Text>
      {showMore && label && label.length > maxCharacters && (
        <Text
          style={{ color: COLORS.disabled, marginBottom: 5 }}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </Text>
      )}
    </View>
  );
};

export default Typo;
