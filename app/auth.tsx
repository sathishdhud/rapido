import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, ArrowRight, X, CheckCircle, AlertCircle } from 'lucide-react-native';
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
  google: '#DB4437',
  gradientStart: '#F0F9FF',
  gradientEnd: '#F3E8FF',
  error: '#DC2626',
  success: '#16A34A',
};

const API_BASE_URL = 'https://rapid-backend-uc54.onrender.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState(true);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    visible: false,
    type: '',
    title: '',
    message: '',
  });
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
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

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
    };
    let isValid = true;

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAuth = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      if (!isLogin) {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            full_name: formData.name,
          }),
        });

        const errorData = await response.text();
        let errorMessage;

        if (!response.ok) {
          try {
            const parsedError = JSON.parse(errorData);
            errorMessage = parsedError.message || 'Registration failed';

            if (parsedError.errors) {
              const newErrors = { ...errors };
              parsedError.errors.forEach((error) => {
                if (error.field === 'email') newErrors.email = error.message;
                if (error.field === 'password') newErrors.password = error.message;
                if (error.field === 'full_name') newErrors.name = error.message;
              });
              setErrors(newErrors);
              throw new Error('Please fix the validation errors');
            }
          } catch (e) {
            errorMessage = errorData || 'Registration failed';
          }
          throw new Error(errorMessage);
        }

        showAlert('success', 'Success', 'Account created successfully!');
        setTimeout(() => {
          hideAlert();
          router.replace('/role-selection');
        }, 2000);
      } else {
        router.replace('/role-selection');
      }
    } catch (error) {
      showAlert('error', 'Error', error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    showAlert('info', 'Coming Soon', 'Google sign in will be available soon');
  };

  const cardWidth = Math.min(SIZES.cardMaxWidth, Math.round(SIZES.screenWidth * 0.88));

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="auto" />
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={SIZES.keyboardOffset}
            style={styles.keyboardAvoid}
          >
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 20 : 0 },
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formWrapper}>
                <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
                <Text style={styles.subtitle}>
                  {isLogin ? 'Sign in to continue' : 'Create your account'}
                </Text>

                <LinearGradient
                  colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
                  style={[styles.form, { width: cardWidth }]}
                >
                  {!isLogin && (
                    <View style={styles.fieldContainer}>
                      <View style={styles.inputContainer}>
                        <User size={18} color={COLORS.textSecondary} />
                        <TextInput
                          style={styles.input}
                          placeholder="Full Name"
                          placeholderTextColor={COLORS.textSecondary}
                          value={formData.name}
                          onChangeText={(text) => {
                            setFormData({ ...formData, name: text });
                            setErrors({ ...errors, name: '' });
                          }}
                        />
                      </View>
                      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                    </View>
                  )}

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
                        onChangeText={(text) => {
                          setFormData({ ...formData, email: text });
                          setErrors({ ...errors, email: '' });
                        }}
                      />
                    </View>
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                  </View>

                  <View style={styles.fieldContainer}>
                    <View style={styles.inputContainer}>
                      <Lock size={18} color={COLORS.textSecondary} />
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={COLORS.textSecondary}
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) => {
                          setFormData({ ...formData, password: text });
                          setErrors({ ...errors, password: '' });
                        }}
                      />
                    </View>
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                  </View>

                  <LinearGradient
                    colors={[COLORS.accent, `${COLORS.accent}DD`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.authButton, isLoading && { opacity: 0.7 }]}
                  >
                    <TouchableOpacity
                      style={styles.authButtonContent}
                      onPress={handleAuth}
                      disabled={isLoading}
                    >
                      <Text style={styles.authButtonText}>
                        {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                      </Text>
                      {!isLoading && <ArrowRight size={18} color="white" />}
                    </TouchableOpacity>
                  </LinearGradient>

                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <TouchableOpacity style={styles.googleButton} onPress={handleGoogleAuth}>
                    <Image
                      source={{ uri: 'https://www.google.com/favicon.ico' }}
                      style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.switchButton}
                    onPress={() => {
                      setIsLogin(!isLogin);
                      setErrors({ name: '', email: '', password: '' });
                      setFormData({ name: '', email: '', password: '' });
                    }}
                  >
                    <Text style={styles.switchText}>
                      {isLogin ? "Don't have an account? " : 'Already have an account? '}
                      <Text style={styles.switchTextBold}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* ALERT MODAL */}
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
    justifyContent: 'center',
  },
  formWrapper: {
    paddingHorizontal: SIZES.horizontalPadding,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
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
    marginBottom: 4,
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
  },
  authButton: {
    borderRadius: 12,
    height: SIZES.inputHeight,
    marginTop: 6,
    overflow: 'hidden',
  },
  authButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 6,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },
  dividerText: {
    color: COLORS.textSecondary,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleButtonText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  switchTextBold: {
    color: COLORS.accent,
    fontWeight: '600',
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
