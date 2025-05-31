import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={64} color="#aaa" />
      </View>

      <Text style={styles.title}>Login to your account</Text>
      <Text style={styles.subtitle}>Enter your details to login.</Text>

      <Pressable style={({ pressed }) => [styles.googleButton, pressed && { opacity: 0.85 },]}>
          <Ionicons name="logo-google" size={20} color="#555" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput placeholder="hello@example.com" style={styles.input} />
        </View>

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput placeholder="••••••••" secureTextEntry style={styles.input} />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.fakeCheckbox} />
            <Text style={styles.keepText}> Keep me logged in</Text>
          </View>
          <Text style={styles.forgot}>Forgot password?</Text>
        </View>
      </View>

      <Link href="/(tabs)" asChild>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  googleText: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 6,
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fakeCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderColor: '#999',
    borderWidth: 1.5,
    backgroundColor: '#fff',
  },
  keepText: {
    marginLeft: 6,
    color: '#444',
  },
  forgot: {
    color: '#555',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#5b43f1',
    paddingVertical: 14,
    borderRadius: 8,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
