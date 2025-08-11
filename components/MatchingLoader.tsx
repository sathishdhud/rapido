import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Zap, Brain, MapPin } from 'lucide-react-native';

interface MatchingLoaderProps {
  onComplete: () => void;
}

export default function MatchingLoader({ onComplete }: MatchingLoaderProps) {
  const [step, setStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  const steps = [
    { icon: MapPin, text: 'Analyzing locations...', color: '#10B981' },
    { icon: Brain, text: 'AI processing matches...', color: '#3B82F6' },
    { icon: Zap, text: 'Finding best drivers...', color: '#8B5CF6' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const currentStep = steps[step];
  const IconComponent = currentStep.icon;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={[styles.iconContainer, { backgroundColor: currentStep.color }]}>
          <IconComponent size={32} color="white" />
        </View>
        <Text style={styles.stepText}>{currentStep.text}</Text>
        
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= step && styles.progressDotActive,
                { backgroundColor: index <= step ? currentStep.color : '#E5E7EB' },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    borderRadius: 30,
    padding: 20,
    marginBottom: 24,
  },
  stepText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  progressDotActive: {
    width: 24,
  },
});