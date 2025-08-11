import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Star, X } from 'lucide-react-native';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  driverName: string;
  onSubmit: (rating: number, feedback: string) => void;
}

export default function RatingModal({ visible, onClose, driverName, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(rating, feedback);
    setRating(0);
    setFeedback('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Rate Your Ride</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>How was your ride with {driverName}?</Text>

          {/* Star Rating */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Star
                  size={32}
                  color={star <= rating ? '#FCD34D' : '#E5E7EB'}
                  fill={star <= rating ? '#FCD34D' : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Feedback */}
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackLabel}>Leave a comment (optional)</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Share your experience..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={rating === 0}
          >
            <Text style={[styles.submitText, rating === 0 && styles.submitTextDisabled]}>
              Submit Rating
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  starButton: {
    padding: 4,
  },
  feedbackContainer: {
    marginBottom: 24,
  },
  feedbackLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  submitTextDisabled: {
    color: '#9CA3AF',
  },
});