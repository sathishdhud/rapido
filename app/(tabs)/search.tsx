import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Calendar, Clock, Users, Navigation, Filter } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZES = {
  screenWidth: SCREEN_WIDTH,
  cardMaxWidth: 760,
  horizontalPadding: 24,
  sectionSpacing: 20,
};

const COLORS = {
  cardBorder: '#E6EEF8',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  muted: '#94A3B8',
  bullet: '#DDE9FB',
  driver: '#2563EB',
  passenger: '#7C3AED',
  glass: 'rgba(255,255,255,0.95)',
  shadow: 'rgba(12, 17, 29, 0.08)',
  accent: '#0EA5A4',
  background: '#F9FAFB',
};

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
    console.log('Searching for rides...', formData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient 
          colors={[COLORS.driver, COLORS.passenger]} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>
            {tripType === 'passenger' ? 'Find a Ride' : 'Offer a Ride'}
          </Text>
          <Text style={styles.headerSubtitle}>
            AI will find the perfect match for you
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, tripType === 'passenger' && styles.toggleActive]}
              onPress={() => setTripType('passenger')}
            >
              <Users size={20} color={tripType === 'passenger' ? COLORS.glass : COLORS.muted} />
              <Text style={[styles.toggleText, tripType === 'passenger' && styles.toggleTextActive]}>
                Passenger
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, tripType === 'driver' && styles.toggleActive]}
              onPress={() => setTripType('driver')}
            >
              <Navigation size={20} color={tripType === 'driver' ? COLORS.glass : COLORS.muted} />
              <Text style={[styles.toggleText, tripType === 'driver' && styles.toggleTextActive]}>
                Driver
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <View style={styles.inputIcon}>
                <View style={styles.pickupDot} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Pickup location"
                value={formData.pickup}
                onChangeText={(text) => setFormData({ ...formData, pickup: text })}
                placeholderTextColor={COLORS.muted}
              />
            </View>

            <View style={styles.routeLine} />

            <View style={styles.inputGroup}>
              <View style={styles.inputIcon}>
                <MapPin size={16} color={COLORS.passenger} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Destination"
                value={formData.destination}
                onChangeText={(text) => setFormData({ ...formData, destination: text })}
                placeholderTextColor={COLORS.muted}
              />
            </View>
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeInput}>
              <Calendar size={16} color={COLORS.muted} />
              <TextInput
                style={styles.dateTimeText}
                placeholder="Date"
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholderTextColor={COLORS.muted}
              />
            </View>
            <View style={styles.dateTimeInput}>
              <Clock size={16} color={COLORS.muted} />
              <TextInput
                style={styles.dateTimeText}
                placeholder="Time"
                value={formData.time}
                onChangeText={(text) => setFormData({ ...formData, time: text })}
                placeholderTextColor={COLORS.muted}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Number of seats</Text>
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

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <LinearGradient 
              colors={[COLORS.driver, COLORS.passenger]} 
              style={styles.searchGradient}
            >
              <Text style={styles.searchButtonText}>
                {tripType === 'passenger' ? 'Find Drivers' : 'Post Your Ride'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Searches</Text>
              <TouchableOpacity>
                <Filter size={20} color={COLORS.muted} />
              </TouchableOpacity>
            </View>
            
            {[
              { from: 'Home', to: 'Office', time: 'Today, 9:00 AM' },
              { from: 'Mall', to: 'Airport', time: 'Yesterday, 5:30 PM' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <View style={styles.recentRoute}>
                  <Text style={styles.recentText}>{item.from}</Text>
                  <View style={styles.recentArrow}>
                    <View style={styles.arrowLine} />
                    <Navigation size={12} color={COLORS.muted} />
                  </View>
                  <Text style={styles.recentText}>{item.to}</Text>
                </View>
                <Text style={styles.recentTime}>{item.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: SIZES.horizontalPadding,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.glass,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    paddingHorizontal: SIZES.horizontalPadding,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: SIZES.sectionSpacing,
    backgroundColor: '#F3F4F6',
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
    backgroundColor: COLORS.driver,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.muted,
  },
  toggleTextActive: {
    color: COLORS.glass,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
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
    backgroundColor: COLORS.driver,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 8,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: COLORS.bullet,
    marginLeft: 11,
    marginVertical: 8,
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
    backgroundColor: COLORS.glass,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  dateTimeText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 12,
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  seatButtonActive: {
    backgroundColor: COLORS.driver,
    borderColor: COLORS.driver,
  },
  seatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.muted,
  },
  seatButtonTextActive: {
    color: COLORS.glass,
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
    color: COLORS.glass,
    fontSize: 18,
    fontWeight: '800',
  },
  recentSection: {
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
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  recentItem: {
    backgroundColor: COLORS.glass,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  recentRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  recentArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  arrowLine: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.bullet,
    marginRight: 4,
  },
  recentTime: {
    fontSize: 12,
    color: COLORS.muted,
  },
});