import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { authMethods } from '../../lib/supabase/auth'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password')
      return
    }

    setIsLoading(true)
    try {
      const { session, user } = await authMethods.signIn(email, password)
      
      // Handle successful login
      Alert.alert('Success', 'Logged in successfully')
      // Navigate to main app or home screen
      // You might use navigation.navigate('Home') or similar
    } catch (error: any) {
      // Handle login error
      Alert.alert('Login Failed', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await authMethods.signInWithOAuth('google')
    } catch (error: any) {
      Alert.alert('Google Login Failed', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title={isLoading ? 'Logging in...' : 'Login'} 
        onPress={handleLogin} 
        disabled={isLoading}
      />
      <Button 
        title="Login with Google" 
        onPress={handleGoogleLogin} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
}) 