import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Star, MapPin, Settings, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SIZES = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  cardMaxWidth: 760,
  horizontalPadding: 16,
  avatarSize: 70,
  sectionSpacing: 16,
  safeAreaTop: Platform.OS === 'ios' ? 44 : 24,
};

const COLORS = {
  accent: '#0EA5A4',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  muted: '#94A3B8',
  cardBorder: '#E6EEF8',
  glass: 'rgba(255,255,255,0.98)',
  shadow: 'rgba(12, 17, 29, 0.12)',
  gradient: ['#E0F2FE', '#F0F9FF', '#F8FAFC'],
};

// Mock user data remains the same
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

  const handleLogout = () => {
    router.replace('/auth');
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handlePrivacySafety = () => {
    router.push('/privacy-safety');
  };

  const menuItems = [
    { icon: Edit3, label: 'Edit Profile', action: handleEditProfile },
    { icon: Bell, label: 'Notifications', action: () => {}, hasSwitch: true, value: notifications, onToggle: setNotifications },
    { icon: Shield, label: 'Privacy & Safety', action: handlePrivacySafety },
    { icon: MapPin, label: 'Location Sharing', action: () => {}, hasSwitch: true, value: locationSharing, onToggle: setLocationSharing },
    { icon: CreditCard, label: 'Payment Methods', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient 
        colors={COLORS.gradient}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar style="dark" />
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={32} color={COLORS.accent} />
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
          </View>

          <View style={styles.statsContainer}>
            {mockStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <View key={index} style={styles.statCard}>
                  <IconComponent size={16} color={COLORS.accent} />
                  <View style={styles.statTextContainer}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
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
                  style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]} 
                  onPress={item.action}
                  activeOpacity={0.9}
                >
                  <View style={styles.menuLeft}>
                    <View style={styles.menuIcon}>
                      <IconComponent size={20} color={COLORS.accent} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.menuRight}>
                    {item.hasSwitch ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#E5E7EB', true: COLORS.accent }}
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
            activeOpacity={0.9}
            onPress={handleLogout}
          >
            <View style={styles.logoutButton}>
              <LogOut size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gradient[0],
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.sectionSpacing * 2,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: SIZES.sectionSpacing,
    paddingHorizontal: SIZES.horizontalPadding,
    paddingBottom: SIZES.sectionSpacing,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    marginTop: SIZES.safeAreaTop,
  },
  avatar: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    backgroundColor: COLORS.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#10B981',
    borderRadius: 10,
    padding: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 16,
  },
  roleContainer: {
    backgroundColor: COLORS.glass,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.horizontalPadding,
    paddingVertical: SIZES.sectionSpacing,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lastMenuItem: {
    marginBottom: 0,
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
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  menuRight: {
    marginLeft: 12,
  },
  logoutContainer: {
    paddingHorizontal: SIZES.horizontalPadding,
    marginTop: SIZES.sectionSpacing,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.glass,
    borderRadius: 14,
    padding: 14,
    gap: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  logoutText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});