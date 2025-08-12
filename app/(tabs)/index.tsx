import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Star, Zap, Navigation, Link } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SIZES = {
  screenWidth: Dimensions.get('window').width,
  horizontalPadding: 24,
  sectionSpacing: 20,
};

const COLORS = {
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  muted: '#94A3B8',
  accent: '#0EA5A4',
  glass: 'rgba(255,255,255,0.95)',
  shadow: 'rgba(12, 17, 29, 0.08)',
  cardBorder: '#E6EEF8',
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
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#E0F2FE', '#EDE9FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>{mockUser.name}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star size={16} color={COLORS.accent} />
                <Text style={styles.statText}>{mockUser.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <Navigation size={16} color={COLORS.accent} />
                <Text style={styles.statText}>{mockUser.totalTrips}</Text>
              </View>
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/search')}
            >
              <LinearGradient 
                colors={['#0EA5A4', '#0C8281']} 
                style={styles.actionGradient}
              >
                <MapPin size={24} color="white" />
                <Text style={styles.actionText}>
                  {mockUser.role === 'passenger' ? 'Book Ride' : 'Offer Ride'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient 
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
                style={[styles.actionGradient, {
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.3)',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }]}
              >
                <Clock size={24} color={COLORS.accent} />
                <Text style={[styles.actionText, {color: COLORS.textPrimary}]}>Schedule</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {mockUser.role === 'passenger' ? 'Available Drivers' : 'Ride Requests'}
              </Text>
              <View style={styles.aiIndicator}>
                <Zap size={16} color={COLORS.accent} />
                <Text style={styles.aiText}>AI Matched</Text>
              </View>
            </View>

            {mockMatches.map((match) => (
              <View key={match.id} style={styles.matchCard}>
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
                  <View style={styles.confidenceContainer}>
                    <Text style={styles.confidenceText}>{match.confidence}%</Text>
                    <Text style={styles.confidenceLabel}>Match</Text>
                  </View>
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
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{match.price}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.requestButton}>
                  <Text style={styles.requestButtonText}>Request Ride</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <MapPin size={20} color={COLORS.accent} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Trip to Airport completed</Text>
                <Text style={styles.activitySubtitle}>Yesterday, 2:30 PM • ₹180</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: SIZES.horizontalPadding,
    paddingBottom: SIZES.sectionSpacing,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  statsContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.glass,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statText: {
    color: COLORS.textPrimary,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.horizontalPadding,
    paddingVertical: SIZES.sectionSpacing,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
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
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.glass,
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
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchName: {
    fontSize: 18,
    fontWeight: '700',
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
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  confidenceText: {
    fontSize: 20,
    fontWeight: '700',
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
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
  },
  requestButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  requestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: COLORS.glass,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  activityIcon: {
    backgroundColor: 'white',
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
