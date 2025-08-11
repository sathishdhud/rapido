import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Calendar, Clock, Users, Navigation, Filter } from 'lucide-react-native';

export default function SearchScreen() {
  const [tripType, setTripType] = useState<'passenger' | 'driver'>('passenger');
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    seats: '1',
  });

  const handleSearch = () => {
    // Mock search logic
    console.log('Searching for rides...', formData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.header}>
        <Text style={styles.headerTitle}>
          {tripType === 'passenger' ? 'Find a Ride' : 'Offer a Ride'}
        </Text>
        <Text style={styles.headerSubtitle}>
          AI will find the perfect match for you
        </Text>
      </LinearGradient>

      {/* Role Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, tripType === 'passenger' && styles.toggleActive]}
          onPress={() => setTripType('passenger')}
        >
          <Users size={20} color={tripType === 'passenger' ? 'white' : '#6B7280'} />
          <Text style={[styles.toggleText, tripType === 'passenger' && styles.toggleTextActive]}>
            Passenger
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, tripType === 'driver' && styles.toggleActive]}
          onPress={() => setTripType('driver')}
        >
          <Navigation size={20} color={tripType === 'driver' ? 'white' : '#6B7280'} />
          <Text style={[styles.toggleText, tripType === 'driver' && styles.toggleTextActive]}>
            Driver
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trip Form */}
      <View style={styles.formContainer}>
        <View style={styles.locationInputs}>
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <View style={styles.pickupDot} />
            </View>
            <TextInput
              style={styles.locationInput}
              placeholder="Pickup location"
              value={formData.pickup}
              onChangeText={(text) => setFormData({ ...formData, pickup: text })}
            />
          </View>

          <View style={styles.routeLine} />

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <MapPin size={16} color="#EF4444" />
            </View>
            <TextInput
              style={styles.locationInput}
              placeholder="Destination"
              value={formData.destination}
              onChangeText={(text) => setFormData({ ...formData, destination: text })}
            />
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeInput}>
            <Calendar size={16} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
            />
          </View>
          <View style={styles.dateTimeInput}>
            <Clock size={16} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Time"
              value={formData.time}
              onChangeText={(text) => setFormData({ ...formData, time: text })}
            />
          </View>
        </View>

        {/* Seats */}
        <View style={styles.seatsContainer}>
          <Text style={styles.seatsLabel}>Number of seats</Text>
          <View style={styles.seatsSelector}>
            {['1', '2', '3', '4'].map((seat) => (
              <TouchableOpacity
                key={seat}
                style={[
                  styles.seatButton,
                  formData.seats === seat && styles.seatButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, seats: seat })}
              >
                <Text
                  style={[
                    styles.seatButtonText,
                    formData.seats === seat && styles.seatButtonTextActive,
                  ]}
                >
                  {seat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.searchGradient}>
            <Text style={styles.searchButtonText}>
              {tripType === 'passenger' ? 'Find Drivers' : 'Post Your Ride'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          <TouchableOpacity>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        {[
          { from: 'Home', to: 'Office', time: 'Today, 9:00 AM' },
          { from: 'Mall', to: 'Airport', time: 'Yesterday, 5:30 PM' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.recentItem}>
            <View style={styles.recentRoute}>
              <Text style={styles.recentFrom}>{item.from}</Text>
              <View style={styles.recentArrow}>
                <View style={styles.arrowLine} />
                <Navigation size={12} color="#6B7280" />
              </View>
              <Text style={styles.recentTo}>{item.to}</Text>
            </View>
            <Text style={styles.recentTime}>{item.time}</Text>
          </TouchableOpacity>
        ))}
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  toggleContainer: {
    flexDirection: 'row',
    margin: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: 'white',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  locationInputs: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginLeft: 11,
    marginVertical: 8,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateTimeInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  seatsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  seatsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  seatsSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  seatButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  seatButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  seatButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  seatButtonTextActive: {
    color: 'white',
  },
  searchButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  searchGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  recentItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  recentRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentFrom: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  recentArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  arrowLine: {
    width: 20,
    height: 1,
    backgroundColor: '#D1D5DB',
    marginRight: 4,
  },
  recentTo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  recentTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});