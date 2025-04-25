import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Ensure these are set in your .env file
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
  },
})

// Authentication Methods
export const authMethods = {
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Sign in with social provider
  signInWithOAuth: async (provider: 'google' | 'apple' | 'github') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    })

    if (error) throw error
    return data
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://yourapp.com/reset-password', // Update with your app's reset password page
    })

    if (error) throw error
    return data
  },

  // Update password
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
    return data
  },
}

// Authentication State Listener
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

const AUTH_TOKEN_KEY = 'user_jwt_token'

export const AuthStorage = {
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
    } catch (error) {
      console.error('Error saving auth token:', error)
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY)
    } catch (error) {
      console.error('Error retrieving auth token:', error)
      return null
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
    } catch (error) {
      console.error('Error removing auth token:', error)
    }
  }
}

export default AuthStorage 