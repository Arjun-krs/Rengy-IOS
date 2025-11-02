import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the props interface for type-checking
interface RequestOverviewCardProps {
  id: string;
  tag: string;
  dateSubmitted: string;
  projectType: string;
  location: string;
}

// A helper component just for the info rows
const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.valeuText}>{value}</Text>
  </View>
);

const RequestOverviewCard: React.FC<RequestOverviewCardProps> = ({
  id,
  tag,
  dateSubmitted,
  projectType,
  location,
  service,
  next,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Row: ID and Tag */}
      <View style={styles.topRow}>
        <Text style={styles.idText}>
          ID: <Text style={styles.idValue}>#{id}</Text>
        </Text>
        {tag && (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
      </View>

      {/* Info Rows */}
      <InfoRow label="Date submitted" value={dateSubmitted} />
      {projectType && <InfoRow label="Project type" value={projectType} />}
      {service && <InfoRow label="Service Type" value={service} />}
      {location && <InfoRow label="Location" value={location} />}
      {next && <InfoRow label="Next Visit" value={next} />}
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Assuming a white background
    borderRadius: 16,
    padding: 20,
    margin: 0, // Add some margin so it's not at the edge
    borderWidth: 1.5,
    borderColor: '#FFFFFF', // The dark border from the image
    shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20, // Space between cards
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // Space between top row and info rows
  },
  idText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
  },
  idValue: {
    fontWeight: 'bold',
    fontFamily: 'GeneralSans-Medium',
    color: '#000',
  },
  tagContainer: {
    backgroundColor: '#FEEFDD', // Light orange/peach color
    borderRadius: 20, // Pill shape
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  tagText: {
    color: '#333',
    fontSize: 13,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8, // Space for each row
  },
  labelText: {
    color: '#666666', // Gray color for labels
    fontFamily: 'GeneralSans-Medium',
    fontSize: 15,
  },
  valueText: {
    color: '#000000', // Black color for values
    fontSize: 15,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '500', // Slightly bolder
  },
});

export default RequestOverviewCard;
