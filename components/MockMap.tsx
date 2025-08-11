import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Zap } from 'lucide-react-native';

interface MockMapProps {
  showRoute?: boolean;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    type: 'pickup' | 'destination' | 'driver';
  }>;
}

export default function MockMap({ showRoute = false, markers = [] }: MockMapProps) {
  const defaultMarkers = markers.length > 0 ? markers : [
    { id: '1', lat: 12.9716, lng: 77.5946, title: 'Pickup', type: 'pickup' as const },
    { id: '2', lat: 12.9352, lng: 77.6245, title: 'Destination', type: 'destination' as const },
    { id: '3', lat: 12.9500, lng: 77.6000, title: 'Driver nearby', type: 'driver' as const },
  ];

  return (
    <View style={styles.container}>
      {/* Mock Map Background */}
      <View style={styles.mapBackground}>
        <View style={styles.gridLine} />
        <View style={[styles.gridLine, styles.gridLineVertical]} />
        
        {/* Mock Markers */}
        {defaultMarkers.map((marker) => (
          <View
            key={marker.id}
            style={[
              styles.marker,
              {
                left: `${(marker.lng - 77.5946) * 1000 + 50}%`,
                top: `${(12.9716 - marker.lat) * 1000 + 30}%`,
              },
            ]}
          >
            {marker.type === 'pickup' && (
              <View style={styles.pickupMarker}>
                <View style={styles.pickupDot} />
              </View>
            )}
            {marker.type === 'destination' && (
              <MapPin size={20} color="#EF4444" />
            )}
            {marker.type === 'driver' && (
              <View style={styles.driverMarker}>
                <Navigation size={16} color="white" />
              </View>
            )}
          </View>
        ))}

        {/* Mock Route Line */}
        {showRoute && (
          <View style={styles.routePath}>
            <View style={styles.routeSegment} />
            <View style={[styles.routeSegment, styles.routeSegment2]} />
          </View>
        )}
      </View>

      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Zap size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Location Info */}
      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>Bangalore, Karnataka</Text>
        <Text style={styles.locationSubtext}>Tap to select location</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#E5F3FF',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    top: '50%',
  },
  gridLineVertical: {
    width: 1,
    height: '100%',
    left: '50%',
    top: 0,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupMarker: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  driverMarker: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routePath: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    right: '20%',
    height: 40,
  },
  routeSegment: {
    position: 'absolute',
    width: '60%',
    height: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    top: 10,
  },
  routeSegment2: {
    width: '40%',
    left: '40%',
    top: 25,
    backgroundColor: '#8B5CF6',
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  controlButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    fontSize: 16,
  },
  locationInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  locationSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
});