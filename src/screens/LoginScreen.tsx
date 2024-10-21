import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { loginApi } from '../api/auth';
import { validateEmail } from '../utils/validation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }

    const response: any = await loginApi(email, password);
    if (response.success) {
      setError('');
      alert('Login Successful!');
    } else {
      setError(response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputField label="Email" value={email} onChangeText={setEmail} />
      <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
