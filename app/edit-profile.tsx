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
  Image,
  Modal,
  Keyboard,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Camera, Mail, Phone, X, CheckCircle, AlertCircle } from 'lucide-react-native';
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

export default function EditProfileScreen() {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [alert, setAlert] = React.useState({
    visible: false,
    type: '',
    title: '',
    message: '',
  });
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    photo: null,
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  React.useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

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

  const handleSave = () => {
    showAlert('success', 'Success', 'Profile updated successfully!');
    setTimeout(() => {
      hideAlert();
      router.back();
    }, 2000);
  };

  const handleUploadPhoto = () => {
    showAlert('info', 'Coming Soon', 'Photo upload will be available soon');
  };

  const cardWidth = Math.min(SIZES.cardMaxWidth, Math.round(SIZES.screenWidth * 0.88));

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Edit Profile',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#E0F2FE' },
        }}
      />
      <StatusBar style="auto" />
      <LinearGradient colors={['#E0F2FE', '#EDE9FE']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={SIZES.keyboardOffset}
            style={styles.keyboardAvoid}
          >
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 20 : 28 }
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={[styles.formWrapper, styles.centerContent]}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
                  style={[styles.form, { width: cardWidth }]}
                >
                  <TouchableOpacity style={styles.photoContainer} onPress={handleUploadPhoto}>
                    {formData.photo ? (
                      <Image source={{ uri: formData.photo }} style={styles.photoPreview} />
                    ) : (
                      <View style={styles.photoPlaceholder}>
                        <Camera size={32} color={COLORS.textSecondary} />
                      </View>
                    )}
                    <Text style={styles.photoText}>Change Photo</Text>
                  </TouchableOpacity>

                  <View style={styles.fieldContainer}>
                    <View style={styles.inputContainer}>
                      <User size={18} color={COLORS.textSecondary} />
                      <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.textSecondary}
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                      />
                    </View>
                    {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                  </View>

                  <View style={styles.fieldContainer}>
                    <View style={styles.inputContainer}>
                      <Mail size={18} color={COLORS.textSecondary} />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={COLORS.textSecondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                      />
                    </View>
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                  </View>

                  <View style={styles.fieldContainer}>
                    <View style={styles.inputContainer}>
                      <Phone size={18} color={COLORS.textSecondary} />
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor={COLORS.textSecondary}
                        keyboardType="phone-pad"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                      />
                    </View>
                    {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
                  </View>

                  <LinearGradient
                    colors={[COLORS.accent, `${COLORS.accent}DD`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.saveButton}
                  >
                    <TouchableOpacity 
                      style={styles.saveButtonContent}
                      onPress={handleSave}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </LinearGradient>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 28,
    justifyContent: 'center', // Center content vertically
  },
  formWrapper: {
    paddingHorizontal: SIZES.horizontalPadding,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  photoText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  fieldContainer: {
    marginBottom: SIZES.fieldSpacing,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4,
  },
  saveButton: {
    borderRadius: 12,
    height: SIZES.inputHeight,
    marginTop: 6,
    overflow: 'hidden',
  },
  saveButtonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
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
