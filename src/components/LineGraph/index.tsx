import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { GraphElevation } from '../../utils/imagesrc';
import { GraphDropdown } from '../../screens/App/Vendor/Home/Components';
import Typo from '../Typo';

const { width } = Dimensions.get('screen');

interface LineGraphProps {
  data: { value: number; label: string; tooltip?: string }[];
  totalEarnings: string;
  comparisonText: string;
  comparisonPercentage: string;
  chartHeight?: number;
}

const LineGraph: React.FC<LineGraphProps> = ({
  data,
  totalEarnings,
  comparisonText,
  comparisonPercentage,
  chartHeight = 200,
}) => {
  return (
    <View style={{ padding: 16 }}>
      <View
        style={[{ paddingTop: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <Typo color='#030204' label='Earnings' variant='headingSmallPrimary' />

        <GraphDropdown
          options={[
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Yearly', value: 'Yearly' },
          ]}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 14, paddingVertical: 20 }}>
        <Typo color='#030204' label={totalEarnings} variant='headingSecondaryPrimary' />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ backgroundColor: '#D2EBE1', paddingVertical: 5, paddingHorizontal: 8, borderRadius: 40, flexDirection: 'row', alignItems: 'center' }}>
            <GraphElevation />
            <Typo color='#148057' label={` - ${comparisonPercentage}`} variant='bodySmallSecondary' />
          </View>
          <Typo color='#67606E' label={` ${comparisonText}`} variant='bodySmallTertiary' />
        </View>
      </View>

      <LineChart
        data={data}
        width={width - 32}
        height={chartHeight}
        spacing={(width - 32) / data?.length}
        adjustToWidth
        color="#71F4C3"
        startFillColor="rgba(113,244,195,0.2)"
        endFillColor="rgba(113,244,195,0)"
        initialSpacing={0}
        yAxisColor="transparent"
        xAxisColor="transparent"
        hideDataPoints
        hideRules
        curved
        hideYAxisText
        xAxisLabelTextStyle={{ color: '#000', fontSize: 12 }}
        renderTooltip={({ value, index, x, y }) => (
          <View style={{ position: 'absolute', top: y - 60, left: x - 40, padding: 6, backgroundColor: '#000', borderRadius: 6, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>₹ {value}</Text>
            {data[index]?.tooltip && (
              <Text style={{ color: '#fff', fontSize: 10 }}>{data[index].tooltip}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default LineGraph;
