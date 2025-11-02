import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {FeedbackData} from '../types';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [overallRating, setOverallRating] = useState(0);
  const [overallReview, setOverallReview] = useState('');
  const [vendorRating, setVendorRating] = useState(0);
  const [vendorReview, setVendorReview] = useState('');

  const StarRating = ({
    rating,
    onRatingPress,
  }: {
    rating: number;
    onRatingPress: (rating: number) => void;
  }) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingPress(star)}
          style={styles.star}>
          <Text style={[styles.starText, star <= rating && styles.starFilled]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmit = () => {
    onSubmit({
      overallRating,
      overallReview,
      vendorRating,
      vendorReview,
    });

    // Reset form
    setOverallRating(0);
    setOverallReview('');
    setVendorRating(0);
    setVendorReview('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Give us your feedback</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.skipButton}>Skip</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>
              Please share your feedback about your solar installation and the
              vendor.
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overall experience</Text>
              <Text style={styles.sectionSubtitle}>
                (Tap stars to rate your experience)
              </Text>
              <StarRating
                rating={overallRating}
                onRatingPress={setOverallRating}
              />
              <Text style={styles.inputLabel}>Write a review (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter review"
                value={overallReview}
                onChangeText={setOverallReview}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Feedback about vendor</Text>
              <Text style={styles.sectionSubtitle}>
                (Tap stars to rate your experience)
              </Text>
              <StarRating
                rating={vendorRating}
                onRatingPress={setVendorRating}
              />
              <Text style={styles.inputLabel}>Write a review (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter review"
                value={vendorReview}
                onChangeText={setVendorReview}
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  skipButton: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  star: {
    marginRight: 8,
  },
  starText: {
    fontSize: 28,
    color: '#ddd',
  },
  starFilled: {
    color: '#FFD700',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#2E3A59',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeedbackModal;