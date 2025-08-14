import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Star, Zap, Navigation, Shield } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SIZES = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  cardMaxWidth: 760,
  horizontalPadding: 16,
  sectionSpacing: 16,
  safeAreaTop: Platform.OS === 'ios' ? 44 : 24,
};

const COLORS = {
  accent: '#3B82F6',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  muted: '#9CA3AF',
  cardBorder: 'rgba(230, 238, 248, 0.8)',
  glass: 'rgba(255, 255, 255, 0.95)',
  shadow: 'rgba(12, 17, 29, 0.08)',
  gradient: ['#E0F2FE', '#EDE9FE'],
};

// Mock data
const mockUser = {
  name: 'John Doe',
  role: 'passenger',
  rating: 4.8,
  totalTrips: 42,
};

const mockMatches = [
  {
    id: '1',
    driverName: 'Sarah Wilson',
    rating: 4.9,
    confidence: 96,
    eta: '5 min',
    distance: '0.8 km',
    price: '₹45',
    carModel: 'Honda City',
  },
  {
    id: '2',
    driverName: 'Mike Johnson',
    rating: 4.7,
    confidence: 89,
    eta: '8 min',
    distance: '1.2 km',
    price: '₹52',
    carModel: 'Toyota Camry',
  },
];

export default function HomeScreen() {
  const [locationSharing, setLocationSharing] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient 
        colors={COLORS.gradient}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar style="dark" />
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.profileSection}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>{mockUser.name}</Text>
            </View>
            <View style={styles.statsContainer}>
              <LinearGradient
                colors={['#ffffff', '#f8f9ff']}
                style={styles.statCard}
              >
                <Star size={16} color={COLORS.accent} />
                <View style={styles.statTextContainer}>
                  <Text style={styles.statValue}>{mockUser.rating}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
              </LinearGradient>
              <LinearGradient
                colors={['#ffffff', '#f8f9ff']}
                style={styles.statCard}
              >
                <Navigation size={16} color={COLORS.accent} />
                <View style={styles.statTextContainer}>
                  <Text style={styles.statValue}>{mockUser.totalTrips}</Text>
                  <Text style={styles.statLabel}>Trips</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.quickActions}>
            <LinearGradient
              colors={['#ffffff', '#f8f9ff']}
              style={styles.menuItem}
            >
              <TouchableOpacity
                onPress={() => router.push('/search')}
                activeOpacity={0.9}
                style={styles.menuTouchable}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIcon}>
                    <MapPin size={20} color={COLORS.accent} />
                  </View>
                  <Text style={styles.menuLabel}>
                    {mockUser.role === 'passenger' ? 'Book Ride' : 'Offer Ride'}
                  </Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={['#ffffff', '#f8f9ff']}
              style={styles.menuItem}
            >
              <TouchableOpacity 
                style={styles.menuTouchable}
                activeOpacity={0.9}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIcon}>
                    <Clock size={20} color={COLORS.accent} />
                  </View>
                  <Text style={styles.menuLabel}>Schedule</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {mockUser.role === 'passenger' ? 'Available Drivers' : 'Ride Requests'}
              </Text>
              <LinearGradient
                colors={['#ffffff', '#f8f9ff']}
                style={styles.aiIndicator}
              >
                <Zap size={16} color={COLORS.accent} />
                <Text style={styles.aiText}>AI Matched</Text>
              </LinearGradient>
            </View>

            {mockMatches.map((match) => (
              <LinearGradient
                key={match.id}
                colors={['#ffffff', '#f8f9ff', '#f3f6fe']}
                style={styles.matchCard}
              >
                <View style={styles.matchHeader}>
                  <View>
                    <Text style={styles.matchName}>{match.driverName}</Text>
                    <View style={styles.matchDetails}>
                      <Star size={14} color={COLORS.accent} />
                      <Text style={styles.matchRating}>{match.rating}</Text>
                      <Text style={styles.matchSeparator}>•</Text>
                      <Text style={styles.matchCar}>{match.carModel}</Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={['#ffffff', '#f8f9ff']}
                    style={styles.confidenceContainer}
                  >
                    <Text style={styles.confidenceText}>{match.confidence}%</Text>
                    <Text style={styles.confidenceLabel}>Match</Text>
                  </LinearGradient>
                </View>

                <View style={styles.matchInfo}>
                  <View style={styles.infoItem}>
                    <Clock size={16} color={COLORS.muted} />
                    <Text style={styles.infoText}>{match.eta}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <MapPin size={16} color={COLORS.muted} />
                    <Text style={styles.infoText}>{match.distance}</Text>
                  </View>
                  
                  <LinearGradient
                    colors={['#ffffff', '#f8f9ff']}
                    style={styles.priceContainer}
                  >
                    <Text style={styles.priceText}>{match.price}</Text>
                  </LinearGradient>
                </View>

                <TouchableOpacity 
                  style={styles.requestButton}
                  activeOpacity={0.9}
                >
                  <Text style={styles.requestButtonText}>Request Ride</Text>
                </TouchableOpacity>
              </LinearGradient>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <LinearGradient
              colors={['#ffffff', '#f8f9ff']}
              style={styles.activityCard}
            >
              <TouchableOpacity 
                style={styles.activityTouchable}
                activeOpacity={0.9}
              >
                <View style={styles.activityIcon}>
                  <MapPin size={20} color={COLORS.accent} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Trip to Airport completed</Text>
                  <Text style={styles.activitySubtitle}>Yesterday, 2:30 PM • ₹180</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gradient[0],
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.sectionSpacing * 2,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SIZES.safeAreaTop,
    paddingHorizontal: SIZES.horizontalPadding,
    paddingBottom: SIZES.sectionSpacing,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  statTextContainer: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  quickActions: {
    paddingHorizontal: SIZES.horizontalPadding,
    paddingVertical: SIZES.sectionSpacing,
    gap: 10,
  },
  menuItem: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  menuTouchable: {
    padding: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: SIZES.horizontalPadding,
    marginBottom: SIZES.sectionSpacing,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  aiText: {
    fontSize: 12,
    color: COLORS.accent,
    marginLeft: 4,
    fontWeight: '600',
  },
  matchCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  matchDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  matchRating: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  matchSeparator: {
    fontSize: 14,
    color: COLORS.muted,
    marginHorizontal: 8,
  },
  matchCar: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  confidenceContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  confidenceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  confidenceLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  requestButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  activityCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  activityTouchable: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    backgroundColor: COLORS.glass,
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  activitySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
