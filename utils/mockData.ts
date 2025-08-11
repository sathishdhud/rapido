// Mock data for the ride matching app

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+91 9876543210',
  role: 'passenger' as 'passenger' | 'driver',
  rating: 4.8,
  totalTrips: 42,
  joinDate: 'Jan 2024',
  verified: true,
};

export const mockDrivers = [
  {
    id: '1',
    name: 'Sarah Wilson',
    rating: 4.9,
    confidence: 96,
    eta: '5 min',
    distance: '0.8 km',
    price: '₹45',
    carModel: 'Honda City',
    carNumber: 'KA 01 AB 1234',
    phone: '+91 9876543211',
    location: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: '2',
    name: 'Mike Johnson',
    rating: 4.7,
    confidence: 89,
    eta: '8 min',
    distance: '1.2 km',
    price: '₹52',
    carModel: 'Toyota Camry',
    carNumber: 'KA 02 CD 5678',
    phone: '+91 9876543212',
    location: { lat: 12.9500, lng: 77.6000 },
  },
  {
    id: '3',
    name: 'Emily Chen',
    rating: 4.8,
    confidence: 94,
    eta: '3 min',
    distance: '0.5 km',
    price: '₹38',
    carModel: 'Maruti Swift',
    carNumber: 'KA 03 EF 9012',
    phone: '+91 9876543213',
    location: { lat: 12.9800, lng: 77.5800 },
  },
];

export const mockTrips = [
  {
    id: '1',
    type: 'passenger' as 'passenger' | 'driver',
    driverName: 'Sarah Wilson',
    passengerName: '',
    from: 'Home',
    to: 'Office',
    date: '2025-01-15',
    time: '09:00 AM',
    status: 'completed' as 'completed' | 'upcoming' | 'cancelled',
    price: '₹65',
    rating: 5,
    confidence: 96,
  },
  {
    id: '2',
    type: 'passenger' as 'passenger' | 'driver',
    driverName: 'Mike Johnson',
    passengerName: '',
    from: 'Mall',
    to: 'Airport',
    date: '2025-01-14',
    time: '05:30 PM',
    status: 'completed' as 'completed' | 'upcoming' | 'cancelled',
    price: '₹180',
    rating: 4,
    confidence: 89,
  },
  {
    id: '3',
    type: 'driver' as 'passenger' | 'driver',
    driverName: '',
    passengerName: 'Emma Davis',
    from: 'Downtown',
    to: 'University',
    date: '2025-01-13',
    time: '08:15 AM',
    status: 'completed' as 'completed' | 'upcoming' | 'cancelled',
    price: '₹40',
    rating: 5,
    confidence: 94,
  },
];

export const mockChats = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: 'I\'ll be there in 5 minutes!',
    time: '2 min ago',
    unread: 2,
    avatar: '👩‍💼',
    status: 'active' as 'active' | 'completed',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the ride!',
    time: '1 hour ago',
    unread: 0,
    avatar: '👨‍💻',
    status: 'completed' as 'active' | 'completed',
    rating: 4.7,
  },
];

export const mockMessages = [
  {
    id: '1',
    text: 'Hi! I\'m on my way to pick you up',
    time: '10:30 AM',
    sender: 'other' as 'me' | 'other',
  },
  {
    id: '2',
    text: 'Great! I\'m waiting at the entrance',
    time: '10:32 AM',
    sender: 'me' as 'me' | 'other',
  },
  {
    id: '3',
    text: 'I\'ll be there in 5 minutes!',
    time: '10:35 AM',
    sender: 'other' as 'me' | 'other',
  },
];

// ML Model simulation
export const calculateMatchConfidence = (
  driverLocation: { lat: number; lng: number },
  passengerLocation: { lat: number; lng: number },
  timePreference: string,
  driverRating: number,
  passengerRating: number
): number => {
  // Mock ML calculation
  const distance = Math.sqrt(
    Math.pow(driverLocation.lat - passengerLocation.lat, 2) +
    Math.pow(driverLocation.lng - passengerLocation.lng, 2)
  );
  
  const distanceScore = Math.max(0, 100 - distance * 1000);
  const ratingScore = (driverRating + passengerRating) * 10;
  const timeScore = Math.random() * 20 + 80; // Mock time compatibility
  
  return Math.min(100, Math.round((distanceScore + ratingScore + timeScore) / 3));
};