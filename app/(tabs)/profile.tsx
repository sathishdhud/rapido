import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Star, MapPin, Settings, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZES = {
  screenWidth: SCREEN_WIDTH,
  cardMaxWidth: 760,
  horizontalPadding: 24,
  avatarSize: 80,
  sectionSpacing: 20,
};

const COLORS = {
  primary: '#2563EB',
  secondary: '#7C3AED',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  muted: '#94A3B8',
  cardBorder: '#E6EEF8',
  glass: 'rgba(255,255,255,0.95)',
  shadow: 'rgba(12, 17, 29, 0.08)',
};

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
    <>
      <StatusBar style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient 
          colors={[COLORS.primary, COLORS.secondary]} 
          style={styles.profileHeader}
        >
          <SafeAreaView style={styles.headerContent}>
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
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.statsContainer}>
          {mockStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <View style={styles.statIcon}>
                  <IconComponent size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.menuItem} 
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIcon}>
                    <IconComponent size={20} color={COLORS.textSecondary} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <View style={styles.menuRight}>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
                      thumbColor={COLORS.glass}
                    />
                  ) : (
                    <ChevronRight size={20} color={COLORS.muted} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.logoutContainer}
          activeOpacity={0.8}
        >
          <View style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    paddingHorizontal: SIZES.horizontalPadding,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
    fontWeight: '800',
    color: COLORS.glass,
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
    paddingVertical: 8,
    borderRadius: 16,
  },
  roleText: {
    color: COLORS.glass,
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.horizontalPadding,
    paddingVertical: SIZES.sectionSpacing,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 3,
  },
  statIcon: {
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: SIZES.horizontalPadding,
    marginBottom: SIZES.sectionSpacing,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 2,
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
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  menuRight: {
    marginLeft: 12,
  },
  logoutContainer: {
    paddingHorizontal: SIZES.horizontalPadding,
    marginBottom: SIZES.sectionSpacing,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '700',
  },
  bottomPadding: {
    height: 100,
  },
});