import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import Typo from '../Typo';

interface GraphCardProps {
  value: string | number;
  label: string;
  subValue?: string | number;
  color: string;
}

const SingleGraphCard: React.FC<GraphCardProps> = ({ value, label, subValue, color }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {value?.toString() && (
          <Typo color='#030204' label={value} variant='headingSmallSecondary' />
        )}
        {subValue?.toString() && (
          <Typo color='#67606E' label={`/ ${subValue}`} variant='bodyLargeTertiary' />
        )}
      </View>

      <Typo label={label} color='#67606E' variant='bodySmallTertiary' />
    </View>
  );
};

interface GraphCardData {
  value: string | number;
  label: string;
  subValue?: string | number;
  color?: string;
}

interface GraphCardPropsList {
  cardData: GraphCardData[];
  numColumns?: number;
}

const GraphCard: React.FC<GraphCardPropsList> = ({ cardData, numColumns = 3 }) => {
  const renderItem: ListRenderItem<GraphCardData> = ({ item }) => (
    <SingleGraphCard
      value={item.value}
      label={item.label}
      subValue={item.subValue}
      color={item.color ?? '#FFFFFF'}
    />
  );

  return (
    <FlatList
      data={cardData}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-evenly',
    marginBottom: 16,
    gap: 16
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    gap: 24,
    // width: 116,
  },
});

export default GraphCard;
