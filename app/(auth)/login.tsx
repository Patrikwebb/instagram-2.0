import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { authMethods } from '../../lib/supabase/auth'
import { theme } from '@/constants/theme'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
      router.replace('/(tabs)/profile')
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

  const createTestUser = async () => {
    try {
      const testEmail = 'hello+test@madebypatrik.se'
      const testPassword = 'test123!'
      
      // First, try to sign up
      await authMethods.signUp(testEmail, testPassword)
      
      // If sign up succeeds, alert success
      Alert.alert('Test User Created', 'Test user created successfully. You can now log in.')
    } catch (error: any) {
      // If user already exists, try logging in
      if (error.message.includes('User already exists')) {
        try {
          await authMethods.signIn('test_user@example.com', 'TestUser123!')
          Alert.alert('Success', 'Logged in with test user')
          router.replace('/(tabs)/profile')
        } catch (loginError: any) {
          Alert.alert('Login Failed', loginError.message)
        }
      } else {
        Alert.alert('Error', error.message)
      }
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
      <View style={styles.buttonSpacing} />
      <Button 
        title="Login with Google" 
        onPress={handleGoogleLogin} 
      />
      <View style={styles.buttonSpacing} />
      <Button 
        title="Create Test User" 
        onPress={createTestUser} 
        color={theme.colors.button.secondary}
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
  buttonSpacing: {
    height: 10,
  }
}) 