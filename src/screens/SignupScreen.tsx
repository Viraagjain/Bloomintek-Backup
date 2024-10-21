import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { signupApi } from '../api/auth';
import { validateEmail, validatePassword } from '../utils/validation';
import CheckBox from 'react-native-check-box';

const SignupScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response: any = await signupApi(email, password);
    if (response.success) {
      setError('');
      navigation.navigate('Login');
    } else {
      setError(response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <InputField label="Full name" value={fullName} onChangeText={setFullName} />
      <InputField label="Email" value={email} onChangeText={setEmail} />
      <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
      <InputField label="Re-type password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
      <View style={styles.rememberContainer}>
        <CheckBox
          isChecked={rememberMe}
          onClick={() => setRememberMe(!rememberMe)}
          rightText="Remember me"
          checkBoxColor="#4CAF50"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Have an account? Login</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#007AFF',
  },
});

export default SignupScreen;
