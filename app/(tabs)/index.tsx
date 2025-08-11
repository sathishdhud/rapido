import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Star, Zap, Navigation } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data
const mockUser = {
  name: 'John Doe',
  role: 'passenger', // or 'driver'
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
  const [activeTrip, setActiveTrip] = useState(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Star size={16} color="#FCD34D" />
              <Text style={styles.statText}>{mockUser.rating}</Text>
            </View>
            <View style={styles.statItem}>
              <Navigation size={16} color="white" />
              <Text style={styles.statText}>{mockUser.totalTrips}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/search')}
        >
          <LinearGradient colors={['#10B981', '#059669']} style={styles.actionGradient}>
            <MapPin size={24} color="white" />
            <Text style={styles.actionText}>
              {mockUser.role === 'passenger' ? 'Book Ride' : 'Offer Ride'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.actionGradient}>
            <Clock size={24} color="white" />
            <Text style={styles.actionText}>Schedule</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Current Matches */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {mockUser.role === 'passenger' ? 'Available Drivers' : 'Ride Requests'}
          </Text>
          <View style={styles.aiIndicator}>
            <Zap size={16} color="#3B82F6" />
            <Text style={styles.aiText}>AI Matched</Text>
          </View>
        </View>

        {mockMatches.map((match) => (
          <TouchableOpacity key={match.id} style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <View>
                <Text style={styles.matchName}>{match.driverName}</Text>
                <View style={styles.matchDetails}>
                  <Star size={14} color="#FCD34D" />
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
                <Clock size={16} color="#6B7280" />
                <Text style={styles.infoText}>{match.eta}</Text>
              </View>
              <View style={styles.infoItem}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.infoText}>{match.distance}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{match.price}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.requestButton}>
              <Text style={styles.requestButtonText}>Request Ride</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <MapPin size={20} color="#10B981" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Trip to Airport completed</Text>
            <Text style={styles.activitySubtitle}>Yesterday, 2:30 PM • ₹180</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
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
    paddingHorizontal: 24,
    marginBottom: 24,
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
    color: '#1F2937',
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiText: {
    fontSize: 12,
    color: '#3B82F6',
    marginLeft: 4,
    fontWeight: '500',
  },
  matchCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    color: '#1F2937',
  },
  matchDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  matchRating: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
  },
  matchSeparator: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
  matchCar: {
    fontSize: 14,
    color: '#6B7280',
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  confidenceLabel: {
    fontSize: 10,
    color: '#6B7280',
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
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  requestButton: {
    backgroundColor: '#3B82F6',
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activityIcon: {
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
}); 