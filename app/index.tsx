import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Car } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const COLORS = {
  accent: '#0EA5A4',
  textLight: '#FFFFFF',
  logoOverlay: 'rgba(255,255,255,0.15)',
};

export default function SplashScreen() {
  const router = useRouter();

  const containerY = useRef(new Animated.Value(height)).current;
  const logoScale = useRef(new Animated.Value(0.2)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Slow slide up animation
      Animated.timing(containerY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      // Enhanced logo and text animations
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1.2,
          friction: 4,
          tension: 20,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1200,
          easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#E0F2FE', '#EDE9FE']}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.content,
          {
            transform: [{ translateY: containerY }],
          }
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoScale },
                { rotate: spin }
              ],
            }
          ]}
          accessibilityRole="image"
          accessible
        >
          <Car size={72} color={COLORS.accent} strokeWidth={2} />
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <Text style={styles.title}>RideSync</Text>
          <Text style={styles.subtitle}>AI-Powered Ride Matching</Text>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    letterSpacing: 0.5,
  },
});
