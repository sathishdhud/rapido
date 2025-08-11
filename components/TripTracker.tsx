import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Clock, Phone, MessageCircle } from 'lucide-react-native';
import MockMap from './MockMap';

interface TripTrackerProps {
  trip: {
    id: string;
    driverName: string;
    carModel: string;
    carNumber: string;
    eta: string;
    status: 'arriving' | 'picked_up' | 'in_transit' | 'completed';
  };
  onComplete: () => void;
}

export default function TripTracker({ trip, onComplete }: TripTrackerProps) {
  const [currentLocation, setCurrentLocation] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    // Mock location updates
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'arriving':
        return 'Driver is arriving';
      case 'picked_up':
        return 'Trip started';
      case 'in_transit':
        return 'On the way';
      case 'completed':
        return 'Trip completed';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'arriving':
        return '#F59E0B';
      case 'picked_up':
        return '#3B82F6';
      case 'in_transit':
        return '#8B5CF6';
      case 'completed':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MockMap
          showRoute={true}
          markers={[
            { id: '1', lat: 12.9716, lng: 77.5946, title: 'Pickup', type: 'pickup' },
            { id: '2', lat: 12.9352, lng: 77.6245, title: 'Destination', type: 'destination' },
            { id: '3', lat: currentLocation.lat, lng: currentLocation.lng, title: 'Driver', type: 'driver' },
          ]}
        />
      </View>

      {/* Trip Info */}
      <View style={styles.tripInfo}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(trip.status) }]} />
          <Text style={styles.statusText}>{getStatusText(trip.status)}</Text>
          <View style={styles.etaContainer}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.etaText}>{trip.eta}</Text>
          </View>
        </View>

        <View style={styles.driverInfo}>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{trip.driverName}</Text>
            <Text style={styles.carInfo}>{trip.carModel} • {trip.carNumber}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {trip.status === 'completed' && (
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.completeButtonText}>Rate Your Ride</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
  },
  tripInfo: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  etaText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  driverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  carInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
  },
  completeButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});