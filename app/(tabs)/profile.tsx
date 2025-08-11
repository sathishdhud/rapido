import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Star, MapPin, Settings, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3 } from 'lucide-react-native';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+91 9876543210',
  role: 'passenger',
  rating: 4.8,
  totalTrips: 42,
  joinDate: 'Jan 2024',
  verified: true,
};

const mockStats = [
  { label: 'Total Trips', value: '42', icon: MapPin },
  { label: 'Rating', value: '4.8', icon: Star },
  { label: 'Saved', value: '₹2,340', icon: CreditCard },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const menuItems = [
    { icon: Edit3, label: 'Edit Profile', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {}, hasSwitch: true, value: notifications, onToggle: setNotifications },
    { icon: Shield, label: 'Privacy & Safety', action: () => {} },
    { icon: MapPin, label: 'Location Sharing', action: () => {}, hasSwitch: true, value: locationSharing, onToggle: setLocationSharing },
    { icon: CreditCard, label: 'Payment Methods', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={40} color="white" />
          </View>
          {mockUser.verified && (
            <View style={styles.verifiedBadge}>
              <Shield size={12} color="white" />
            </View>
          )}
        </View>
        
        <Text style={styles.userName}>{mockUser.name}</Text>
        <Text style={styles.userEmail}>{mockUser.email}</Text>
        <Text style={styles.memberSince}>Member since {mockUser.joinDate}</Text>

        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>
            {mockUser.role === 'passenger' ? 'Passenger' : 'Driver'}
          </Text>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {mockStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <IconComponent size={20} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <IconComponent size={20} color="#6B7280" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuRight}>
                {item.hasSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                    thumbColor="white"
                  />
                ) : (
                  <ChevronRight size={20} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutContainer}>
        <View style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  profileHeader: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
  },
  roleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    backgroundColor: '#EBF4FF',
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  menuRight: {
    marginLeft: 12,
  },
  logoutContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});