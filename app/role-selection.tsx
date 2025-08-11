import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZES = {
  screenWidth: SCREEN_WIDTH,
  cardMaxWidth: 760,
  horizontalPadding: 24,
  avatarSize: 72,
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
};

function BrandHeader() {
  return (
    <View style={bhStyles.container}>
      <View style={bhStyles.logoBox}>
        <Text style={bhStyles.logoLetter}>R</Text>
      </View>
      <Text style={bhStyles.title}>RideSync</Text>
    </View>
  );
}

const bhStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sectionSpacing,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  logoLetter: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
});

function AvatarIcon({ bgColor, children }) {
  return (
    <View
      style={[
        avStyles.wrapper,
        { width: SIZES.avatarSize, height: SIZES.avatarSize, borderRadius: SIZES.avatarSize / 2, backgroundColor: bgColor },
      ]}
    >
      {children}
    </View>
  );
}

const avStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
});

function FloatingCard({ avatarBg, icon, title, description, features, onPress }) {
  const cardWidth = Math.min(SIZES.cardMaxWidth, Math.round(SIZES.screenWidth * 0.88));

  return (
    <View style={[fcStyles.outer, { width: cardWidth }]}>
      <View style={fcStyles.avatarAbsolute}>
        <AvatarIcon bgColor={avatarBg}>{icon}</AvatarIcon>
      </View>

      <TouchableOpacity onPress={onPress} activeOpacity={0.92}>
        <LinearGradient
          colors={['#ffffff', '#f9fafe']}
          style={fcStyles.card}
        >
          <Text style={fcStyles.title}>{title}</Text>
          <Text style={fcStyles.desc}>{description}</Text>

          <View style={fcStyles.features}>
            {features.map((f, i) => (
              <View style={fcStyles.featureRow} key={i}>
                <View style={fcStyles.bullet} />
                <Text style={fcStyles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          <View style={fcStyles.cta}>
            <Text style={fcStyles.ctaText}>Continue as {title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const fcStyles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatarAbsolute: {
    position: 'absolute',
    top: -SIZES.avatarSize / 2,
    left: '50%',
    transform: [{ translateX: -SIZES.avatarSize / 2 }],
    zIndex: 4,
  },
  card: {
    borderRadius: 18,
    paddingTop: SIZES.avatarSize / 2 + 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  features: {
    width: '100%',
    paddingHorizontal: 6,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 6,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.bullet,
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flexShrink: 1,
  },
  cta: {
    marginTop: 14,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  ctaText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});

export default function RoleSelectionScreen({ navigation, onSelectRole }) {
  function handleSelect(role) {
    if (typeof onSelectRole === 'function') {
      onSelectRole(role);
      return;
    }
    if (navigation?.replace) {
      navigation.replace('MainTabs', { initialRole: role });
      return;
    }
    Alert.alert('Role selected', `You selected: ${role}`);
   
  }

  return (
    <LinearGradient
      colors={['#E0F2FE', '#EDE9FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <BrandHeader />
        <Text style={styles.title}>Choose Your Role</Text>

        <FloatingCard
          avatarBg={COLORS.driver}
          icon={<MaterialCommunityIcons name="steering" size={36} color="#FFFFFF" />}
          title="Driver"
          description="Offer rides, set your schedule, and earn money."
          features={[
            'Set your route & schedule',
            'Get matched with passengers',
            'Earn from every trip',
          ]}
          onPress={() => handleSelect('driver')}
        />

        <FloatingCard
          avatarBg={COLORS.passenger}
          icon={<Ionicons name="people" size={36} color="#FFFFFF" />}
          title="Passenger"
          description="Find rides and travel safely with verified drivers."
          features={[
            'Request rides anywhere',
            'AI-powered matching',
            'Safe & affordable travel',
          ]}
          onPress={() => handleSelect('passenger')}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.horizontalPadding,
    paddingTop: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
