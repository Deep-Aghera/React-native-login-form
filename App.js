import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Animated, ActivityIndicator } from 'react-native';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  const [success, setSuccess] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSignUp = () => {
    setLoading(true);

    // Clear previous errors
    setError({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    });

    let hasError = false;

    if (!firstName) {
      setError((prevError) => ({ ...prevError, firstName: 'First name is required.' }));
      hasError = true;
    }

    if (!lastName) {
      setError((prevError) => ({ ...prevError, lastName: 'Last name is required.' }));
      hasError = true;
    }

    if (!email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required.' }));
      hasError = true;
    } else if (!isValidEmail(email)) {
      setError((prevError) => ({ ...prevError, email: 'Invalid email address.' }));
      hasError = true;
    }

    if (!password) {
      setError((prevError) => ({ ...prevError, password: 'Password is required.' }));
      hasError = true;
    }

    if (!confirmPassword) {
      setError((prevError) => ({ ...prevError, confirmPassword: 'Confirm password is required.' }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setError((prevError) => ({ ...prevError, confirmPassword: 'Passwords do not match.' }));
      hasError = true;
    }

    if (!hasError) {
   
      setSuccess('Signup successful!');
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSuccess('');
    
    setError({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setError((prevError) => ({ ...prevError, firstName: '' }));
            }}
          />
          {error.firstName ? <Text style={styles.errorText}>{error.firstName}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setError((prevError) => ({ ...prevError, lastName: '' }));
            }}
          />
          {error.lastName ? <Text style={styles.errorText}>{error.lastName}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError((prevError) => ({ ...prevError, email: '' }));
            }}
          />
          {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError((prevError) => ({ ...prevError, password: '' }));
            }}
          />
          {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError((prevError) => ({ ...prevError, confirmPassword: '' }));
            }}
          />
          {error.confirmPassword ? (
            <Text style={styles.errorText}>{error.confirmPassword}</Text>
          ) : null}
        </View>
        {error.general ? <Text style={styles.errorText}>{error.general}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputBox: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  successText: {
    color: 'green',
    marginTop: 8,
    textAlign: 'center',
  },
});
