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

const { width, height } = Dimensions.get('window');

// Match role selection background (solid, no gradients)
const BACKGROUND_COLOR = '#2563EB'; // Replace with your role selection solid color
const LOGO_BG = 'rgba(255,255,255,0.12)';
const ICON_COLOR = '#FFFFFF';

export default function SplashScreen() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const pulseScale = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(18)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0,
          duration: 380,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.12,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1.0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = { transform: [{ scale: logoScale }] };
  const pulseAnimatedStyle = {
    transform: [
      {
        scale: pulseScale.interpolate({
          inputRange: [0, 1.12],
          outputRange: [0.6, 2.0],
        }),
      },
    ],
    opacity: pulseScale.interpolate({
      inputRange: [0, 0.6, 1.12],
      outputRange: [0.14, 0.08, 0],
    }),
  };
  const titleAnimatedStyle = {
    opacity: titleOpacity,
    transform: [{ translateY: titleY }],
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}>
      <View style={styles.center}>
        {/* pulse behind logo */}
        <Animated.View style={[styles.pulse, pulseAnimatedStyle]} />

        <Animated.View
          style={[styles.logoContainer, logoAnimatedStyle]}
          accessibilityRole="image"
          accessible
        >
          <Car size={54} color={ICON_COLOR} strokeWidth={2} />
        </Animated.View>

        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          RideSync
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, titleAnimatedStyle]}>
          AI-Powered Ride Matching
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}

const LOGO_SIZE = 96;
const PULSE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: PULSE_SIZE,
    height: PULSE_SIZE,
    borderRadius: PULSE_SIZE / 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.12,
  },
  logoContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LOGO_BG,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
  },
});
