import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProjectStatus} from '../types';

interface ProgressBarProps {
  statuses: ProjectStatus[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({statuses}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {statuses.map((status, index) => (
          <React.Fragment key={status.id}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.circle,
                  status.completed && styles.completedCircle,
                  status.current && styles.currentCircle,
                ]}>
                {status.completed ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      status.current && styles.currentStepNumber,
                    ]}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  status.completed && styles.completedLabel,
                  status.current && styles.currentLabel,
                ]}>
                {status.name}
              </Text>
            </View>
            {index < statuses.length - 1 && (
              <View
                style={[
                  styles.connector,
                  status.completed && styles.completedConnector,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  completedCircle: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  currentCircle: {
    backgroundColor: '#2E3A59',
    borderColor: '#2E3A59',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepNumber: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 12,
  },
  currentStepNumber: {
    color: 'white',
  },
  stepLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 60,
  },
  completedLabel: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  currentLabel: {
    color: '#2E3A59',
    fontWeight: '600',
  },
  connector: {
    height: 2,
    backgroundColor: '#ddd',
    flex: 0.5,
    marginHorizontal: 4,
  },
  completedConnector: {
    backgroundColor: '#4CAF50',
  },
});

export default ProgressBar;