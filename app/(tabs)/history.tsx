import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Star, Filter, Calendar, Navigation } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock trip data
const mockTrips = [
  {
    id: '1',
    type: 'passenger',
    driverName: 'Sarah Wilson',
    from: 'Home',
    to: 'Office',
    date: '2025-01-15',
    time: '09:00 AM',
    status: 'completed',
    price: '₹65',
    rating: 5,
    confidence: 96,
  },
  {
    id: '2',
    type: 'passenger',
    driverName: 'Mike Johnson',
    from: 'Mall',
    to: 'Airport',
    date: '2025-01-14',
    time: '05:30 PM',
    status: 'completed',
    price: '₹180',
    rating: 4,
    confidence: 89,
  },
  {
    id: '3',
    type: 'driver',
    passengerName: 'Emma Davis', 
    from: 'Downtown',
    to: 'University',
    date: '2025-01-13',
    time: '08:15 AM',
    status: 'completed',
    price: '₹40',
    rating: 5,
    confidence: 94,
  },
  {
    id: '4',
    type: 'passenger',
    driverName: 'Alex Chen',
    from: 'Home',
    to: 'Hospital',
    date: '2025-01-16',
    time: '02:00 PM',
    status: 'upcoming',
    price: '₹85',
    confidence: 91,
  },
];

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTrips = mockTrips.filter(trip => {
    if (selectedFilter === 'all') return true;
    return trip.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'upcoming':
        return '#3B82F6';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'upcoming':
        return 'Upcoming';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <LinearGradient
      colors={['#E0F2FE', '#EDE9FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip History</Text>
        <Text style={styles.headerSubtitle}>Your ride journey</Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {[
            { key: 'all', label: 'All' },
            { key: 'completed', label: 'Completed' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'cancelled', label: 'Cancelled' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trip List */}
      <ScrollView style={styles.tripList} showsVerticalScrollIndicator={false}>
        {filteredTrips.map((trip) => (
          <LinearGradient
            key={trip.id}
            colors={['#ffffff', '#f8f9ff', '#f3f6fe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.tripCard]}
          >
            {/* Trip Header */}
            <View style={styles.tripHeader}>
              <View style={styles.tripTypeContainer}>
                <Text style={styles.tripType}>
                  {trip.type === 'passenger' ? 'Passenger' : 'Driver'}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(trip.status)}</Text>
                </View>
              </View>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceText}>{trip.confidence}%</Text>
                <Text style={styles.confidenceLabel}>AI Match</Text>
              </View>
            </View>

            {/* Route */}
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <View style={styles.pickupDot} />
                <Text style={styles.routeText}>{trip.from}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <MapPin size={12} color="#EF4444" />
                <Text style={styles.routeText}>{trip.to}</Text>
              </View>
            </View>

            {/* Trip Details */}
            <View style={styles.tripDetails}>
              <View style={styles.detailItem}>
                <Calendar size={14} color="#6B7280" />
                <Text style={styles.detailText}>{trip.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={14} color="#6B7280" />
                <Text style={styles.detailText}>{trip.time}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{trip.price}</Text>
              </View>
            </View>

            {/* Partner & Rating */}
            <View style={styles.partnerContainer}>
              <Text style={styles.partnerText}>
                {trip.type === 'passenger' ? 'Driver: ' : 'Passenger: '}
                <Text style={styles.partnerName}>
                  {trip.type === 'passenger' ? trip.driverName : trip.passengerName}
                </Text>
              </Text>
              {trip.rating && (
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      color={star <= trip.rating ? '#FCD34D' : '#E5E7EB'}
                    />
                  ))}
                </View>
              )}
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filters: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  tripList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tripCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'rgba(230, 238, 248, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#0C111D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  confidenceLabel: {
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  routeContainer: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  routeText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  routeLine: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 2,
    marginVertical: 4,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceContainer: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  partnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partnerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  partnerName: {
    fontWeight: '600',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
});