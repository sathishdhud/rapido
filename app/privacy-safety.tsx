import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Shield, Bell, ChevronRight, X, CheckCircle, AlertCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SIZES = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  cardMaxWidth: 400,
  horizontalPadding: 16,
  inputHeight: 44,
  keyboardOffset: Platform.OS === 'ios' ? 100 : 20,
  fieldSpacing: 16,
};

const COLORS = {
  cardBorder: '#E6EEF8',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  shadow: 'rgba(12, 17, 29, 0.08)',
  accent: '#0EA5A4',
  error: '#DC2626',
  success: '#16A34A',
};

export default function PrivacySafetyScreen() {
  const router = useRouter();
  const [alert, setAlert] = React.useState({
    visible: false,
    type: '',
    title: '',
    message: '',
  });

  const showAlert = (type, title, message) => {
    setAlert({
      visible: true,
      type,
      title,
      message,
    });
  };

  const hideAlert = () => {
    setAlert({
      visible: false,
      type: '',
      title: '',
      message: '',
    });
  };

  const cardWidth = Math.min(SIZES.cardMaxWidth, Math.round(SIZES.screenWidth * 0.88));

  const privacyOptions = [
    {
      icon: <Lock size={24} color={COLORS.textSecondary} />,
      title: 'Account Privacy',
      description: 'Control who can see your profile and content',
    },
    {
      icon: <Shield size={24} color={COLORS.textSecondary} />,
      title: 'Security Settings',
      description: 'Manage your account security and login options',
    },
    {
      icon: <Bell size={24} color={COLORS.textSecondary} />,
      title: 'Notification Preferences',
      description: 'Customize your notification settings',
    },
  ];

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Privacy & Safety',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#E0F2FE' },
        }}
      />
      <StatusBar style="auto" />
      <LinearGradient colors={['#E0F2FE', '#EDE9FE']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.formWrapper, styles.centerContent]}>
              <LinearGradient
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
                style={[styles.form, { width: cardWidth }]}
              >
                {privacyOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionContainer,
                      index !== privacyOptions.length - 1 && styles.optionBorder
                    ]}
                    onPress={() => showAlert('info', 'Coming Soon', 'This feature will be available soon')}
                  >
                    <View style={styles.optionContent}>
                      {option.icon}
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>{option.title}</Text>
                        <Text style={styles.optionDescription}>{option.description}</Text>
                      </View>
                      <ChevronRight size={20} color={COLORS.textSecondary} />
                    </View>
                  </TouchableOpacity>
                ))}
              </LinearGradient>
            </View>
          </ScrollView>

          <Modal
            visible={alert.visible}
            transparent
            animationType="fade"
            onRequestClose={hideAlert}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.alertContainer, { width: cardWidth }]}>
                <View style={styles.alertHeader}>
                  {alert.type === 'success' && <CheckCircle size={24} color={COLORS.success} />}
                  {alert.type === 'error' && <AlertCircle size={24} color={COLORS.error} />}
                  {alert.type === 'info' && <AlertCircle size={24} color={COLORS.accent} />}
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <TouchableOpacity onPress={hideAlert} style={styles.closeButtonTop}>
                    <X size={20} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <TouchableOpacity style={styles.closeButtonBottom} onPress={hideAlert}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 28,
    justifyContent: 'center',
  },
  formWrapper: {
    paddingHorizontal: SIZES.horizontalPadding,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  optionContainer: {
    paddingVertical: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  closeButtonTop: {
    padding: 4,
    marginLeft: 12,
  },
  alertMessage: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  closeButtonBottom: {
    alignSelf: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
